import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../../models/Admin.js";
import config from "../../config/index.js";

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return res.status(404).send({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({ error: "Invalid password" });
        }

        const accessToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
            expiresIn: "30d",
        });

        res.cookie("Access-Token", accessToken, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });

        res.cookie("Refresh-Token", refreshToken, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });

        return res.send({
            username: user.username,
            email: user.email,
        });

    } catch (errors) {
        return res.status(500).send({ error: "Error logging in" });
    }
};
module.exports = {
    adminLogin
}
