import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-updater";
import * as Language from "./Language.js";

mongoose.plugin(slug);

const PressTranslatedFieldsSchema = mongoose.schema(
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
    outter_image: {
      type: String,
      required: false,
    },
    inner_image: {
      type: String,
      required: false,
    },
  },
  { _id: false }
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
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
};

Language.schema.obj.list.default.forEach((lang) => {
  PressSchemaObject[lang.code] = PressTranslatedFieldsSchema;
});

// create your schema
const pressSchema = mongoose.Schema(PressSchemaObject, {
  timestamps: true,
});

export const Press = mongoose.model("Press", pressSchema);
