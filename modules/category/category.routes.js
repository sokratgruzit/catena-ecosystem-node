import { Router } from "express";
import * as categoryController from "./category.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.route("/create").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo_image", maxCount: 1 },
  ]),
  categoryController.category,
);

router.route("/get-all-category").get(categoryController.getAllCategories);
export default router;
