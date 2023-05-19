import { HomePageSlider } from "../../models/HomePageSlider.js";

export const createSlider = async (req, res) => {
    const { title, description } = req.body;

    try {
        const slider = await HomePageSlider.create({
            title: title,
            description: description
        });

        return res.status(200).json(slider);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getAllHomePageSlider = async (req, res) => {
    try {
        const allSlider = await HomePageSlider.find();

        return res.status(200).json(allSlider);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateHomePageSlider = async (req, res) => {
    const { _id, title, description } = req.body;

    try {
        const updateSlider = await HomePageSlider.findOneAndUpdate(
            { _id: _id },
            { title, description },
            { new: true }
        );

        return res.status(200).json(updateSlider);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

export const deleteHomePageSlider = async (req, res) => {
    const { _id } = req.body;

    try {
        const deleteSlider = await HomePageSlider.findByIdAndDelete({ _id: _id });

        return res.status(200).json(deleteSlider);
    } catch (error) {
        return res.status(500).json(error);
    }
};