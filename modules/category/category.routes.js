import { Router } from "express";
import * as categoryController from "./category.controller.js";

const router = Router();

router.route("/create").post(categoryController.create);
router.route("/update").post(categoryController.update);
router.route("/remove").put(categoryController.remove);
router.route("/get-all-category").get(categoryController.getAllCategories);

export default router;
