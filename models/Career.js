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
        slug: {
            type: String,
            unique: true,
          },
        active_status: {
            type: Boolean,
            default: false,
        },
        job_type: {
            type: String,
            default: ""
        },
        remote: {
            type: Boolean,
            default: false,
        },
        department: {
            type: String,
        },
        responsibilities: {
            type: Array,
            defoult: []
        },
        requirements: {
            type: Array,
            defoult: []
        },
        benefits: {
            type: Array,
            defoult: []
        },
        // working_at_core_multichain: {
        //     type: Array,
        //     defoult: []
        // },
        // how_we_work: {
        //     type: Object,
        //     defoult: {}
        // },
        // about_core_multichain: {
        //     type: Object,
        //     defoult: {}
        // },
        job_level: {
            type: Object,
            defoult: {}
        },
        lenguages: {
            type: String,
            defoult: ""
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Career = mongoose.model("career", careerShema);