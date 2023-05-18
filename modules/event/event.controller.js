import { Event } from '../../models/Event.js';
import { uploadImageMany } from '../../utils/uploadImageMany.js';

export const createEvent = async (req, res) => {
    const {
      title,
      text,
      badge,
      inner_descr,
      time,
      active_status,
      categoryId,
      userId,
      slug
    } = req.body;

    const outterImageFiles = req.files['outter_image'];
    const innerImageFiles = req.files['cover_image'];
    const imageFiles = req.files['image'];
    const files = [...outterImageFiles, ...innerImageFiles, ...imageFiles];

    // if (!title || !text || !inner_descr) {
    //     return res.status(400).send({
    //         message: "Fill all fealds"
    //     });
    // }
  
    try {
      const img = await uploadImageMany(userId, files, 'event');
  
      const event = await Event.create({
        title,
        text,
        badge,
        inner_descr,
        time,
        outter_image: img[0],
        cover_image: img[1],
        image: img[2],
        active_status,
        category: categoryId,
        slug
      });

      return res.status(200).json(event);
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
        const updateToggleStatus = await Event.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).send(updateToggleStatus);
    } catch(error) {
        return res.status(500).send({ error: "Failed to update active status" });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const event = await Event.find()
        // .populate('category', 'title')
        // .exec()

        return res.status(200).json( event );
    } catch(error) {
        return res.status(500).send({ error: "Error to getting event" });
    }
};

export const destroyOneEvent = async (req, res) => {
    try {
        const result = await Event.deleteOne({ _id: req.body._id});

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "event successuly deleted" });
        }
        res.status(400).json({ message: "event deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};
