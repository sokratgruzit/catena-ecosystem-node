import { Router } from "express";
import * as categoryController from "./category.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
router.route("/get-all-category").get(categoryController.getAllCategories);
router.route("/create").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo_image", maxCount: 1 },
  ]),
  categoryController.category,
);
router.route("/delete-category").delete(categoryController.deleteCategories);
router.route("/delete-many-category").delete(categoryController.deleteManyCategories);
export default router;
