import { Router } from "express";
import * as userController from "./user.controllers.js";

const router = Router();

router.route("/profile").post(userController.getUserInfo);

export default router;
