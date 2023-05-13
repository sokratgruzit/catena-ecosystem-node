import * as mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  fullname: { type: String, required: false },
  email: { type: String, required: false },
  mobile: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  nationality: { type: String, required: false },
  password: { type: String, required: false },
});

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
