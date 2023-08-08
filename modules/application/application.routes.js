import { Router } from "express";
import * as applicationController from "./application.controller.js";

const router = Router();

router.route("/create").post(applicationController.create);
router.route("/get-all-application").get(applicationController.getAllApplication);
router.route("/delete").put(applicationController.deleteOneApplication);
router.route("/get-one-application").post(applicationController.getOneApplication);
// router.route("/update").post(applicationController.updateapplication);

export default router;
