import * as mongoose from "mongoose";

const anouncementsTranslateSchema = new mongoose.Schema(
    {
        name: String,
        title: String,
        text: String,
        inner_descr: String,
        anouncement: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Anouncement"
            }
        ],
    },
    {
        timestamps: true,
    }
);

export const anouncementTranslate = mongoose.model("anouncementTranslate", anouncementTranslate);