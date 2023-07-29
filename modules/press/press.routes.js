import { Router } from "express";
import * as pressController from "./press.controller.js";

const router = Router();

router.route("/create").post(pressController.create);
router.route("/get-all-press").get(pressController.getAllPress);
router.route("/update-active-status").put(pressController.updateActiveStatus);
router.route("/get-active-press").get(pressController.getPressWithActiveStatus);
router.route("/delete").put(pressController.deleteOnePress);
router.route("/update").post(pressController.updatePress);
router.route("/get-one-press").post(pressController.getOnePress);

export default router;