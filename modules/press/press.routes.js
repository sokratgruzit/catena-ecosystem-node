import express, { Router } from "express";
import * as pressController from "./press.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/create").post(upload.fields([
    {name: "outter_image"},
    {name: "inner_image"},
]),pressController.press);
router.route("/getallpress").get(pressController.getAllPress);

export default router;