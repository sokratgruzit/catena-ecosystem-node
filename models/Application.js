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
        pone: {
            type: Number
        },
        descr: {
            type: String,
            default: ""
        },
        question1: {
            type: Boolean,
            default: false,
            required: true,
        },
        question2: {
            type: Boolean,
            default: false,
            required: true,
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
        image: {
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
