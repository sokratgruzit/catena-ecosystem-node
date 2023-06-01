import * as mongoose from "mongoose";

const pressTranslateSchema = new mongoose.Schema(
    {
        title: String,
        text: String,
        inner_descr: String,
        press:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Press",
        },

    },
    {
        timestamps: true
    }
);

export const pressTranslate = mongoose.model("pressTranslate", pressTranslateSchema);