import { Category } from "../../models/Category.js";
import { uploadImageMany } from "../../utils/uploadImageMany.js";

export const category = async (req, res) => {
    const { title, userId } = req.body;

    const files = [...req.files['image'], ...req.files['logo_image']]

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    try {
        const image = await uploadImageMany(userId, files, 'category')
        const person = await Category.create({
            title: title,
            image: image,
            logo_image: image
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