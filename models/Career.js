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
            type: Object,
            default: {}
          },
        responsibilities: {
            type: Object,
            default: {},
        },
        requirements: {
            type: Object,
            default: {}
        },
        benefits: {
            type: Object,
            default: {},
        },
        about_core_multichain: {
            type: Object,
            default:{}
        },
        worcking_at_core_multichain: {
            type: Object,
            default:{}
        },
        how_we_work: {
            type: Object,
            default:{}
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
            type: String,
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
            defoult: "",
            default: false,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        job_posting_from: {
            type: String,
            defoult: "",
            default: false,
        },
        job_posting_to: {
            type: String,
            defoult: "",
            default: false,
        },
        job_id: {
            type: String,
            defoult: "",
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Career = mongoose.model("career", careerShema);