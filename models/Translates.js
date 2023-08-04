import * as mongoose from "mongoose";

const translatesSchema = new mongoose.Schema(
    {
        page: String,
        translates: {},
    }, { timestamps: true }
);

export const Translates = mongoose.model("translates", translatesSchema);