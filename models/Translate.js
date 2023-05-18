import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const translateSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            // unique: true
        },
        translation: {},
    }, { timestamps: true }
);

translateSchema.plugin(slug);

export const Translate = mongoose.model("translate", translateSchema);