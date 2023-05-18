import { Event } from '../../models/Event.js';
import { imageUpload } from '../../utils/upload.js';

export const createEvent = async (req, res) => {
    const { title, badge, text, inner_descr, time, active_status, categoryId } = req.body;
    const randomString1 = Math.random().toString(15).slice(2, 30);
    const randomString2 = Math.random().toString(15).slice(2, 30);
    const randomString3 = Math.random().toString(15).slice(2, 30);

    if ( !title || !text || !inner_descr || !badge ) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    const cover_image = await imageUpload(randomString1, req.files['cover_image'][0], req.files['cover_image'][0].path, 'event');
    const outter_image = await imageUpload(randomString2, req.files['outter_image'][0], req.files['outter_image'][0].path, 'event');
    const image = await imageUpload(randomString3, req.files['image'][0], req.files['image'][0].path, 'event');

    console.log(req.body)
    console.log(cover_image)
    try {
        const event = await Event.create({
            title: title,
            text: text,
            badge: badge,
            inner_descr: inner_descr,
            // time: time,
            cover_image: cover_image,
            outter_image: outter_image,
            image: image,
            active_status: active_status,
            category: categoryId,
        })
        .populate('category')


        return res.status(200).json(event);
    } catch(error) {
        console.log(error)
        return res.status(500).json( error )
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
        .populate('category', 'title')
        .exec()

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
