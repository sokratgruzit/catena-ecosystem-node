import { Language } from "./Language.js";
import slug from "mongoose-slug-updater";
import * as mongoose from "mongoose";

mongoose.plugin(slug);

const eventTranslatedFieldsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        badge: {
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

const EventSchemaObj = new mongoose.Schema(
    {
        time: {
            type: Date,
            default: Date.now,
        },
        cover_image: {
            type: String,
            required: true,
        },
        outter_image: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        active_status: {
            type: Boolean,
            default: true,
            required: true,
        },
        slug: {
            type: String,
            slug: "en.title",
            slugPaddingSize: 2,
            unique: true,
          },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        }]
    }
);

Language.find().then((languages) => {
    languages.forEach((lang) => {
        EventSchemaObj[lang.code] = eventTranslatedFieldsSchema;
    });
  });
  
  const EventSchema = new mongoose.Schema(EventSchemaObj, {
    timestamps: true,
  });

export const Event = mongoose.model("Event", EventSchema);