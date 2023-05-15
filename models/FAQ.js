import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const FAQTranslatedFieldsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const FAQSchemaObject = {
  slug: {
    type: String,
    slug: "en.title",
    slugPaddingSize: 2,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true
  },
};

Language.find().then((languages) => {
  languages.forEach((lang) => {
    FAQSchemaObject[lang.code] = FAQTranslatedFieldsSchema;
  });
});

const FAQSchema = new mongoose.Schema(FAQSchemaObject, {
  timestamps: true,
});

export const FAQ = mongoose.model("FAQ", FAQSchema);
