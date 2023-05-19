import { Router } from "express";
import * as faqController from "./faq.controller.js";

const router = Router();

router.route("/findeOneFaq").get(faqController.findOneFaq);
router.route("/findeAllFaq").get(faqController.findAllFaq);
router.route("/create").post(faqController.create);
router.route("/updateOneFaq").patch(faqController.updateOneFaq);
router.route("/changeStatus").patch(faqController.changeStatus);
router.route("/destroyOneFaq").delete(faqController.destroyOneFaq);

export default router;
