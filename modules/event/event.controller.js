import { Event } from "../../models/Event.js";
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
    slug,
  } = req.body;

  if (!title || !text || !inner_descr) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }

  let exists = await Event.findOne({ slug });

  if (exists) {
    let imgPath = `uploads/events/${image}`;
    let logoPath = `uploads/events/${logo_image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    return res.status(200).json({ message: "event already exists" });
  } else {
    try {
      const event = await Event.create({
        title,
        text,
        inner_descr,
        image,
        logo_image,
        active_status,
        category,
        persons,
        slug,
      });

      return res.status(200).json(event);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export const getOneEvent = async (req, res) => {
  const { slug } = req.body;
  try {
    const event = await Event.findOne({ slug });
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateActiveStatus = async (req, res) => {
  const { _id, active_status } = req.body;
  const filter = { _id };
  const update = { active_status };

  try {
    const updateToggleStatus = await Event.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(updateToggleStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const event = await Event.find()
      .populate("category")
      .populate("persons")
      .exec();

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllEventSlug = async (req, res) => {
  try {
    const events = await Event.find({}, { slug: 1, _id: 0 });

    if (events && events.length > 0) {
      return res.status(200).json(events);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};  

export const getEventWithActiveStatus = async (req, res) => {
  const { active_status } = req.body;

  try {
    const eventWithActiveStatus = await Event.find({
      active_status: active_status,
    })
      .populate("category")
      .populate("persons")
      .exec();

    return res.status(200).json(eventWithActiveStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneEvent = async (req, res) => {
  const { _id } = req.body;
  const event = await Event.findOne({ _id });

  if (event) {
    let imgPath = `uploads/events/${event.image}`;
    let logoPath = `uploads/events/${event.logo_image}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        res.status(400).json({
          message: "Something went wrong",
        });
      } else {
        console.log("File deleted successfully!");
        await Event.deleteOne({ _id });

        res.status(200).json({
          message: "Event removed successfully",
        });
      }
    });
  } else {
    res.status(200).json({
      message: "Event not found",
    });
  }
};

export const updateEvent = async (req, res) => {
  const {
    _id,
    title,
    text,
    inner_descr,
    image,
    logo_image,
    active_status,
    category,
    persons,
  } = req.body;

  if (!title || !text || !inner_descr) {
    return res.status(200).send({
      message: "Fill all fealds",
    });
  }

  const findOldImgs = await Event.findOne({ _id });
  const oldImg = findOldImgs.image;
  const oldLogoImg = findOldImgs.logo_image;

  if (image && oldImg !== image) {
    let imgPath = `uploads/events/${oldImg}`;

    fs.unlink(imgPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  }

  if (logo_image && oldLogoImg !== logo_image) {
    let logoPath = `uploads/events/${oldLogoImg}`;

    fs.unlink(logoPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    _id,
    {
      title,
      text,
      inner_descr,
      active_status,
      persons,
      category,
      image,
      logo_image,
    },
    { new: true }
  );

  if (!updatedEvent) {
    res.status(200).json({
      message: "Event not found",
    });
  } else {
    res.status(200).json({ message: "Event updated" });
  }
};
