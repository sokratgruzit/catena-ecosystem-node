import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const PersonsTranslatedFieldsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }, { _id: false }
);

const PersonsSchemaObject = {
    slug: {
        type: String,
        slug: "en.title",
        slugPaddingSize: 2,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
}

Language.find().then((languages) => {
    languages.forEach((lang) => {
        PersonsSchemaObject[lang.code] = PersonsTranslatedFieldsSchema;
    });
});

const personsSchema = new mongoose.Schema(PersonsSchemaObject, {
    timestamps: true,
});

export const Persons = mongoose.model("Persons", personsSchema);