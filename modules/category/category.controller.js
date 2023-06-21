import { Category } from "../../models/Category.js";
import { categoryTranslate } from "../../models/Category.Translate.js";
import { uploadImageMany } from "../../utils/uploadImageMany.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        .populate("categoryTranslate")
        
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
};

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
        const category = await Category.create({
            title: title,
            image: image[0],
            logo_image: image[1]
        });

        await categoryTranslate.create({
            title: title,
            category: category._id.toString()
        });

        return res.status(200).json(category);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

// i create this function to update category, i can't test it with postman so i'm waiting front
export const updateCategory = async (req, res) => {
    const { _id, userId, title } = req.body;
    const image = req.files['image'];
    const logoImage = req.files['logo_image'];
    const files = [...image, ...logoImage];

    try {
        const imagesUpdate = await uploadImageMany(userId, files, 'category')
        const updatedCategory = await Category.findOneAndUpdate(
            { _id : _id },
            {
                title: title,
                image: imagesUpdate[0],
                logo_image: imagesUpdate[1]
            },
            { new: true }
        )
        console.log(updatedCategory, 'updatedCategory')
        return res.status(200).json(updatedCategory)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const deleteCategories = async (req, res) => {
    const { _id } = req.body;

    try {
        const categoryDelete = await Category.findOneAndDelete({ _id: _id });

        return res.status(200).json(categoryDelete);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deleteManyCategories = async (req, res) => {
    const { _id } = req.body;

    try {
        const deleteMany = await Category.deleteMany({ _id: _id });

        return res.status(200).json(deleteMany);
    } catch (error) {
        return res.status(500).json(error);
    }
};