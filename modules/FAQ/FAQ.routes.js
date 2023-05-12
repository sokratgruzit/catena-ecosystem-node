import { Router } from "express";
import * as FAQcontroller from "./FAQ.controller.js";

const router = Router();

router.route("/create").post(FAQcontroller.create);
router.route("/findeFAQ").get(FAQcontroller.findOneFAQ);
router.route("/destroyOneFAQ").get(FAQcontroller.destroyOneFAQ);

export default router;
