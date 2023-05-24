import { Router } from "express";
import * as faqController from "./faq.controller.js";

const router = Router();

router.route("/finde-one-faq").get(faqController.findOneFaq);
// router.route("/finde-all-active-faq").get(faqController.findAllActiveFaq);
router.route("/finde-all-faq").get(faqController.findAllFaq);
router.route("/create").post(faqController.create);
router.route("/update-one-faq").patch(faqController.updateOneFaq);
router.route("/change-status").patch(faqController.changeStatus);
router.route("/delete-one-faq").delete(faqController.deleteOneFaq);

export default router;
