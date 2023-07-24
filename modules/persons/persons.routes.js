import { Router } from "express";
import * as personsController from "./persons.controller.js";

const router = Router();

router.route("/create").post(personsController.create);
router.route("/update").post(personsController.update);
router.route("/remove").put(personsController.remove);
router.route("/get-all-persons").get(personsController.getAllPersons);

export default router;