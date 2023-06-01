import { Event } from '../../models/Event.js';
import { eventTranslate } from '../../models/Event.Translate.js';
import { uploadImageMany } from '../../utils/uploadImageMany.js';
import { languages } from '../../utils/languages.js';
import * as mongoose from "mongoose";

export const findAllActiveEvent = async (req, res) => {
  try {
    let activeStates = req.body.active_status;

    const returnData = await Event.aggregate([
      {
        $match: {
          active_status: activeStates,
        },
      },
      {
        $lookup: {
          from: "eventtranslates",
          localField: "_id",
          foreignField: "event",
          as: "translations",
        },
      },
      {
        $limit: req.body.limit + req.body.limit * (req.body.page - 1),
      },
      {
        $skip: req.body.limit * (req.body.page - 1),
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
                as: "event",
                in: {
                  k: "$$event.lang",
                  v: "$$event",
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

export const getAllEvents = async (req, res) => {
  try {
    const returnData = await Event.aggregate([
      {
        $lookup: {
          from: "eventtranslates",
          localField: "_id",
          foreignField: "event",
          as: "translations",
        },
      },
      {
        $limit: req.body.limit + req.body.limit * (req.body.page - 1),
      },
      {
        $skip: req.body.limit * (req.body.page - 1),
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
                as: "event",
                in: {
                  k: "$$event.lang",
                  v: "$$event",
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
    return res.status(500).send({ error: "Error to getting event" });
  }
};

export const createEvent = async (req, res) => {
  const { userId } = req.body

  const outterImageFiles = req.files['outter_image'];
  const innerImageFiles = req.files['cover_image'];
  const imageFiles = req.files['image'];
  const files = [...outterImageFiles, ...innerImageFiles, ...imageFiles];

  try {
    const image = await uploadImageMany(userId, files, 'press');
    let data = req.body;
    let slug = convertToSlug(data.en.title);

    const result = await Event.create({
      slug: slug,
      outter_image: image[0],
      cover_image: image[1],
      image: image[2],
    });

    let translatedData = [];
    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i]?.code,
        title: data[languages[i]?.code]?.title,
        badge: data[languages[i]?.code]?.badge,
        text: data[languages[i]?.code]?.text,
        inner_descr: data[languages[i]?.code]?.inner_descr,
        event: result._id.toString(),
      });
    }

    await eventTranslate.insertMany(translatedData);

    const returnData = await Event.aggregate([
      {
        $match: {
          _id: result._id,
        },
      },
      {
        $lookup: {
          from: "eventtranslates",
          localField: "_id",
          foreignField: "event",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "event",
                in: {
                  k: "$$event.lang",
                  v: "$$event",
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
    return res.status(400).json(error)
  }
};

export const updateActiveStatus = async (req, res) => {
  try {
    const { _id } = req.body;
    const id = mongoose.Types.ObjectId(_id);
    let data = req.body;

    await Event.findOneAndUpdate({ _id: id }, {
      slug: data.slug,
      active_status: data.active_status
    });

    let translatedData = [];
    await eventTranslate.deleteMany({ event: id });

    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        title: data[languages[i].code]?.title,
        badge: data[languages[i].code]?.badge,
        text: data[languages[i].code]?.text,
        inner_descr: data[languages[i].code]?.inner_descr,
        event: id.toString(),
      });
    }

    await eventTranslate.insertMany(translatedData);

    const returnData = await Event.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "eventtranslates",
          localField: "_id",
          foreignField: "event",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "event",
                in: {
                  k: "$$event.lang",
                  v: "$$event",
                },
              },
            },
          },
        },
      },
    ]);
    
    return res.status(200).send(returnData);
  } catch (error) {
    return res.status(500).send({ error: "Failed to update active status" });
  }
};

export const update = async (req, res) => {

  // const outterImageFiles = req.files['outter_image'];
  // const innerImageFiles = req.files['cover_image'];
  // const imageFiles = req.files['image'];
  // const files = [...outterImageFiles, ...innerImageFiles, ...imageFiles];

  // const filter = { _id };
  // const update = { title, text, badge, inner_descr, cover_image };
  try {
    // const updateToggleStatus = await Event.findOneAndUpdate(filter, update, { new: true });

    // return res.status(200).send(updateToggleStatus);

    const { _id } = req.body;
    const id = mongoose.Types.ObjectId(_id);
    let data = req.body;

    await Event.findOneAndUpdate({ _id: id }, {
      slug: data.slug
    });
    let translatedData = [];
    await eventTranslate.deleteMany({ event: id });
    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        title: data[languages[i].code]?.title,
        text: data[languages[i].code]?.text,
        badge: data[languages[i].code]?.badge,
        inner_descr: data[languages[i].code]?.inner_descr,
        event: id.toString(),
      });
    }

    await eventTranslate.insertMany(translatedData);

    const returnData = await Event.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "eventtranslates",
          localField: "_id",
          foreignField: "event",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "event",
                in: {
                  k: "$$event.lang",
                  v: "$$event",
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

function convertToSlug(title) {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .trim(); // Remove leading/trailing spaces

  return slug;
}

export const deleteManyEvents = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Event.deleteMany({ _id: _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneEvent = async (req, res) => {
  try {
    const result = await Event.deleteOne({ _id: req.body._id });

    if (result.acknowledged === true) {
      return res.status(200).json({ message: "event successuly deleted" });
    }
    res.status(400).json({ message: "event deletion failed" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};
