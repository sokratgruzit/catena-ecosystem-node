import * as mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
            required: false,
        },
        email: {
            type: String,
            default: "",
            required: false,
        },
        phone: {
            type: String,
            default: "0",
            required: false,
        },
        descr: {
            type: String,
            default: "",
            required: false,
        },
        // quiz: {
        //     type: String,
        //     default: "",
        //     // required: true,
        // },
        lenguage: {
            type: String,
            default: "",
            required: false,
        },
        info: {
            type: String,
            default: "",
            required: false,
        },
        gitHub: {
            type: String,
            default: "",
            required: false,
        },
        linkedin: {
            type: String,
            default: "",
            required: false,
        },
        file: {
            type: String,
            required: false,
        },
        jobId: {
            type: String,
            require: false,
        }
    },
    { timestamps: true }
);

export const Application = mongoose.model("application", applicationSchema);
