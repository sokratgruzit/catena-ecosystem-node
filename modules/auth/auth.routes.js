import { Router } from "express";
import * as authController from "./auth.controller.js";

const router = Router();

router.route("/register-wallet-address").post(authController.registerWalletAddress);
router.route("/register").post(authController.register);

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/logout").post(authController.logout);

export default router;
