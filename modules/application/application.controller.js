import { Application } from "../../models/Application.js";
import fs from "fs";

export const create = async (req, res) => {
  const {
    name,
    email,
    phone,
    descr,
    quiz,
    language,
    info,
    gitHub,
    linkedin,
    file,
    jobId,
  } = req.body;

  console.log(req.body)
  // if (!name || !email || !phone) {
  //   return res.status(400).send({
  //     message: "Fill all fealds",
  //   });
  // }

  // let exists = await Application.findOne({ phone });

  // if (exists) {
  //   let imgPath = `uploads/application/${file}`;

  //   fs.unlink(imgPath, (err) => {
  //     if (err) {
  //       console.error("Error deleting file:", err);
  //     } else {
  //       console.log("File deleted successfully!");
  //     }
  //   });

  //   return res.status(200).json({ message: "application already exists" });
  // } else {
      try {
        const application = await Application.create({
          name,
          email,
          phone,
          descr,
          quiz,
          language,
          info,
          gitHub,
          linkedin,
          file,
          jobId,
        });
  
        return res.status(200).json(application);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
  // }
};

export const getAllApplication = async (req, res) => {
  try {
    const application = await Application.find()

    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOneApplication = async (req, res) => {
  const { slug } = req.body;
  try {
    const application = await Application.findOne({ slug })
      .populate("category")
      .populate("persons")
      .exec();

    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneApplication = async (req, res) => {
  const { _id } = req.body;
  const application = await Application.findOne({ _id });

  if (application) {
    let imgPath = `uploads/application/${application.file}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    await Application.deleteOne({ _id });

    res.status(200).json({
      message: "application removed successfully",
    });
  } else {
    res.status(200).json({
      message: "application not found",
    });
  }
};

// export const updatePress = async (req, res) => {
//   const {
//     _id,
//     title,
//     text,
//     inner_descr,
//     file,
//     logo_file,
//     active_status,
//     category,
//     persons,
//   } = req.body;

//   if (!title || !text || !inner_descr) {
//     return res.status(200).send({
//       message: "Fill all fealds",
//     });
//   }

//   const findOldImgs = await Press.findOne({ _id });
//   const oldImg = findOldImgs.file;
//   const oldLogoImg = findOldImgs.logo_file;

//   if (file && oldImg !== file) {
//     let imgPath = `uploads/press/${oldImg}`;

//     fs.unlink(imgPath, (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//       } else {
//         console.log("File deleted successfully!");
//       }
//     });
//   }

//   if (logo_file && oldLogoImg !== logo_file) {
//     let logoPath = `uploads/press/${oldLogoImg}`;

//     fs.unlink(logoPath, async (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//       } else {
//         console.log("File deleted successfully!");
//       }
//     });
//   }

//   if (category[0] === "" || persons[0] === "") {
//     return res.status(200).json({ "message": "Please choose a category and a person"});
//   } else {
//     const updatedPress = await Press.findByIdAndUpdate(
//       _id,
//       {
//         title,
//         text,
//         inner_descr,
//         active_status,
//         persons,
//         category,
//         file,
//         logo_file,
//       },
//       { new: true }
//     );
  
//     if (!updatedPress) {
//       res.status(200).json({
//         message: "Press not found",
//       });
//     } else {
//       res.status(200).json({ message: "Press updated" });
//     }
//   }
// };
