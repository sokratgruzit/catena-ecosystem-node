import * as mongoose from "mongoose";

const eventTranslateSchema = new mongoose.Schema(
    {
        title: String,
        text: String,
        inner_descr: String,
        event: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }
        ]
    },
    {
        timestamps: true
    }
);

export const eventTranslate = mongoose.model("eventTranslate", eventTranslateSchema);