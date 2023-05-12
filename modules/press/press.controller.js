import { Press } from '../../models/Press.js';
import { imageUpload } from '../../utils/upload.js';

export const press = async (req, res) => {
    const { title, text, inner_descr, time, active_status, categoryId, personsId } = req.body;
    const randomString1 = Math.random().toString(15).slice(2, 30);
    const randomString2 = Math.random().toString(15).slice(2, 30);

    if (!title || !text || !inner_descr  ) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    const outter_image = await imageUpload(randomString1, req.files['outter_image'][0], req.files['outter_image'][0].path, 'press');
    const inner_image = await imageUpload(randomString2, req.files['inner_image'][0], req.files['inner_image'][0].path, 'press');

    try {
        const press = await Press.create({
            title: title,
            text: text,
            inner_descr: inner_descr,
            time: time,
            active_status: active_status,
            outter_image: outter_image,
            inner_image: inner_image,
            category: categoryId,
            persons: personsId,
        })
        .populate('category')
        .populate('persons')

        return res.status(200).json(press);
    } catch(error) {
        return res.status(500).send({ error: "Error press created" })
    }
};

export const updateActiveStatus = async (req, res) => {
    const { _id, active_status } = req.body;
    const filter = { _id };
    const update = { active_status };

    try {
        const updateToggleStatus = await Press.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).send(updateToggleStatus);
    } catch(error) {
        return res.status(500).send({ error: "Failed to update active status" });
    }
};

export const getAllPress = async (req, res) => {
    try {
        const press = await Press.find()
        .populate('category', 'title')
        .populate('persons')
        .exec()

        return res.status(200).json(press);
    } catch(error) {
        return res.status(500).send({ error: "Error to getting press" });
    }
};
