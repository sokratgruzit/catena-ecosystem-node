import { Router } from "express";
import * as faqController from "./faq.controller.js";

const router = Router();

router.route("/create").post(faqController.create);
router.route("/update/:_id").put(faqController.update);
router.route("/remove/:_id").delete(faqController.remove);
router.route("/get-all-faq").get(faqController.getAllFaq);

export default router;
