import { Router } from "express";
import * as pressController from "./press.controller.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })

const router = Router();

router.route("/create").post(upload.fields([
    {name: "outter_image"},
    {name: "inner_image"},
]),pressController.press);
router.route("/getallpress").get(pressController.getAllPress);

export default router;