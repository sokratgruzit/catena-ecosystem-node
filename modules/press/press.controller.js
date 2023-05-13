import { Press } from "../../models/Press.js";
import { imageUpload } from "../../utils/upload.js";

export const press = async (req, res) => {
  const {
    title,
    text,
    inner_descr,
    time,
    active_status,
    categoryId,
    personsId,
  } = req.body;
  const randomString1 = Math.random().toString(15).slice(2, 30);
  const randomString2 = Math.random().toString(15).slice(2, 30);

  // if (!title || !text || !inner_descr) {
  //     return res.status(400).send({
  //         message: "Fill all fealds"
  //     });
  // }

  let outter_image;
  if (req.files && req.files["outter_image"]) {
    outter_image = await imageUpload(
      randomString1,
      req.files["outter_image"][0],
      req.files["outter_image"][0].path,
      "press"
    );
  }
  let inner_image;
  if (req.files && req.files["inner_image"]) {
    inner_image = await imageUpload(
      randomString1,
      req.files["inner_image"][0],
      req.files["inner_image"][0].path,
      "press"
    );
  }

  try {
    const press = await Press.create({
      title: title,
      text: text,
      inner_descr: inner_descr,
      // time: time,
      active_status: active_status,
      outter_image: outter_image,
      inner_image: inner_image,
      category: categoryId,
      persons: personsId,
    });

    return res.status(200).json(press);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateActiveStatus = async (req, res) => {
  const { _id, active_status } = req.body;
  const filter = { _id };
  const update = { active_status };

  try {
    const updateToggleStatus = await Press.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(updateToggleStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllPress = async (req, res) => {
  try {
    const press = await Press.find()
      .populate("category")
      .populate("persons")
      .exec();

    return res.status(200).json(press);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPressWithActiveStatus = async (req, res) => {
  const { active_status } = req.body;
  console.log(active_status);

  try {
    const pressWithActiveStatus = await Press.find({
      active_status: active_status,
    })
      .populate("category")
      .populate("persons")
      .exec();

    return res.status(200).json(pressWithActiveStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOnePress = async (req, res) => {
  const { _id } = req.body;

  try {
    const deletePress = await Press.findOneAndDelete({ _id: _id });

    return res.status(200).json(deletePress);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteManyPress = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Press.deleteMany({ _id: _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePress = async (req, res) => {
  const { _id, title } = req.body;

  const filter = { _id };
  const update = { title };

  try {
    const updatePress = await Press.findOneAndUpdate(filter, update);

    return res.status(200).json(updatePress);
  } catch (error) {
    return res.status(500).json(error);
  }
};
