import { Router } from "express";
import * as VoiceMatterController from "./voiceMatter.controller.js";

const router = Router();

router.route("/create-feedback").post(VoiceMatterController.create);
router.route("/get-all-feedback").get(VoiceMatterController.getAll);
router.route("/remove/:_id").delete(VoiceMatterController.deleteFeedback);

export default router;