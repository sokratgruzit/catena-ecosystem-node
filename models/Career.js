import * as mongoose from "mongoose";

const careerShema = new mongoose.Schema(
    {
        title: {
            type: Object,
            default: {}
        },
        inner_descr: {
            type: Object,
            default: {}
        },
    },
    {
        timestamps: true,
    }
);

export const Career = mongoose.model("career", careerShema);