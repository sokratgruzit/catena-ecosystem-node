import { Router } from "express";
import * as FAQcontroller from "./FAQ.controller.js";

const router = Router();

router.route("/create").post(FAQcontroller.create);
router.route("/updateOneFAQ").patch(FAQcontroller.updateOneFAQ);
router.route("/changeStatus").patch(FAQcontroller.changeStatus);
router.route("/findeOneFAQ").get(FAQcontroller.findOneFAQ);
router.route("/findeAllFAQ").get(FAQcontroller.findAllFAQ);
router.route("/destroyOneFAQ").delete(FAQcontroller.destroyOneFAQ);

export default router;
