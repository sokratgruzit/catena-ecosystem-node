import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

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