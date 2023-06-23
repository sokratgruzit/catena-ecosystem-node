import * as mongoose from "mongoose";

const anouncementsTranslateSchema = new mongoose.Schema(
    {
        name: String,
        title: String,
        inner_descr: String,
        text: String,
        lang: String,
        announcement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Announcement"
        }
    },
    {
        timestamps: true
    }
);

export const anouncementTranslate = mongoose.model("anouncementTranslate", anouncementsTranslateSchema);