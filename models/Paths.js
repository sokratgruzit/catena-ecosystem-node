import * as mongoose from "mongoose";

const pathsShema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: 'nfts'
        },
        paths: {
            type: Array
        }
    },
    { timestamps: true }
);

export const Paths = mongoose.model("paths", pathsShema);
