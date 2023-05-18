import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const PressTranslatedFieldsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    inner_descr: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const PressSchemaObject = {
  slug: {
    type: String,
    slug: "en.title",
    slugPaddingSize: 2,
    unique: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  active_status: {
    type: Boolean,
    default: false,
    required: true,
  },
  outter_image: {
    type: String,
    required: false,
  },
  inner_image: {
    type: String,
    required: false,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  persons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persons",
    },
  ],
};

Language.find().then((languages) => {
  languages.forEach((lang) => {
    PressSchemaObject[lang.code] = PressTranslatedFieldsSchema;
  });
});

const pressSchema = new mongoose.Schema(PressSchemaObject, {
  timestamps: true,
});
export const Press = mongoose.model("Press", pressSchema);
