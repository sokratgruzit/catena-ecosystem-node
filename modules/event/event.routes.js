import express, { Router } from "express";
import * as eventControler from "./event.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/create-event").post(upload.fields([
    {name: "cover_image"},
    {name: "outter_image"},
    {name: "image"},
]),eventControler.createEvent);
router.route("/update-active-status").put(eventControler.updateActiveStatus);
router.route("/get-all-event").get(eventControler.getAllEvents);
router.route("/destroy-one-event").delete(eventControler.destroyOneEvent);

export default router;