import { Persons } from "../../models/Persons.js";
import fs from "fs";

export const create = async (req, res) => {
  const { title, status, slug, image } = req.body;

  if (!title || !status) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }
  
  let exists = await Persons.findOne({ slug });

  if (exists) {
    let imgPath = `uploads/persons/${image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
          console.error('Error deleting file:', err);
      } else {
          console.log('File deleted successfully!');
      }
    });

    return res.status(200).json({ "message": "Person already exists" });
  } else {
    try {
      const persons = await Persons.create({
        title,
        status,
        image,
      });
  
      return res.status(200).json(persons);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export const update = async (req, res) => {
  const { _id, title, image, status } = req.body;

  if (!title && !status) {
    return res.status(400).send({
      message: "Fill all fealds"
    });
  }

  const findOldImgs = await Persons.findOne({ _id });
  const oldImg = findOldImgs.image;

  if (image && oldImg !== image) {
    let imgPath = `uploads/persons/${oldImg}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });
  }

  const updatedCat = await Persons.findByIdAndUpdate(_id, {
    title,
    status,
    image
  }, { new: true });

  if (!updatedCat) {
      res.status(400).json({
          "message": "Person not found",
      });
  } else {
      res.status(200).json({ "message": "Person updated" });
  }
};

export const remove = async (req, res) => {
  const { _id } = req.body;
  const pers = await Persons.findOne({ _id });

  if (pers) {
      try {
          await Persons.deleteOne({ _id });

          res.status(200).json({
              "message": "Person removed successfully"
          });
      } catch (err) {
          res.status(400).json({
              "message": err.message
          });
      }
  } else {
      res.status(404).json({
          "message": "Person not found"
      });
  }
};

export const getAllPersons = async (req, res) => {
  try {
    const persons = await Persons.find();

    return res.status(200).json(persons);
  } catch (error) {
    return res.status(500).json(error);
  }
};
