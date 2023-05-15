import { Anouncement } from '../../models/Anouncements.js';
import { imageUpload } from '../../utils/upload.js';

export const createAnouncement = async (req, res) => {
    const { name, title, text, inner_descr, time, active_status, categoryId } = req.body;
    const randomString1 = Math.random().toString(15).slice(2, 30);
    const randomString2 = Math.random().toString(15).slice(2, 30);

    if ( !name || !text || !inner_descr || !title ) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    const image = await imageUpload(randomString1, req.files['image'][0], req.files['image'][0].path, 'anouncement');
    const cover_image = await imageUpload(randomString2, req.files['cover_image'][0], req.files['cover_image'][0].path, 'anouncement');

    console.log(req.body)
    try {
        const anouncement = await Anouncement.create({
            name: name,
            image: image,
            title: title,
            text: text,
            inner_descr: inner_descr,
            time: time,
            cover_image: cover_image,
            active_status: active_status,
            category: categoryId,
        })
        // .populate('category')


        return res.status(200).json(anouncement);
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
        const updateToggleStatus = await Anouncement.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).send(updateToggleStatus);
    } catch(error) {
        return res.status(500).send({ error: "Failed to update active status" });
    }
};

export const getAllAnouncement = async (req, res) => {
    try {
        const result = await Anouncement.find()
        // .populate('category', 'title')
        // .exec()

        return res.status(200).json( result );
    } catch(error) {
        return res.status(500).send({ error: "Error to getting Anouncement" });
    }
};

export const destroyOneAnouncement = async (req, res) => {
    try {
        const result = await Anouncement.deleteOne({ _id: req.body._id});

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "Anouncement successuly deleted" });
        }
        res.status(400).json({ message: "Anouncement deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};
