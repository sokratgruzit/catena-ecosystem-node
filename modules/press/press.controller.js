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