import * as mongoos from "mongoose";

const ambassadorSchema = new mongoos.Schema(
  {
    userName: {
      type: String,
      default: {},
    },
    email: {
      type: String,
      default: {},
    },
    message: {
      type: String,
      default: {},
    },
  },
  { timestamps: true }
);

export const Ambassador = mongoos.model("Ambassador", ambassadorSchema);
