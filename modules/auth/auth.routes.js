import { Router } from "express";
import * as authController from "./auth.controller.js";

const router = Router();

// router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

export default router;
