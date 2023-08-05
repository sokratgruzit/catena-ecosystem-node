import { Announcement } from "../../models/Announcement.js";
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
//         $addFields: {translateFindWithKey
//           translations: {
//             $arrayToObject: {
//               $map: {translateFindWithKey
//                 as: "announcement",translateFindWithKey
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


export const create = async (req, res) => {
  const {
    title,
    text,
    inner_descr,
    active_status,
    category,
    image,
    cover_image,
  } = req.body;

  console.log(req.body)

  if (!title || !text || !inner_descr) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }

  let exists = await Announcement.findOne({ title });

  if (exists) {
    let imgPath = `uploads/announcement/${image}`;
    let coverImage = `uploads/announcement/${cover_image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    fs.unlink(coverImage, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    return res.status(200).json({ message: "Press already exists" });
  } else {
    try {
      const press = await Announcement.create({
        title,
        text,
        inner_descr,
        image,
        cover_image,
        active_status,
        category,
      });

      return res.status(200).json(press);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export const getAllAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.find();

    return res.status(200).json(announcement);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneAnnouncement = async (req, res) => {
  const { _id } = req.body;
  const announcement = await Announcement.findOne({ _id });

  if (announcement) {
    let imgPath = `uploads/announcement/${announcement.image}`;
    let coverPath = `uploads/announcement/${announcement.cover_image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    fs.unlink(coverPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    await Announcement.deleteOne({ _id });

    res.status(200).json({
      message: "announcement removed successfully",
    });
  } else {
    res.status(200).json({
      message: "announcement not found",
    });
  }
};

export const updateActiveStatus = async (req, res) => {
  const { _id, active_status } = req.body;
  const filter = { _id };
  const update = { active_status };

  try {
    const updateToggleStatus = await Announcement.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(updateToggleStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateAnnouncement = async (req, res) => {
  const {
    _id,
    title,
    text,
    inner_descr,
    image,
    cover_image,
    active_status,
    category,
  } = req.body;

  console.log(req.body)

  if (!title || !text || !inner_descr) {
    return res.status(200).send({
      message: "Fill all fealds",
    });
  }

  const findOldImgs = await Announcement.findOne({ _id });
  const oldImg = findOldImgs.image;
  const oldLogoImg = findOldImgs.cover_image;

  if (image && oldImg !== image) {
    let imgPath = `uploads/announcement/${oldImg}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  }

  if (cover_image && oldLogoImg !== cover_image) {
    let logoPath = `uploads/announcement/${oldLogoImg}`;

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  }

  if (category[0] === "" || persons[0] === "") {
    return res.status(200).json({ "message": "Please choose a category and a person"});
  } else {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      _id,
      {
        title,
        text,
        inner_descr,
        active_status,
        category,
        image,
        cover_image,
      },
      { new: true }
    );
  
    if (!updatedAnnouncement) {
      res.status(200).json({
        message: "Announcementnot found",
      });
    } else {
      res.status(200).json({ message: "Announcementupdated" });
    }
  }
};