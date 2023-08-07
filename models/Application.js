import * as mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
        },
        descr: {
            type: String,
            default: ""
        },
        quiz: {
            type: String,
            default: "",
            // required: true,
        },
        lenguage: {
            type: String,
            default: ""
        },
        info: {
            type: String,
            default: ""
        },
        gitHub: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
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
