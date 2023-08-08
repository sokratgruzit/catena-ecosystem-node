import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.route("/verify-email/:token").get(userController.verifyEmail);
router.route("/").post(userController.getUserInfo);
router.route("/profile").post(userController.makeProfile);

export default router;