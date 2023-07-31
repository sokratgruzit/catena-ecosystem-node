import { Router } from "express";
import * as ecosystemController from "./ecosystem.controller.js";

const router = Router();

router.route("/create").post(ecosystemController.create);
router.route("/get-all-ecosystem").get(ecosystemController.getAllEcosystem);
// router.route("/update-active-status").put(ecosystemController.updateActiveStatus);
// router.route("/get-active-press").get(ecosystemController.getPressWithActiveStatus);
router.route("/delete").put(ecosystemController.deleteOne);
router.route("/updateEcosystem").post(ecosystemController.updateEcosystem);
// router.route("/get-one-press").post(ecosystemController.getOnePress);

export default router;