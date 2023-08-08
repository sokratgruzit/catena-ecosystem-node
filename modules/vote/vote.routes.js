import { Router } from "express";
import * as voteController from "./vote.controller.js";

const router = Router();

router.route("/get-all-votes").get(voteController.getAllVoteWithProposal);
router.route("/create").post(voteController.incrementVote);

export default router;