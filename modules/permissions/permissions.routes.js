import express, { Router } from "express";
import * as permissionControler from "./permissions.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/get").get(permissionControler.get);
router.route("/update").put(permissionControler.update);
router.route("/delete").delete(permissionControler.deletePermision);

export default router;