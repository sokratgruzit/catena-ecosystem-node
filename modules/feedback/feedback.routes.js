import { Router } from "express";
import * as feedbackController from "./feedback.controller.js";

const router = Router();

router.route("/create-feedback").post(feedbackController.create);
router.route("/get-all-feedback").get(feedbackController.getAll);
router.route("/remove/:_id").delete(feedbackController.deleteFeedback);

export default router;