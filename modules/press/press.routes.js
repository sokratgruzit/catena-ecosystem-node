import { Router } from "express";
import * as pressController from "./press.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.route("/get-all-press").get(pressController.getAllPress);
router.route("/get-active-press").get(pressController.getPressWithActiveStatus);
router.route("/create").post(upload.fields([
    { name: "inner_image" },
    { name: "outter_image" },
]), pressController.press);
router.route("/update-press").post(pressController.updatePress);
router.route("/update-active-status").put(pressController.updateActiveStatus);
router.route("/delete").post(pressController.deleteOnePress);
router.route("/delete-many-press").delete(pressController.deleteManyPress);

export default router;