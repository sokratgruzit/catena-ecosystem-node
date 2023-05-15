import { Proposals } from "../../models/Proposals.js";

export const createProposals = async (req, res) => {
    const { title, content, startDate, endDate, choicesId } = req.body;
    console.log(choicesId)
    try {
        const proposals = await Proposals.create({
            title: title,
            content: content,
            startDate: startDate,
            endDate: endDate,
            choices: choicesId
        });

        return res.status(200).json(proposals);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

export const getAllProposals = async (req, res) => {
    try {
        const allProposals = await Proposals.find()
        .populate("choices")
        .exec();

        return res.status(200).json(allProposals);
    } catch (error) {
        return res.status(500).json(error);
    }
};