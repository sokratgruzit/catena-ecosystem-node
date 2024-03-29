import { Router } from "express";
import * as adminController from "./admin.controller.js";

const router = Router();

router.route("/login").post(adminController.adminLogin);
router.route("/logout").post(adminController.adminLogout);

export default router;
