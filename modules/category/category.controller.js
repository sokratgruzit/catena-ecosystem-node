import { Category } from "../../models/Category.js";
import * as fs from 'fs';

export const category = async (req, res) => {
    const { title } = req.body;
    const { userId } = req.userId;

    if (!userId) {
        return res.status(400).send({ error: "User isn't authenticated" });
    }
    
    if (!title || !imagetargetPath || !logoImagetargetPaths) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    const imagePath = req.files['image'][0].path;
    const imagetargetPath = `uploads/${req.files['image'][0].originalname}`;

    const logoImagePaths = req.files['logo_image'][0].path;
    const logoImagetargetPaths = `uploads/${req.files['logo_image'][0].originalname}`;


    fs.rename(imagePath, imagetargetPath, handleImageUploadError);

    fs.rename(logoImagePaths, logoImagetargetPaths, handleImageUploadError);

    try {
        const category = await Category.create({
            title: title,
            image: imagetargetPath,
            logo_image: logoImagetargetPaths
        });

        return res.status(200).json(category);

    } catch (error) {
        return res.status(500).send({ error: "Error category created" })
    }

};

export const handleImageUploadError = (error) => {
    if (error) {
        console.log(`image exception ${error}`)
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).send({ error: "Error getting categories" });
    }
};