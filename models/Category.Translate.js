import * as mongoose from "mongoose";

const categoryTranslateSchema = new mongoose.Schema(
    {
        title: String,
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            }
        ],
    },
    {
        timestamps: true
    }
);

export const categoryTranslate = mongoose.model("categoryTranslate", categoryTranslateSchema);