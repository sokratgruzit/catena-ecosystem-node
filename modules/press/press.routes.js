import express, { Router } from "express";
import * as pressController from "./press.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/press/' })

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/create").post(upload.fields([
    {name: "outter_image"},
    {name: "inner_image"},
]),pressController.press);
router.route("/get-all-press").get(pressController.getAllPress);
router.route("/update-active-status").put(pressController.updateActiveStatus);
router.route("/get-active-press").get(pressController.getPressWithActiveStatus);
router.route("/delete").delete(pressController.deleteOnePress);
router.route("/delete-many-press").delete(pressController.deleteManyPress)
router.route("/update-press").put(pressController.updatePress);
export default router;