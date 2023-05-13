import { Choices } from "../../models/Choices.js";

export const createChoices = async (req, res) => {
    const { title } = req.body;

    try {
        const choices = await Choices.create({
            title: title
        });

        return res.status(200).json(choices);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

export const getAllChoices = async (req, res) => {
    try {
        const allChoices = await Choices.find();

        return res.status(200).json(allChoices);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateChoicesWIthVote = async (req, res) => {
    const { _id, vote } = req.body;
    const filter = { _id };
    const update = { vote };

    try {
        const updateVote = await Choices.findOneAndUpdate(filter, update);

        return res.status(200).json(updateVote);
    } catch (error) {
        return res.status(500).json(error);
    }
}; 