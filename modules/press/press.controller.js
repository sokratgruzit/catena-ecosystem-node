import { Press } from '../../models/Press.js';
import * as fs from 'fs';

export const press = async (req, res) => {
    const { title, text, inner_descr, time, active_status, categoryId, presonsId } = req.body;
    const { userId } = req.userId;

    if (!userId) {
        return res.status(400).send({ error: "User isn't authenticated" });
    }

    const imagePath = req.files['outter_image'][0].path;
    const imagetargetPath = `uploads/${req.files['outter_image'][0].originalname}`;

    const logoImagePaths = req.files['inner_image'][0].path;
    const logoImagetargetPaths = `uploads/${req.files['inner_image'][0].originalname}`;

    if (!title || !text || !inner_descr  || !imagetargetPath || !logoImagetargetPaths) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    fs.rename(imagePath, imagetargetPath, handleImageUploadError);

    fs.rename(logoImagePaths, logoImagetargetPaths, handleImageUploadError);

    try {
        const press = await Press.create({
            title: title,
            text: text,
            inner_descr: inner_descr,
            time: time,
            active_status: active_status,
            outter_image: imagetargetPath,
            inner_image: logoImagetargetPaths,
            category: categoryId,
            persons: presonsId,
        })
        .populate('category')
        .populate('persons')
        return res.status(200).json(press);
    } catch(error) {
        return res.status(500).send({ error: "Error press created" })
    }
};

export const handleImageUploadError = (error) => {
    if (error) {
        console.log(`image exception ${error}`)
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
