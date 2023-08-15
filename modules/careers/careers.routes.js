import { Router } from "express";
import * as careersController from "./careers.controller.js";

const router = Router();

router.route("/create").post(careersController.create);
router.route("/get-all-careers").get(careersController.getAllCareers);
router.route("/get-active-careers").get(careersController.getActiveCareers);
router.route("/get-careers-by-id").get(careersController.getCareerById);
router.route("/delete").put(careersController.deleteCareer);
router.route("/edit").put(careersController.editCareer);
router.route("/get-one-career").post(careersController.getOneCareer);
router.route("/get-all-careers-slug").get(careersController.getAllCareerSlug);

export default router; 