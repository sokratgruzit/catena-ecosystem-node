import express, { Router } from "express";
import * as categoryController from "./category.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })

const app = express();
const router = Router();

app.use(isAuthenticated);

router.route("/create").post(upload.fields([
    {name:"image" , maxCount:1},
    {name:"logo_image", maxCount:1},
]),categoryController.category);

router.route("/getallcategory").get(categoryController.getAllCategories)
export default router;