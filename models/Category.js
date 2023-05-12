import * as mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        logo_image: {
            type: String,
            required: true,
        },
        press: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Press",
        }
    },
    {
        timestamps: true
    }
);

export const Category = mongoose.model("Category", categorySchema);