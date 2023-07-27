import * as mongoose from "mongoose";

const homePageSliderTranslateSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        homePageSlider: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "HomePageSlider"
            }
        ]
    },
    {
        timestamps: true
    }
);

export const homePageSliderTranslate = mongoose.model("homePageSliderTranslate", homePageSliderTranslateSchema);