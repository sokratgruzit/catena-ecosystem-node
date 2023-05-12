import { Router } from "express";
import * as FAQcontroller from "./FAQ.controller.js";

const router = Router();

router.route("/create").post(FAQcontroller.create);

export default router;
