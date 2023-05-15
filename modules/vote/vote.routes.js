import { Router } from "express";
import * as voteController from "./vote.controller.js";

const router = Router();

router.route("/create").post(voteController.incrementVote);
router.route("/get-all-votes").get(voteController.getAllVoteWithProposal);

export default router;