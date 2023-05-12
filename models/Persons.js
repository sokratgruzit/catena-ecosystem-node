import * as mongoose from "mongoose";

const personsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        press: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Press",
        }
    }
);

export const Persons = mongoose.model("Persons", personsSchema);