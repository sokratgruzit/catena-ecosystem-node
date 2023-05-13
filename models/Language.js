import * as mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "language",
  },
  list: {
    type: Array,
    default: [
      {
        code: "en",
        title: "English",
      },
      {
        code: "ru",
        title: "Russian",
      },
    ],
  },
});

export const Language = mongoose.model("language", languageSchema);
