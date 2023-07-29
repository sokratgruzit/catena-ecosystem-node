import { Router } from "express";
import * as homePageSliderController from "./homePageSlider.controller.js";

const router = Router();

router.route("/get-all-home-page-slider").get(homePageSliderController.getAllHomePageSlider);
router.route("/create").post(homePageSliderController.createSlider);
router.route("/update-home-page-slider").put(homePageSliderController.updateHomePageSlider);
router.route("update-home-page-slider-status").put(homePageSliderController.updateHomePageSliderActiveStatus);
router.route("/delete-home-page-slider").delete(homePageSliderController.deleteHomePageSlider);

export default router;