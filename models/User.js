import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

//Users model
const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nick: { type: String, required: false },
  transactionHash: { type: String, required: false },
  email: { type: String, required: false, unique: false },
  mobile: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  password: { type: String, required: false },
  avatar: { type: Object, required: false },
  step: { type: Number, required: false },
  avatarLocked: { type: Boolean, required: false },
  team: { type: String, required: false },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  tempEmail: String,
  status: Boolean
});

userSchema.methods.generateEmailVerificationToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.emailVerificationToken = token;
  this.emailVerificationExpires = Date.now() + 3600000; // 1 hour from now

  return token;
};

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (!update.password) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(update.password, salt, (err, hash) => {
      if (err) return next(err);
      update.password = hash;
      next();
    });
  });
});

export const User = mongoose.model("User", userSchema);
