import { Router } from "express";
import * as choicesController from "./choices.controller.js";

const router = Router();

router.route("/get-all-choices").get(choicesController.getAllChoices);
router.route("/create").post(choicesController.createChoices);

export default router;