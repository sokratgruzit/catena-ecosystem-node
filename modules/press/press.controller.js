import { Press } from "../../models/Press.js";
import { uploadImageMany } from "../../utils/uploadImageMany.js";
import { pressTranslate } from "../../models/Press.Translate.js";
import { languages } from "../../utils/languages.js";
import * as mongoose from "mongoose";

export const press = async (req, res) => {
  // const {
  //   title,
  //   text,
  //   inner_descr,
  //   time,
  //   active_status,
  //   categoryId,
  //   personsId,
  //   outter_image,
  //   inner_image,
  //   userId,
  //   slug
  // } = req.body;

  // const outterImageFiles = req.files['outter_image'];
  // const innerImageFiles = req.files['inner_image'];
  // const files = [...outterImageFiles, ...innerImageFiles];

  try {
    // const image = await uploadImageMany(userId, files, 'press');

    // const press = await Press.create({
    //   title,
    //   text,
    //   inner_descr,
    //   outter_image: image[0],
    //   inner_image: image[1],
    //   time,
    //   active_status,
    //   category: categoryId,
    //   persons: personsId,
    //   slug
    // });

    // await pressTranslate.create({
    //   title: title,
    //   text: text,
    //   inner_descr: inner_descr,
    //   press: press._id.toString()
    // });

    let data = req.body;
    console.log(data);
    let slug = convertToSlug(data.en.title);

    let translatedData = [];
    const result = await Press.create({ slug });

    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        title: data[languages[i].code]?.title,
        text: data[languages[i].code]?.text,
        inner_descr: data[languages[i].code]?.inner_descr,
        presses: result._id.toString(),
      });
    }

    console.log(translatedData);
    await pressTranslate.insertMany(translatedData);

    const returnData = await Press.aggregate([
      {
        $match: {
          _id: result._id,
        },
      },
      {
        $lookup: {
          from: "presstranslates",
          localField: "_id",
          foreignField: "presses",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "presses",
                in: {
                  k: "$$presses.lang",
                  v: "$$presses",
                },
              },
            },
          },
        },
      },
    ]);

    console.log(returnData)
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error)
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
  const page = req.query.page;
  const limit = req.query.limit;

  try {
    const press = await Press.find()
      .populate("category")
      .populate("persons")
      .populate("pressTranslate")
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    return res.status(200).json(press);
  } catch (error) {

    return res.status(500).json(error);
  }
};

export const getPressWithActiveStatus = async (req, res) => {
  try {
    const pressWithActiveStatus = await Press.find({
      active_status: true,
    })
      .populate("category")
      .populate("persons")
      .exec();

    return res.status(200).json(pressWithActiveStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

function convertToSlug(title) {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .trim(); // Remove leading/trailing spaces

  return slug;
}

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
