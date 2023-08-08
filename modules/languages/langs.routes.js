import { Router } from "express";
import * as langsController from "./langs.controller.js";

const router = Router();

router.route("/get-locales").get(langsController.getLocales);

export default router;