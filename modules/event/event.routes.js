import { Router } from "express";
import * as eventControler from "./event.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.route("/create").post(eventControler.create);
router.route("/get-all-event").get(eventControler.getAllEvent);
router.route("/update-active-status").put(eventControler.updateActiveStatus);
router.route("/get-active-event").get(eventControler.getEventWithActiveStatus);
router.route("/delete").put(eventControler.deleteOneEvent);
router.route("/update").post(eventControler.updateEvent);

export default router;