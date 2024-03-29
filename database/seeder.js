import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";
import { Roles } from "../models/Roles.js";
import { Languages } from "../models/Languages.js";

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rolesSeederRunner = async () => {
  return [{ name: "administrator" }, { name: "client" }];
};

const adminAdminSeederRunner = async (roleId) => {
  let salt = await bcrypt.genSalt(10);

  let password = await bcrypt.hash("admin", salt);

  return {
    name: "admin",
    email: "admin@gmail.com",
    password: password,
    role: roleId,
  };
};

const dbSeeder = async () => {
  let rolesJson = await rolesSeederRunner();
  let langs = {
    name: "language",
    list: [
      { code: "en", title: "English" },
      { code: "ru", title: "Russian" },
      { code: "ka", title: "Georgian" },
    ]
  };

  await Roles.insertMany(rolesJson);

  let adminRole = await Roles.findOne({ name: "administrator" });

  let adminJson = await adminAdminSeederRunner(adminRole._id);

  await Admin.create(adminJson);
  await Languages.create(langs);
};

dbSeeder().then(() => {
  mongoose.connection.close();
});
