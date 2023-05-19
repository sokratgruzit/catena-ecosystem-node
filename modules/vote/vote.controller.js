import { Votes } from "../../models/Vote.js";

export const incrementVote = async (req, res) => {
    const { votes, walletAddress, amount, choicesId, proposalId } = req.body;
    console.log(req.body)
    try {
        const vote = await Votes.create({
            vote: votes,
            walletAddress: walletAddress,
            amount: amount,
            choices: choicesId,
            proposal: proposalId
        });

        return res.status(200).json(vote);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getAllVoteWithProposal = async (req, res) => {
    const { proposalId } = req.body;

    try {
        const allVotes = await Votes.find({proposalId})
        .populate('proposal')
        .exec();

        return res.status(200).json(allVotes);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
};