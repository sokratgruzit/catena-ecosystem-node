import * as mongoose from "mongoose";

const OpenPositionShema = new mongoose.Schema(
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
        about_catena: {
            type: Object,
            default:{}
        },
        worcking_at_catena: {
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
        languages: {
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
        },
        featured: {
            type: String,
            default: "Yes",
        },
        remote: {
            type: String,
            default: "",
        },
        reference: {
            type: String,
            defoult: "",
        },
        active_status: {
            type: Boolean,
            default: true,
        },
        job_posting_from: {
            type: String,
            defoult: "",
        },
        job_posting_to: {
            type: String,
            defoult: "",
        },
        slug: {
            type: String,
            defoult: "",
        },
        sequence: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

export const OpenPosition = mongoose.model("openPosition", OpenPositionShema);