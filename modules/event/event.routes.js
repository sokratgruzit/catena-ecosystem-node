import express, { Router } from "express";
import * as eventControler from "./event.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/get-all-event").get(eventControler.getAllEvents);
router.route("/finde-all-active-event").get(eventControler.findAllActiveEvent);
router.route("/create-event").post(upload.fields([
    {name: "cover_image"},
    {name: "outter_image"},
    {name: "image"},
]),eventControler.createEvent);
router.route("/update").put(eventControler.update);
router.route("/update-active-status").put(eventControler.updateActiveStatus);
router.route("/delete-many-events").delete(eventControler.deleteManyEvents);
router.route("/delete-one-event").delete(eventControler.deleteOneEvent);

export default router;