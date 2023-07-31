import { Announcement } from "../../models/Announcement.js";
import { uploadImageMany } from "../../utils/uploadImageMany.js";
import { anouncementTranslate } from "../../models/Anouncements.Translate.js";
import { languages } from "../../utils/languages.js";
import * as mongoose from "mongoose";

import fs from "fs";

// export const findAllActiveAnnouncement = async (req, res) => {
//   try {
//     let activeStatus = req.body.active_status;
//     let limit = req.body.limit ? req.body.limit : 10;
//     let page = req.body.page ? req.body.page : 1;

//     const returnData = await Announcement.aggregate([
//       {
//         $match: {
//           active_status: activeStatus,
//         },
//       },
//       {
//         $lookup: {
//           from: "anouncementtranslates",
//           localField: "_id",
//           foreignField: "announcement",
//           as: "translations",
//         },
//       },
//       {
//         $limit: limit + limit * (page - 1),
//       },
//       {
//         $skip: limit * (page - 1),
//       },
//       {
//         $sort: { createdAt: -1 },
//       },
//       {
//         $addFields: {
//           translations: {
//             $arrayToObject: {
//               $map: {
//                 input: "$translations",
//                 as: "announcement",
//                 in: {
//                   k: "$$announcement.lang",
//                   v: "$$announcement",
//                 },
//               },
//             },
//           },
//         },
//       },
//     ]);

//     const totalCount = await Announcement.countDocuments();
//     const totalPages = Math.ceil(totalCount / (limit || 10));

//     res.status(200).json({
//       returnData,
//       totalPages,
//     });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// export const findByPagination = async (req, res) => {
//   try {
//     let limit = req.limit;
//     let req_page = req.page;
//     let data = {};

//     let result = await Announcement.find(data)
//       .sort({ createdAt: "desc" })
//       .limit(limit)
//       .skip(limit * (req_page - 1));

//     let total_pages = await Announcement.count(data);

//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// export const getAllAnnouncement = async (req, res) => {
//   try {

//     // console.log(res)
//     console.log(req.data)

//     // let limit = req.body.limit ? req.body.limit:10;
//     // let page = req.body.page ? req.body.page:1;

//     // const returnData = await Announcement.aggregate([
//     //   {
//     //     $lookup: {
//     //       from: "anouncementtranslates",
//     //       localField: "_id",
//     //       foreignField: "announcement",
//     //       as: "translations",
//     //     },
//     //   },
//     //   {
//     //     $limit: limit + limit * (page - 1),
//     //   },
//     //   {
//     //     $skip: limit * (page - 1),
//     //   },
//     //   {
//     //     $sort: { createdAt: -1 },
//     //   },
//     //   {
//     //     $addFields: {
//     //       translations: {
//     //         $arrayToObject: {
//     //           $map: {
//     //             input: "$translations",
//     //             as: "announcement",
//     //             in: {
//     //               k: "$$announcement.lang",
//     //               v: "$$announcement",
//     //             },
//     //           },
//     //         },
//     //       },
//     //     },
//     //   },
//     // ]);

//     // const totalCount = await Announcement.countDocuments();
//     // const totalPages = Math.ceil(totalCount / (req.body.limit || 10));

//     res.status(200).json({
//       // returnData,
//       // totalPages,
//     });
//   } catch (error) {
//     return res.status(500).send({ error: "Error to getting Announcement" });
//   }
// };

// let tableData;
// tableData = td?.map((item, index) => {
//   return (
//     <div
//       key={index}
//       className={`table-parent ${mobileExpand === index ? "active" : ""}`}
//     >
//       <div
//         className="table"
//         style={{
//           width: `calc(100% - ${mobile ? "75px" : "50px"})`,
//           cursor: "pointer",
//         }}
//         onClick={() => {
//           mobileExpandFunc(index);
//         }}
//       >
//         <div
//           className={`td ${th[0].mobileWidth ? true : false}`}
//           style={{ width: `${mobile ? th[0].mobileWidth : th[0].width}%` }}
//         >
//           <span>{item?.title["en"]["event.title"]}</span>
//         </div>
//         <div
//           className={`td ${th[1].mobileWidth ? true : false}`}
//           style={{ width: `${mobile ? th[1].mobileWidth : th[1].width}%` }}
//         >
//           <span>{item?.text["en"]["event.text"]}</span>
//         </div>
//         <div
//           className={`td ${th[4].mobileWidth ? true : false}`}
//           style={{ width: `${mobile ? th[4].mobileWidth : th[4].width}%` }}
//         >
//           <img
//             className={styles.itemImg}
//             src={`http://localhost:4003/uploads/event/${item?.logo_image}`}
//             alt="img"
//           />
//         </div>
//       </div>
//       <div
//         className="icon-place"
//         onClick={() => {
//           mobileExpandFunc(index);
//         }}
//       >
//         <ArrowDown />
//       </div>
//       <div className="table-more" style={{ display: "flex" }}>
//         <MoreButton dropdownData={dynamicDropDown(item)} />
//       </div>
//       <div className="table-mobile">
//         <div className="table-mobile-content">
//           <div className="td">
//             <div className="mobile-ttl">{th[4].name}</div>
//             <img
//               className={styles.itemImg}
//               src={`http://localhost:4003/uploads/event/${item?.logo_image}`}
//               alt="img"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

