require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Roles = require("../models/Roles");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const rolesSeederRunner = async () => {
    return [
        {name: 'administrator'},
        {name: 'client'}
    ]
};

const adminUserSeederRunner = async (roleId) => {
    let salt = await bcrypt.genSalt(10);

    let password = await bcrypt.hash("admin", salt);

    return {
        name: "admin",
        email: "admin@gmail.com",
        password: password,
        role: roleId
    }
};

const dbSeeder = async () => {

    let rolesJson = await rolesSeederRunner()
    await Roles.insertMany(rolesJson);

    let adminRole = await Roles.findOne({'name':'administrator'})

    let adminJson = await adminUserSeederRunner(adminRole._id)
    await User.create(adminJson)
}

dbSeeder().then(() => { mongoose.connection.close() })