import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const FaqTranslatedFieldsSchema = new mongoose.Schema(
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

const FaqSchemaObject = {
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
    FaqSchemaObject[lang.code] = FaqTranslatedFieldsSchema;
  });
});

const FaqSchema = new mongoose.Schema(FaqSchemaObject, {
  timestamps: true,
});

export const Faq = mongoose.model("Faq", FaqSchema);
