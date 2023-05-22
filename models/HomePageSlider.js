import * as mongoose from "mongoose";

const homePageSliderSchema = new mongoose.Schema(
    {
        title: {},
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
        description: {},
    }, { timestamps: true }
);

export const HomePageSlider = mongoose.model("slider", homePageSliderSchema);