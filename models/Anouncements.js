import { Language } from "./Language.js";
import slug from "mongoose-slug-updater";
import * as mongoose from "mongoose";

mongoose.plugin(slug);

const AnouncementTranslatedFieldsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
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

const AnouncementSchemaObj = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            default: Date.now,
        },
        cover_image: {
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
        AnouncementSchemaObj[lang.code] = AnouncementTranslatedFieldsSchema;
    });
  });
  
  const AnouncementSchema = new mongoose.Schema(AnouncementSchemaObj, {
    timestamps: true,
  });

export const Anouncement = mongoose.model("Anouncement", AnouncementSchema);