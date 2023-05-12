import express, { Router } from "express";
import * as personsController from "./persons.controller.js";
import { isAuthenticated } from "../../services/isAuthenticated.js";
import multer from "multer";

const upload = multer({ dest: 'uploads/' })
const app = express();
const router = Router();

app.use(isAuthenticated);

router.route("/create").post(upload.single("image"),personsController.persons);
router.route("/get-all-persons").get(personsController.getAllPersons)
export default router;