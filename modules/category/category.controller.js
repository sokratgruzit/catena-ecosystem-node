import { Category } from "../../models/Category.js";
import fs from "fs";

export const create = async (req, res) => {
    const { title, slug, image, logo_image } = req.body;

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    let exists = await Category.findOne({ slug });

    if (exists) {
        let imgPath = `uploads/category/${image}`;
        let logoPath = `uploads/category/${logo_image}`;

        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });

        fs.unlink(logoPath, async (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });

        return res.status(200).json({ "message": "Category already exists" });
    } else {
        try {
            const cat = await Category.create({
                title,
                image,
                logo_image,
                slug
            });
    
            return res.status(200).json(cat);
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Error creating category" });
        }
    }
};

export const update = async (req, res) => {
    const { _id, title, image, logo_image } = req.body;

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    const findOldImgs = await Category.findOne({ _id });
    const oldImg = findOldImgs.image;
    const oldLogoImg = findOldImgs.logo_image;

    if (image && oldImg !== image) {
        let imgPath = `uploads/category/${oldImg}`;

        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
    }

    if (logo_image && oldLogoImg !== logo_image) {
        let logoPath = `uploads/category/${oldLogoImg}`;

        fs.unlink(logoPath, async (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
    }

    const updatedCat = await Category.findByIdAndUpdate(_id, {
        title,
        image,
        logo_image
    }, { new: true });

    if (!updatedCat) {
        res.status(400).json({
            "message": "Category not found",
        });
    } else {
        res.status(200).json({ "message": "Category updated" });
    }
};

export const remove = async (req, res) => {
    const { _id } = req.body;
    const cat = await Category.findOne({ _id });

    if (cat) {
        let imgPath = `uploads/category/${cat.image}`;
        let logoPath = `uploads/category/${cat.logo_image}`;

        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });

        fs.unlink(logoPath, async (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                res.status(400).json({
                    "message": "Something went wrong"
                });
            } else {
                console.log('File deleted successfully!');
                await Category.deleteOne({ _id });

                res.status(200).json({
                    "message": "Category removed successfully"
                });
            }
        });
    } else {
        res.status(200).json({
            "message": "Category not found"
        });
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