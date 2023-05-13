import { Router } from "express";
import * as proposalsController from "./proposals.controller.js";

const router = Router();

router.route("/create").post(proposalsController.createProposals);
router.route("/get-all-proposals").get(proposalsController.getAllProposals)
export default router;