import { Router } from "express";
import * as personsController from "./persons.controller.js";

import multer from "multer";
const upload = multer({ dest: 'uploads/' })

const router = Router();

router.route("/create").post(upload.single("image"),personsController.persons);
router.route("/getallpersons").get(personsController.getAllPersons)
export default router;