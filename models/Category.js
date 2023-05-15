import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const CategoryTranslatedFieldsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        logo_image: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

const CategorySchemaObject = {
    slug: {
        type: String,
        slug: "en.title",
        slugPaddingSize: 2,
        unique: true,
    },
};

Language.find().then((languages) => {
    languages.forEach((lang) => {
        CategorySchemaObject[lang.code] = CategoryTranslatedFieldsSchema;
    });
});

const categorySchema = new mongoose.Schema(CategorySchemaObject, {
    timestamps: true,
});

export const Category = mongoose.model("Category", categorySchema);