export const create = async (req, res) => {
  const {
    title,
    text,
    inner_descr,
    active_status,
    category,
    persons,
    image,
    logo_image,
    slug,
  } = req.body;

  if (!title || !text || !inner_descr) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }

  let exists = await Press.findOne({ slug });

  if (exists) {
    let imgPath = `uploads/press/${image}`;
    let logoPath = `uploads/press/${logo_image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    return res.status(200).json({ message: "Press already exists" });
  } else {
    try {
      const press = await Press.create({
        title,
        text,
        inner_descr,
        image,
        logo_image,
        active_status,
        category,
        persons,
        slug,
      });

      return res.status(200).json(press);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

// export const updateActiveStatus = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const id = mongoose.Types.ObjectId(_id);
//     let activeStatus = req.body.active_status;
//     let data = req.body;

//     await Announcement.findOneAndUpdate({ _id: id }, {
//       slug: data.slug,
//       active_status: activeStatus,
//     });

//     const returnData = await Announcement.aggregate([
//       {
//         $match: {
//           _id: id,
//         },
//       },
//       {
//         $lookup: {
//           from: "anouncementtranslates",
//           localField: "_id",
//           foreignField: "announcement",
//           as: "translations",
//         },
//       },
//       {
//         $addFields: {
//           translations: {
//             $arrayToObject: {
//               $map: {
//                 input: "$translations",
//                 as: "announcement",
//                 in: {
//                   k: "$$announcement.lang",
//                   v: "$$announcement",
//                 },
//               },
//             },
//           },
//         },
//       },
//     ]);

//     res.status(200).json(returnData);
//   } catch (error) {
//     console.log(error)
//     return res.status(500).send({ error: "Failed to update active status" });
//   }
// };

// export const update = async (req, res) => {
//   // const {
//   //   _id,
//   //   name,
//   //   title,
//   //   text,
//   //   badge,
//   //   inner_descr } = req.body;
//   // const filter = { _id };
//   // const update = { title, text, badge, inner_descr, name };

//   try {
//     // const updateToggleStatus = await Announcement.findOneAndUpdate(filter, update, { new: true })

//     // return res.status(200).send(updateToggleStatus);

//     const { _id } = req.body;
//     const id = mongoose.Types.ObjectId(_id);
//     let data = req.body;

//     await Announcement.findOneAndUpdate({ _id: id }, { slug: data.slug });
//     let translatedData = [];
//     await anouncementTranslate.deleteMany({ announcement: id });

//     for (let i = 0; i < languages.length; i++) {
//       translatedData.push({
//         lang: languages[i].code,
//         name: data[languages[i].code]?.name,
//         title: data[languages[i].code]?.title,
//         text: data[languages[i].code]?.text,
//         badge: data[languages[i].code]?.badge,
//         inner_descr: data[languages[i].code]?.inner_descr,
//         announcement: id.toString(),
//       });
//     }

//     await anouncementTranslate.insertMany(translatedData);

//     const returnData = await Announcement.aggregate([
//       {
//         $match: {
//           _id: id,
//         },
//       },
//       {
//         $lookup: {
//           from: "anouncementtranslates",
//           localField: "_id",
//           foreignField: "announcement",
//           as: "translations",
//         },
//       },
//       {
//         $addFields: {
//           translations: {
//             $arrayToObject: {
//               $map: {
//                 input: "$translations",
//                 as: "announcement",
//                 in: {
//                   k: "$$announcement.lang",
//                   v: "$$announcement",
//                 },
//               },
//             },
//           },
//         },
//       },
//     ]);

//     return res.status(200).json(returnData)
//   } catch (error) {
//     return res.status(500).send({ error: "Failed to update active status" });
//   }
// };

// function convertToSlug(title) {
//   const slug = title
//     .toLowerCase() // Convert to lowercase
//     .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
//     .replace(/\s+/g, "-") // Replace spaces with hyphens
//     .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
//     .trim(); // Remove leading/trailing spaces

//   return slug;
// }

// export const destroyOneAnnouncement = async (req, res) => {
//   try {
//     const result = await Announcement.deleteOne({ _id: req.body._id });

//     if (result.acknowledged === true) {
//       return res
//         .status(200)
//         .json({ message: "Announcement successuly deleted" });
//     }
//     res.status(400).json({ message: "Announcement deletion failed" });
//   } catch (e) {
//     console.log(e.message);
//     res.status(400).json({ message: e.message });
//   }
// };

// export const deleteManyAnnouncement = async (req, res) => {
//   const { _id } = req.body;

//   try {
//     const deleteMany = await Announcement.deleteMany({ _id: _id });

//     return res.status(200).json(deleteMany);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
