import { Proposals } from "../../models/Proposals.js";

export const createProposals = async (req, res) => {
    const { title, content, startDate, endDate, choicesId } = req.body;

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

export const getOneProposals = async (req, res) => {
    const { _id } = req.body;

    try {
        const oneProposal = await Proposals.findOne({ _id })
        .populate("choices")
        .exec();

        return res.status(200).json(oneProposal);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getProposalsWithCommunity = async (req, res) => {
    const { type } = req.body;

    try {
        const proposalCommunity = await Proposals.find().where({'type': type})
        
        return res.status(200).json(proposalCommunity);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getProposalWithCore = async (req, res) => {
    const { type } = req.body;

    try {
        const proposalCore = await Proposals.find().where({'type': type})
        
        return res.status(200).json(proposalCore);
    } catch (error) {
        return res.status(500).json(error);
    }
};