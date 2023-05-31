import { Persons } from "../../models/Persons.js";
import { imageUpload } from "../../utils/uploadImage.js";

export const persons = async (req, res) => {
  const { title, status } = req.body;
  const randomString = Math.random().toString(15).slice(2, 30);

  if (!title || !status) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }
  
  try {
    const image = await imageUpload(randomString, req.file, "persons");

    const persons = await Persons.create({
      title: title,
      status: status,
      image: image,
    });

    return res.status(200).json(persons);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const update = async (req, res) => {
  const { _id, title, status } = req.body;
  // const randomString = Math.random().toString(15).slice(2, 30);

  try {
    // const image = await imageUpload(randomString, req.file, "persons");

    const persons = await Persons.findOneAndUpdate({_id},{
      title: title,
      status: status,
      // image: image,
    }, { new: true });

    return res.status(200).json(persons);
  } catch (error) {
    return res.status(500).json(error);
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

export const deletePerson = async (req, res) => {
  const { _id } = req.body;

  try {
    const deletePerson = await Persons.findOneAndDelete({ _id });

    return res.status(200).json(deletePerson);
  } catch (error) {
    return res.status(500).json(error);
  }
};
