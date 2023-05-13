import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const ProposalTranslatedFieldsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    }, { _id: false }
);

const ProposalsSchemaObject = {
    slug: {
        type: String,
        slug: "en.title",
        slugPaddingSize: 2,
        unique: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: Date.now,
    },
    choices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Choices",
        },
    ],
};

Language.find().then((languages) => {
    languages.forEach((lang) => {
        ProposalsSchemaObject[lang.code] = ProposalTranslatedFieldsSchema;
    });
});

const proposalsSchema = new mongoose.Schema(ProposalsSchemaObject, {
    timestamps: true,
});

export const Proposals = mongoose.model("Proposals", proposalsSchema);