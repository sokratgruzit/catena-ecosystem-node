import { Router } from "express";
import * as choicesController from "./choices.controller.js";

const router = Router();

router.route("/create").post(choicesController.createChoices);
router.route("/get-all-choices").get(choicesController.getAllChoices);
export default router;