import { Router } from "express";
import * as proposalsController from "./proposals.controller.js";

const router = Router();

router.route("/create").post(proposalsController.createProposals);
router.route("/get-all-proposals").get(proposalsController.getAllProposals);
router.route("/get-one-proposals").get(proposalsController.getOneProposals);
router.route("/get-proposals-community").get(proposalsController.getProposalsWithCommunity);
router.route("/get-proposals-core").get(proposalsController.getProposalWithCore);
export default router;