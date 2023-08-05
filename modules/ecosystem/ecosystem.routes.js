import { Router } from "express";
import * as ecosystemController from "./ecosystem.controller.js";

const router = Router();

router.route("/create").post(ecosystemController.create);
router.route("/get-all-ecosystem").get(ecosystemController.getAllEcosystem);
router.route("/update-active-status").put(ecosystemController.updateActiveStatus);
router.route("/get-active-ecosystem").get(ecosystemController.getEcosystemWithActiveStatus);
router.route("/delete").put(ecosystemController.deleteOne);
router.route("/updateEcosystem").post(ecosystemController.updateEcosystem);
router.route("/get-one-ecosystem").post(ecosystemController.getOneEcosystem);

export default router;