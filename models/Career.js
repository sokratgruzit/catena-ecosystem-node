import * as mongoose from "mongoose";

const careerSchema = mongoose.Schema(
  {
//     title: {
//       type: Object,
//       default: {}
//     },
//     slug: {
//       type: String,
//       default: "category.title",
//     },
//     image: {
//       type: String,
//       required: true,
//     }
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);