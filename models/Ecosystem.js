import * as mongoose from "mongoose";

const ecosystemShema = new mongoose.Schema(
    {
        color: {
            type: String,
            default: "",
            required: false,
        },
        exchange_name: {
            type: String,
            default: "",
            required: false,
        },
        inner_descr: {
            type: Object,
            default: {}
        },
        active_status: {
            type: Boolean,
            default: false,
        },
        logo_image: {
            type: String,
        },
        // tab: {
        //     type: Object,
        //     required: false,
        // },
        exchange_link: {
            type: String,
            default: "",
            required: false,
        },
    },
    { timestamps: true }
);

export const Ecosystem = mongoose.model("ecosystem", ecosystemShema);
