import { Category } from "../../models/Category.js";

export const create = async (req, res) => {
    const { title, image, logo_image } = req.body;

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    try {
        const cat = await Category.create({
            title,
            image,
            logo_image
        });

        return res.status(200).json(cat);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Error creating category" });
    }
};

export const update = async (req, res) => {
    const { _id, title, image, logo_image } = req.body;

    if (!title) {
        return res.status(400).send({
            message: "Fill all fealds"
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
        try {
            await Category.deleteOne({ _id });

            res.status(200).json({
                "message": "Category removed successfully"
            });
        } catch (err) {
            res.status(400).json({
                "message": err.message
            });
        }
    } else {
        res.status(404).json({
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