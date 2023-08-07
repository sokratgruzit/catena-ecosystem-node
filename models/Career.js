import * as mongoose from "mongoose";

const careerShema = new mongoose.Schema(
    {
        title: {
            type: Object,
            default: {}
        },
        department: {
            type: Object,
            default: {}
        },
        summary: {
            type: String,
            unique: true,
          },
        responsibilities: {
            type: Boolean,
            default: false,
        },
        requirements: {
            type: String,
            default: ""
        },
        benefits: {
            type: Boolean,
            default: false,
        },
        about_core_multichain: {
            type: String,
        },
        worcking_at_core_multichain: {
            type: Array,
            defoult: []
        },
        how_we_work: {
            type: Array,
            defoult: []
        },
        job_level: {
            type: String,
            defoult: ""
        },
        salary_range_from: {
            type: String,
            defoult: ""
        },
        salary_range_to: {
            type: String,
            defoult: ""
        },
        educational_level: {
            type: Object,
            defoult: ""
        },
        career_languages: {
            type: String,
            defoult: ""
        },
        locations: {
            type: String,
            defoult: ""
        },
        type: {
            type: String,
            default: false,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        job_posting_from: {
            type: Number,
            default: false,
        },
        job_posting_to: {
            type: Number,
            default: false,
        },
        job_id: {
            type: Number,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Career = mongoose.model("career", careerShema);