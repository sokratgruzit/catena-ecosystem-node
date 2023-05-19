import { Choices } from "../../models/Choices.js";

export const createChoices = async (req, res) => {
    const { title, voteId } = req.body;

    try {
        const choices = await Choices.create({
            title: title,
            vote: voteId
        });

        return res.status(200).json(choices);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

export const getAllChoices = async (req, res) => {
    console.log(req.body);
    try {
        const allChoices = await Choices.find()
        .populate('votes')
        .exec();

        return res.status(200).json(allChoices);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};