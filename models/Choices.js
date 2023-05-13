import * as mongoose from "mongoose";

const ChoicesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        vote: {
            type: Number,
            default: 0
        }
    }
);

export const Choices = mongoose.model("Choices", ChoicesSchema);