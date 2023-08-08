import { Router } from "express";
import * as eventController from "./event.controller.js";

const router = Router();

router.route("/create").post(eventController.create);
router.route("/get-all-event").get(eventController.getAllEvent);
router.route("/get-all-event-slug").get(eventController.getAllEventSlug);
router.route("/update-active-status").put(eventController.updateActiveStatus);
router.route("/get-active-event").get(eventController.getEventWithActiveStatus);
router.route("/delete").put(eventController.deleteOneEvent);
router.route("/update").post(eventController.updateEvent);
router.route("/get-one-event").post(eventController.getOneEvent);

export default router;
