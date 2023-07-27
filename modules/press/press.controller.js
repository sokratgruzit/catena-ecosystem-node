import { Press } from "../../models/Press.js";
import fs from "fs";

export const create = async (req, res) => {
  const {
    title,
    text,
    inner_descr,
    active_status,
    category,
    persons,
    image,
    logo_image,
    slug
  } = req.body;

  if (!title || !text || !inner_descr) {
    return res.status(400).send({
      message: "Fill all fealds"
    });
  }

  let exists = await Press.findOne({ slug });

  if (exists) {
    let imgPath = `uploads/press/${image}`;
    let logoPath = `uploads/press/${logo_image}`;

    fs.unlink(imgPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });

    fs.unlink(logoPath, async (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });

    return res.status(200).json({ "message": "Press already exists" });
  } else {
    try {
      const press = await Press.create({
        title,
        text,
        inner_descr,
        image,
        logo_image,
        active_status,
        category,
        persons,
        slug
      });
  
      return res.status(200).json(press);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
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
  const { active_status } = req.body;

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
  const press = await Press.findOne({ _id });

  if (press) {
    let imgPath = `uploads/press/${press.image}`;
    let logoPath = `uploads/press/${press.logo_image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        res.status(400).json({
          "message": "Something went wrong"
        });
      } else {
        console.log('File deleted successfully!');
        await Press.deleteOne({ _id });

        res.status(200).json({
          "message": "Press removed successfully"
        });
      }
    });
  } else {
    res.status(200).json({
      "message": "Press not found"
    });
  }
};

export const updatePress = async (req, res) => {
  const { 
    _id, 
    title, 
    text, 
    inner_descr, 
    image, 
    logo_image, 
    active_status,
    category,
    persons
  } = req.body;

  if (!title || !text || !inner_descr) {
    return res.status(200).send({
      "message": "Fill all fealds"
    });
  }

  const findOldImgs = await Press.findOne({ _id });
  const oldImg = findOldImgs.image;
  const oldLogoImg = findOldImgs.logo_image;

  if (image && oldImg !== image) {
    let imgPath = `uploads/press/${oldImg}`;

    fs.unlink(imgPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });
  }

  if (logo_image && oldLogoImg !== logo_image) {
    let logoPath = `uploads/press/${oldLogoImg}`;

    fs.unlink(logoPath, async (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });
  }

  const updatedPress = await Press.findByIdAndUpdate(_id, {
    title,
    text,
    inner_descr,
    active_status,
    persons,
    category,
    image,
    logo_image
  }, { new: true });

  if (!updatedPress) {
    res.status(200).json({
        "message": "Press not found",
    });
  } else {
    res.status(200).json({ "message": "Press updated" });
  }
};
