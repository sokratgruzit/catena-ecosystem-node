import express, { Router } from "express";
import * as anouncementControler from "./anouncement.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
const app = express();

app.use(isAuthenticated);

router.route("/create-anouncement").post(upload.fields([
    {name: "cover_image"},
    {name: "image"},
]),anouncementControler.createAnouncement);
router.route("/update-active-status").put(anouncementControler.updateActiveStatus);
router.route("/get-all-anouncement").get(anouncementControler.getAllAnouncement);
router.route("/destroy-one-anouncement").delete(anouncementControler.destroyOneAnouncement);

export default router;