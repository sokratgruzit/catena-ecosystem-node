import { Router } from "express";
import * as announcementControler from "./announcement.controller.js";

const router = Router();

router.route("/get-all-announcement").get(announcementControler.getAllAnnouncement);
router.route("/create-announcement").post(announcementControler.create);
router.route("/delete-announcement").put(announcementControler.deleteOneAnnouncement);
router.route("/update-active-status").put(announcementControler.updateActiveStatus);
router.route("/update").post(announcementControler.updateAnnouncement);
// router.route("/finde-all-active-announcement").get(announcementControler.findAllActiveAnnouncement);

// router.route("/destroy-meny-announcement").delete(announcementControler.deleteManyAnnouncement);

export default router;