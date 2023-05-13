import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const ChoicesTranslatedFieldsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
    }, { _id: false }
);

const ChoicesSchemaObject = {
    slug: {
        type: String,
        slug: "en.title",
        slugPaddingSize: 2,
        unique: true,
    },
    vote: {
        type: Number,
        default: 0
    }
};

Language.find().then((languages) => {
    languages.forEach((lang) => {
        ChoicesSchemaObject[lang.code] = ChoicesTranslatedFieldsSchema;
    });
});

const choicesSchema = new mongoose.Schema(ChoicesSchemaObject, {
    timestamps: true,
});

export const Choices = mongoose.model("Choices", choicesSchema);