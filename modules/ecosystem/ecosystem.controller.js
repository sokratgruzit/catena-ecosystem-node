import { Ecosystem } from "../../models/Ecosystem.js";
import fs from "fs";

export const create = async (req, res) => {
  const {
    exchange_name,
    inner_descr,
    active_status,
    color,
    logo_image,
    exchange_link,
  } = req.body;

  if (!exchange_name || !inner_descr || !active_status || !color || !exchange_link) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }

  let exists = await Ecosystem.findOne({
    exchange_name,
    exchange_link,
  });

  if (exists) {
    let logoPath = `uploads/ecosystem/${logo_image}`;

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    return res.status(200).json({ message: "Exchange already exists" });
  } else {
  try {
    const ecosystem = await Ecosystem.create({
      exchange_name,
      inner_descr,
      active_status,
      color,
      exchange_link,
      logo_image
    });

    return res.status(200).json(ecosystem);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  }
};

export const getAllEcosystem = async (req, res) => {
  try {
    const ecosystem = await Ecosystem.find();

    return res.status(200).json(ecosystem);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOne = async (req, res) => {
  const { _id } = req.body;

  const ecosystem = await Ecosystem.findOne({ _id });
  console.log(ecosystem)

  if (ecosystem) {
    let logoPath = `uploads/ecosystem/${ecosystem.logo_image}`;

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res.status(400).json({
          message: "Something went wrong",
        });
      } else {
        console.log("File deleted successfully!");
        await Ecosystem.deleteOne({ _id });

        res.status(200).json({
          message: "Ecosystem removed successfully",
        });
      }
    });
  } else {
    res.status(200).json({
      message: "Ecosystem not found",
    });
  }
};


export const updateEcosystem = async (req, res) => {
  const {
    _id,
    exchange_name,
    inner_descr,
    active_status,
    color,
    logo_image,
    exchange_link,
  } = req.body;

  if (!exchange_name || !inner_descr || !active_status || !color || !exchange_link) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }

  const findOldImgs = await Ecosystem.findOne({ _id });
  const oldLogoImg = findOldImgs.logo_image;

  if (logo_image && oldLogoImg !== logo_image) {
    let logoPath = `uploads/ecosystem/${oldLogoImg}`;

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  }

  const updatedEcosystem = await Ecosystem.findByIdAndUpdate(
    _id,
    {
      exchange_name,
      inner_descr,
      active_status,
      color,
      logo_image,
      exchange_link,
    },
    { new: true }
  );

  if (!updatedEcosystem) {
    res.status(200).json({
      message: "Press not found",
    });
  } else {
    res.status(200).json({ message: "Press updated" });
  }
};

// export const updateActiveStatus = async (req, res) => {
//   const { _id, active_status } = req.body;
//   const filter = { _id };
//   const update = { active_status };

//   try {
//     const updateToggleStatus = await Press.findOneAndUpdate(filter, update, {
//       new: true,
//     });

//     return res.status(200).send(updateToggleStatus);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// export const getOnePress = async (req, res) => {
//   const { slug } = req.body;
//   try {
//     const press = await Press.findOne({ slug })
//       .populate("category")
//       .populate("persons")
//       .exec();

//     return res.status(200).json(press);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// export const getPressWithActiveStatus = async (req, res) => {
//   const { active_status } = req.body;

//   try {
//     const pressWithActiveStatus = await Press.find({
//       active_status: active_status,
//     })
//       .populate("category")
//       .populate("persons")
//       .exec();

//     return res.status(200).json(pressWithActiveStatus);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };