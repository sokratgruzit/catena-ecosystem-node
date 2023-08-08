import * as mongoose from "mongoose";

const translatesSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            unique: false,
        },
        translates: {
            type: Object,
            unique: false,
        },
    }, { timestamps: true }
);

export const Translates = mongoose.model("translates", translatesSchema);