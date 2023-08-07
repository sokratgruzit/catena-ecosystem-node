import * as mongoose from "mongoose";

const careerSchema = mongoose.Schema(
  {
    title: {
      type: Object,
      default: {}
    },
//     slug: {
//       type: String,
//       default: "category.title",
//     },
    job: {
        type: String,
    },
    job_descr: {
        type: String,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Career = mongoose.model("Career", careerSchema);