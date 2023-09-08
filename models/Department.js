import * as mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    department_name: {
      type: Object,
      default: {},
    },
    active_status: {
        type: Boolean,
        default: false,
    },
  },
  { timestamps: true }
);

export const Department = mongoose.model("department", departmentSchema);
