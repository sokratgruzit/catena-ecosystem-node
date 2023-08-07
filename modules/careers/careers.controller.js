import { Career } from "../../models/Career.js";
import fs from "fs";

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
  
    let exists = await Career.findOne({ title });
  
    if (exists) {
      let imgPath = `uploads/careers/${image}`;
      let coverImage = `uploads/careers/${cover_image}`;
  
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
        const press = await Career.create({
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

// export const deleteCareer = async (req, res) => {
//     const data = req.body;

//     try {
//         console.log(data);
//         return res.status(200).json("hello")

//     } catch (error) {
//         return res.status(500).send({ error: "Error Deleting Career" })
//     }
// };

// export const editCareer = async (req, res) => {
//     const data = req.body;

//     try {
//         console.log(data);
//         return res.status(200).json("hello");
//     } catch (error) {
//         return req.status(500).send({ error: "Error Editing Career" })
//     }
// };

// export const getAllCareers = async (req, res) => {
//     const data = req.body;

//     try {
//         console.log(data);
//         return res.status(200).json("hello");
//     } catch (error) {
//         return req.status(500).send({ error: "Error Editing Career" })
//     }
// };