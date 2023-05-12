import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.route("/profile").post(userController.getUserInfo);

export default router;
