import { Router } from "express";
import * as userController from "./user.controller.js";
import multer from "multer";

const upload = multer({ dest: "uploads/profile/" });
const router = Router();

router.route("/").post(userController.getUserInfo);
router.route("/profile").post(userController.validateAddress, userController.makeProfile);

export default router;
