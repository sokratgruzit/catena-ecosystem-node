import { HomePageSlider } from "../../models/HomePageSlider.js";
import { homePageSliderTranslate } from "../../models/HomePageSlider.Translate.js";

export const createSlider = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const slider = await HomePageSlider.create({
            title: title,
            description: description,
            status: status
        });

        await homePageSliderTranslate.create({
            title: title,
            description: description,
            slider: slider._id.toString()
        });

        return res.status(200).json(slider);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getAllHomePageSlider = async (req, res) => {
    try {
        const allSlider = await HomePageSlider.find()
        .populate("homePageSliderTranslate")

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

export const deleteManyHomePageSlider = async (req, res) => {
    const { _id } = req.body;

    try {
        const deleteMany = await HomePageSlider.deleteMany({ _id: _id })

        return res.status(200).json(deleteMany);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateHomePageSliderActiveStatus = async (req, res) => {
    const { _id, status } = req.body;

    try {
        const updateSliderStatus = HomePageSlider.findOneAndUpdate(
            { _id: _id },
            { status: status },
            { new: true }
        );

        return res.status(200).json(updateSliderStatus);
    } catch (error) {
        return res.status(500).json(error);
    }
};