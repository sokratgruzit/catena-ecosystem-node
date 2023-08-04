import { Router } from "express";
import * as translateController from "./translate.controller.js";

const router = Router();

router.route("/get-translates").get(translateController.getAllTranslates);
router.route("/create").post(translateController.create);
// router.route("/update-translate").put(translateController.updateTranslate);
// router.route("/delete-translate").delete(translateController.deleteTranslate);
// router.route("/delete-many-translate").delete(translateController.deleteManyTranslate);

export default router;