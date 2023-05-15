import { Category } from "../../models/Category.js";
import { imageUpload } from "../../utils/uploadImage.js";

export const category = async (req, res) => {
    const { title } = req.body;
    const randomString1 = Math.random().toString(15).slice(2, 30);
    const randomString2 = Math.random().toString(15).slice(2, 30);

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }
    console.log(req.files, 'dsa')
    try {
        const image = await imageUpload(randomString1, req.files['image'][0], req.files['image'][0].path, 'category');
        const logo_image = await imageUpload(randomString2, req.files['logo_image'][0], req.files['logo_image'][0].path, 'category');

        const person = await Category.create({
            title: title,
            image: image,
            logo_image: logo_image
        });

        return res.status(200).json(person);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Error creating category" });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).send({ error: "Error getting categories" });
    }
};