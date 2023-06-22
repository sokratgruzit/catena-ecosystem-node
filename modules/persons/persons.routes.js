import { Router } from "express";
import * as personsController from "./persons.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.route("/get-all-persons").get(personsController.getAllPersons);
router.route("/create").post(upload.single("image"), personsController.persons);
router.route("/update-persons").delete(personsController.updatePerson);
router.route("/delete-persons").delete(personsController.deletePersons);

export default router;