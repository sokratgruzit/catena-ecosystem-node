import * as mongoos from "mongoose";

const voiceMatterSchema = new mongoos.Schema(
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

export const VoiceMatter = mongoos.model("VoiceMatter", voiceMatterSchema);
