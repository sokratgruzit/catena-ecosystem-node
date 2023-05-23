import * as mongoose from "mongoose";

const homePageSliderSchema = new mongoose.Schema(
    {
        title: {},
        description: {},
        status: {
            type: Boolean,
            require: true
        },
        slug: {
            type: String,
            slug: "title",
            slugPaddingSize: 2,
            unique: true,
        },
        homePageSliderTranslate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "homePageSliderTranslate"
        }
    }, { timestamps: true }
);

export const HomePageSlider = mongoose.model("slider", homePageSliderSchema);