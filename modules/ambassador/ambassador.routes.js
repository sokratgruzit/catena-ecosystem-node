import { Router } from "express";
import * as AmbassadorController from "./ambassador.controller.js";

const router = Router();

router.route("/create-ambassador").post(AmbassadorController.create);
router.route("/get-all-ambassador").get(AmbassadorController.getAll);
router.route("/remove/:_id").delete(AmbassadorController.deleteAmbassador);

export default router;