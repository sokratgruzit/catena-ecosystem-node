import { Router } from "express";
import * as careersController from "./careers.route.js";

const router = Router();

router.route("/create").post(careersController.create);
router.route("/delete").put(careersController.deleteCareer);
router.route("/edit").put(careersController.editCareer)
router.route("/get-all-careers").get(careersController.getAllCareers);


export default router;
