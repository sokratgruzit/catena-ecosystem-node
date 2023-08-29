import { User } from "../../models/User.js";
import { io } from "../../app.js";

import nodemailer from "nodemailer";
import { verification_template } from "../../utils/email_template.js";
import { paginateResults } from "../../utils/pagination.js";

export async function getAllUsers(req, res) {
  // Get all users
  try {
    const { page, limit } = req.body;

    const {
      results: users,
      totalPages,
      currentPage,
    } = await paginateResults(User, {}, page, limit);

    if (users && users.length > 0) {
      users.filter(user => {
        if (user.password) user.password = "";
        if (!user.isEmailVerified) user.email = user.tempEmail;
        
        return user;
      });

      return res.status(200).json({
        users,
        totalPages,
        currentPage,
      });
    } else {
      return res.status(200).json({
        users: [],
        totalPages,
        currentPage,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getUserInfo(req, res) {
  try {
    let { address } = req.body;

    if (!address) return res.status(400).send("no address");
    address = address.toLowerCase();

    const user = await User.findOne({ address: address });

    if (!user) return res.status(404).send("no user found");

    const returnUser = {
      address: user.address,
      fullname: user.fullname,
      email: user.isEmailVerified ? user.email : user.tempEmail,
      mobile: user.mobile,
      status: user.status,
      dateOfBirth: user.dateOfBirth,
      _id: user._id,
    };

    return res.status(200).send({ user: returnUser });
  } catch (e) {
    console.log(e);
    return res.status(404).send("no user or unauthorized");
  }
}

export async function makeProfile(req, res) {
  try {
    let {
      address,
      fullname,
      email,
      mobile,
      dateOfBirth,
      password,
      locale,
      status,
    } = req.body;

    if (!address) return res.status(400).send("no address");
    address = address.toLowerCase();

    const foundUser = await User.findOne({ address });
    if (!foundUser) return res.status(400).send("no user found");

    if (
      foundUser.isEmailVerified &&
      foundUser?.email &&
      foundUser?.email === email
    ) {
      // User is already verified and the email hasn't changed, no need to send a new verification email
    } else if (
      foundUser.isEmailVerified &&
      foundUser?.email &&
      foundUser?.email !== email
    ) {
      // User is verified, but the provided email is different, reset the verification status and send new verification email
      const token = foundUser.generateEmailVerificationToken();
      foundUser.isEmailVerified = false;
      foundUser.email = "";
      foundUser.tempEmail = email;
      foundUser.password = password;
      await foundUser.save();
      await sendVerificationEmail(email, token, locale);
      // Send verification email to the new email
    } else if (!foundUser.isEmailVerified && email) {
      // User is not verified, and a new email is provided, send a verification email
      const token = foundUser.generateEmailVerificationToken();
      foundUser.tempEmail = email;
      await foundUser.save();
      await sendVerificationEmail(foundUser.tempEmail, token, locale);
      // Send verification email to the new email
    } else {
      foundUser.isEmailVerified = false;
      foundUser.emailVerificationExpires = undefined;
      foundUser.emailVerificationToken = undefined;
      foundUser.tempEmail = undefined;
      foundUser.email = "";
      foundUser.password = "";
      foundUser.status = false;
      await foundUser.save();
    }

    let clearedUser = {};
    let query = { fullname, mobile, dateOfBirth, password, status };

    if (password === "") query = { fullname, mobile, dateOfBirth, status };

    const updatedUser = await User.findOneAndUpdate({ address }, query, {
      new: true,
    });

    clearedUser.email = updatedUser.isEmailVerified
      ? updatedUser.email
      : updatedUser.tempEmail;
    clearedUser.dateOfBirth = updatedUser.dateOfBirth;
    clearedUser.mobile = updatedUser.mobile;
    clearedUser.fullname = updatedUser.fullname;

    res.status(200).send(clearedUser);
  } catch (e) {
    console.log(e);
    return res.status(404).send("something went wrong");
  }
}

export async function verifyEmail(req, res) {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.email = user.tempEmail;
    user.tempEmail = undefined;
    await user.save();

    io.emit("emailVerified", user._id);

    res.status(200).send("Email verified");
  } catch (e) {
    res.status(404).send("Something went wrong");
  }
}

export async function sendVerificationEmail(email, verificationCode, locale) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verification Email",
      html: verification_template(
        `${process.env.FRONTEND_URL}/${locale}/overview/verify-email?token=${verificationCode}`
      ),
    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  } catch (e) {
    return "error";
  }
}
