import { Router } from "express";
import * as careersController from "./careers.controller.js";

const router = Router();

router.route("/create").post(careersController.create);
router.route("/get-all-careers").get(careersController.getAllCareers);
router.route("/get-active-careers").get(careersController.getActiveCareers);
router.route("/delete").put(careersController.deleteCareer);
router.route("/edit").put(careersController.editCareer)


export default router;