import { Router } from "express";
import * as watchlistController from "./watchlist.controller.js"

const router = Router();

router.route("/create-or-update").post(watchlistController.createOrUpdateWatchlist);
router.route("/get-watchlist").get(watchlistController.getAllList);

export default router; 