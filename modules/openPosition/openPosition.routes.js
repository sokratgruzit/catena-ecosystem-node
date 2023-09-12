import { Router } from "express";
import * as openPositionController from "./openPosition.controller.js";

const router = Router();

router.route("/create").post(openPositionController.create);
router.route("/get-all-open-positions").get(openPositionController.getAllOpenPositions);
router.route("/get-active-open-positions").get(openPositionController.getActiveOpenPositions);
router.route("/get-featured-open-positions").get(openPositionController.getFeaturedOpenPositions);
router.route("/get-open-positions-by-id").get(openPositionController.getOpenPositionById);
router.route("/delete").put(openPositionController.deleteOpenPosition);
router.route("/edit").post(openPositionController.editOpenPosition);
router.route("/get-one-open-position").post(openPositionController.getOneOpenPosition);
router.route("/get-all-open-positions-slug").get(openPositionController.getAllOpenPositionSlug);

export default router; 