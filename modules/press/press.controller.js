import { Press } from "../../models/Press.js";
import { uploadImageMany } from "../../utils/uploadImageMany.js";
import { pressTranslate } from "../../models/Press.Translate.js";
import { languages } from "../../utils/languages.js";
import * as mongoose from "mongoose";

export const press = async (req, res) => {

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


    let data = req.body;
    let categoryId = data.categoryId;
    let personsId = data.personsId;

    let slug = convertToSlug(data.en.title);

    let translatedData = [];
    const result = await Press.create({
      slug,
        category: categoryId,
        persons: personsId,
    });

    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        title: data[languages[i].code]?.title,
        text: data[languages[i].code]?.text,
        inner_descr: data[languages[i].code]?.inner_descr,
        press: result._id.toString(),
      });
    }

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
          foreignField: "press",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "press",
                in: {
                  k: "$$press.lang",
                  v: "$$press",
                },
              },
            },
          },
        },
      },
    ]);

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export const updateActiveStatus = async (req, res) => {
  try {
    const { _id } = req.body;
    const id = mongoose.Types.ObjectId(_id);
    let activeStatus = req.body.active_status;
    let data = req.body;

    await Press.findOneAndUpdate({ _id: id }, {
      slug: data.slug,
      active_status: activeStatus,
    });

    const returnData = await Press.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "presstranslates",
          localField: "_id",
          foreignField: "press",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "press",
                in: {
                  k: "$$press.lang",
                  v: "$$press",
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllPress = async (req, res) => {
  try {
    // const press = await Press.find()
    //   .populate("category")
    //   .populate("persons")
    //   .populate("pressTranslate")
    //   .sort({ createdAt: "desc" })
    //   .limit(limit)
    //   .skip(limit * (page - 1))
    //   .exec();

    let limit = req.body.limit ? req.body.limit : 10;
    let page = req.body.page ? req.body.page : 1;

    const returnData = await Press.aggregate([
      {
        $lookup: {
          from: "presstranslates",
          localField: "_id",
          foreignField: "press",
          as: "translations",
        },
      },
      {
        $limit: limit + limit * (page - 1),
      },
      {
        $skip: limit * (page - 1),
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "press",
                in: {
                  k: "$$press.lang",
                  v: "$$press",
                },
              },
            },
          },
        },
      },
    ]);

    const totalCount = await Press.countDocuments();
    const totalPages = Math.ceil(totalCount / (req.body.limit || 10));

    res.status(200).json({
      returnData,
      totalPages,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export const getPressWithActiveStatus = async (req, res) => {
  try {
    let activeStatus = req.body.active_status;
    let limit = req.body.limit ? req.body.limit : 10;
    let page = req.body.page ? req.body.page : 1;

    const returnData = await Press.aggregate([
      {
        $match: {
          active_status: activeStatus,
        },
      },
      {
        $lookup: {
          from: "presstranslates",
          localField: "_id",
          foreignField: "press",
          as: "translations",
        },
      },
      {
        $limit: limit + limit * (page - 1),
      },
      {
        $skip: limit * (page - 1),
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "press",
                in: {
                  k: "$$press.lang",
                  v: "$$press",
                },
              },
            },
          },
        },
      },
    ]);

    const totalCount = await Press.countDocuments();
    const totalPages = Math.ceil(totalCount / (req.body.limit || 10));

    res.status(200).json({
      returnData,
      totalPages,
    });

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

  try {
    const { _id } = req.body;
    const id = mongoose.Types.ObjectId(_id);
    let data = req.body;

    await Press.findOneAndUpdate({ _id: id }, { slug: data.slug });
    let translatedData = [];
    await pressTranslate.deleteMany({ announcement: id });

    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        title: data[languages[i].code]?.title,
        text: data[languages[i].code]?.text,
        inner_descr: data[languages[i].code]?.inner_descr,
        press: id.toString(),
      });
    }

    await pressTranslate.insertMany(translatedData);

    const returnData = await Press.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "presstranslates",
          localField: "_id",
          foreignField: "press",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "press",
                in: {
                  k: "$$press.lang",
                  v: "$$press",
                },
              },
            },
          },
        },
      },
    ]);

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};
