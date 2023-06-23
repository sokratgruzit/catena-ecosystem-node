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
    const { title } = req.body;
    const randomString = Math.random().toString(15).slice(2, 30);


    const files = [...req.files['image'], ...req.files['logo_image']]

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    try {
        const image = await uploadImageMany(randomString, files, 'category')
        const category = await Category.create({
            title: title,
            slug: convertToSlug(title),
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

export const updateCategory = async (req, res) => {
    const { _id, title } = req.body;

    const image = req.files['image'];
    const logoImage = req.files['logo_image'];
    const files = [...image, ...logoImage];
    
    try {
        const randomString = Math.random().toString(15).slice(2, 30);
        const imagesUpdate = await uploadImageMany(randomString, files, 'category')
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: _id },
            {
                title: title,
                image: imagesUpdate[0],
                logo_image: imagesUpdate[1]
            },
            { new: true }
        );

        return res.status(200).json(updatedCategory)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

function convertToSlug(title) {
    const slug = title
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
        .trim(); // Remove leading/trailing spaces

    return slug;
}

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