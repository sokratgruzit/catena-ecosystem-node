import express, { Router } from "express";
import * as announcementControler from "./announcement.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/get-all-announcement").get(announcementControler.getAllAnnouncement);
router.route("/finde-all-active-announcement").get(announcementControler.findAllActiveAnnouncement);
router.route("/create-announcement").post(upload.fields([
    {name: "cover_image"},
    {name: "image"},
]),announcementControler.createAnnouncement);
router.route("/update").put(announcementControler.update);
router.route("/update-active-status").put(announcementControler.updateActiveStatus);
router.route("/destroy-one-announcement").delete(announcementControler.destroyOneAnnouncement);
router.route("/destroy-meny-announcement").delete(announcementControler.deleteManyAnnouncement);

export default router;