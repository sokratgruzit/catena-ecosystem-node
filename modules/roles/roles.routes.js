import express, { Router } from "express";
import * as rolesController from "./roles.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/get").get(rolesController.get);
router.route("/create").post(rolesController.create);
router.route("/update").put(rolesController.update);
router.route("/delete").post(rolesController.deleteRole);

export default router;