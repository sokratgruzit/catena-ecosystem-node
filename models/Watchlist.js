import * as mongoose from "mongoose";

const watchlistShema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            default: ''
        },
        token_ids: {
            type: Object,
            default: {}
        },
    },
    {
        timestamps: true,
    }
);

export const Watchlist = mongoose.model("watchlist", watchlistShema);