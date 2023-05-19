import * as mongoose from "mongoose";

const homePageSliderSchema = new mongoose.Schema(
    {
        title: {},
        description: {},
    }, { timestamps: true }
);

export const HomePageSlider = mongoose.model("slider", homePageSliderSchema);