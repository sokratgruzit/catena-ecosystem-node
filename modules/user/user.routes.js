import { Router } from "express";
import * as userController from "./user.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.route("/verify-email/:token").get(userController.verifyEmail);
router.route("/").post(userController.getUserInfo);
router.route("/profile").post(upload.single("image"), userController.makeProfile);

export default router;