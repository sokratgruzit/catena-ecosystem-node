import { Announcement } from "../../models/Announcement.js";
import { uploadImageMany } from "../../utils/uploadImageMany.js";
import { anouncementTranslate } from "../../models/Anouncements.Translate.js";
import { languages } from "../../utils/languages.js";
import * as mongoose from "mongoose";

export const findAllActiveAnnouncement = async (req, res) => {
  try {
    let activeStatus = req.body.active_status;
    let limit = req.body.limit ? req.body.limit:10;
    let page = req.body.page ? req.body.page:1;

    const returnData = await Announcement.aggregate([
      {
        $match: {
          active_status: activeStatus,
        },
      },
      {
        $lookup: {
          from: "anouncementtranslates",
          localField: "_id",
          foreignField: "announcement",
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
                as: "announcement",
                in: {
                  k: "$$announcement.lang",
                  v: "$$announcement",
                },
              },
            },
          },
        },
      },
    ]);

    const totalCount = await Announcement.countDocuments();
    const totalPages = Math.ceil(totalCount / (limit || 10));

    res.status(200).json({
      returnData,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findByPagination = async (req, res) => {
  try {
    let limit = req.limit;
    let req_page = req.page;
    let data = {};

    let result = await Announcement.find(data)
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (req_page - 1));

    let total_pages = await Announcement.count(data);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllAnnouncement = async (req, res) => {
  try {
    let limit = req.body.limit ? req.body.limit:10;
    let page = req.body.page ? req.body.page:1;

    const returnData = await Announcement.aggregate([
      {
        $lookup: {
          from: "anouncementtranslates",
          localField: "_id",
          foreignField: "announcement",
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
                as: "announcement",
                in: {
                  k: "$$announcement.lang",
                  v: "$$announcement",
                },
              },
            },
          },
        },
      },
    ]);

    const totalCount = await Announcement.countDocuments();
    const totalPages = Math.ceil(totalCount / (req.body.limit || 10));

    res.status(200).json({
      returnData,
      totalPages,
    });
  } catch (error) {
    return res.status(500).send({ error: "Error to getting Announcement" });
  }
};

export const createAnnouncement = async (req, res) => {
  // const { name, title, text, inner_descr, time, active_status, categoryId, userId, slug } = req.body;

  // const coverImageFiles = req.files['cover_image'];
  // const ImageFiles = req.files['image'];
  // const files = [...coverImageFiles, ...ImageFiles];

  try {
    // const img = await uploadImageMany(userId, files, 'announcement');

    // const announcement = await Announcement.create({
    //   name: name,
    //   image: img[0],
    //   title: title,
    //   text: text,
    //   inner_descr: inner_descr,
    //   time: time,
    //   cover_image: img[1],
    //   active_status: active_status,
    //   category: categoryId,
    //   slug
    // })
    let data = req.body;
    let slug = convertToSlug(data.en.title);

    let translatedData = [];
    const result = await Announcement.create({ slug });

    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i]?.code,
        name: data[languages[i].code]?.name,
        title: data[languages[i].code]?.title,
        text: data[languages[i].code]?.text,
        inner_descr: data[languages[i].code]?.inner_descr,
        announcement: result._id.toString(),
      });
    }
    console.log(translatedData);

    await anouncementTranslate.insertMany(translatedData);

    const returnData = await Announcement.aggregate([
      {
        $match: {
          _id: result._id,
        },
      },
      {
        $lookup: {
          from: "anouncementtranslates",
          localField: "_id",
          foreignField: "announcement",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "announcement",
                in: {
                  k: "$$announcement.lang",
                  v: "$$announcement",
                },
              },
            },
          },
        },
      },
    ]);

    console.log(returnData);
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateActiveStatus = async (req, res) => {
  try {
    const { _id } = req.body;
    const id = mongoose.Types.ObjectId(_id);
    let activeStatus = req.body.active_status;
    let data = req.body;

    await Announcement.findOneAndUpdate({ _id: id }, {
      slug: data.slug,
      active_status: activeStatus,
    });

    const returnData = await Announcement.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "anouncementtranslates",
          localField: "_id",
          foreignField: "announcement",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "announcement",
                in: {
                  k: "$$announcement.lang",
                  v: "$$announcement",
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(returnData);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: "Failed to update active status" });
  }
};

export const update = async (req, res) => {
  // const {
  //   _id,
  //   name,
  //   title,
  //   text,
  //   badge,
  //   inner_descr } = req.body;
  // const filter = { _id };
  // const update = { title, text, badge, inner_descr, name };

  try {
    // const updateToggleStatus = await Announcement.findOneAndUpdate(filter, update, { new: true })

    // return res.status(200).send(updateToggleStatus);

    const { _id } = req.body;
    const id = mongoose.Types.ObjectId(_id);
    let data = req.body;

    await Announcement.findOneAndUpdate({ _id: id }, { slug: data.slug });
    let translatedData = [];
    await anouncementTranslate.deleteMany({ announcement: id });

    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        name: data[languages[i].code]?.name,
        title: data[languages[i].code]?.title,
        text: data[languages[i].code]?.text,
        badge: data[languages[i].code]?.badge,
        inner_descr: data[languages[i].code]?.inner_descr,
        announcement: id.toString(),
      });
    }

    await anouncementTranslate.insertMany(translatedData);

    const returnData = await Announcement.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "anouncementtranslates",
          localField: "_id",
          foreignField: "announcement",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "announcement",
                in: {
                  k: "$$announcement.lang",
                  v: "$$announcement",
                },
              },
            },
          },
        },
      },
    ]);

  return res.status(200).json(returnData)
  } catch (error) {
    return res.status(500).send({ error: "Failed to update active status" });
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

export const destroyOneAnnouncement = async (req, res) => {
  try {
    const result = await Announcement.deleteOne({ _id: req.body._id });

    if (result.acknowledged === true) {
      return res
        .status(200)
        .json({ message: "Announcement successuly deleted" });
    }
    res.status(400).json({ message: "Announcement deletion failed" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

export const deleteManyAnnouncement = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Announcement.deleteMany({ _id: _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};
