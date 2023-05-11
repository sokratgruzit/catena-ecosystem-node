import { Router } from "express";
import * as adminController from "./admin.controller.js";

const router = Router();

router.route("/").post(adminController.adminLogin);

export default router;
