import { User } from "../../models/User.js";
import { imageUpload } from "../../utils/uploadImage.js";

import nodemailer from "nodemailer";
import { verification_template } from "../../utils/email_template.js";

export async function getUserInfo(req, res) {
  try {
    let { address } = req.body;

    if (!address) return res.status(400).send("no address");
    address = address.toLowerCase();

    // const userId = req.userId;
    // if (!userId) return res.status(404).send("unauthorized");

    const user = await User.findOne({ address: address });
    if (!user) return res.status(404).send("no user found");

    const returnUser = {
      address: user.address,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      dateOfBirth: user.dateOfBirth,
      nationality: user.nationality,
    };

    return res.status(200).send({ user: returnUser });
  } catch (e) {
    console.log(e);
    return res.status(404).send("no user or unauthorized");
  }
}

// export async function makeProfile(req, res) {
//   try {
//     let { address, fullname, email, mobile, dateOfBirth, nationality } = req.body;

//     if (!address) return res.status(400).send("no address");
//     address = address.toLowerCase();

//     const foundUser = await User.findOne({ address });
//     if (!foundUser) return res.status(400).send("no user found");

//     await imageUpload(address, req.file, "profile");
//     const updatedUser = await User.findOneAndUpdate(
//       { address },
//       { fullname, email, mobile, dateOfBirth, nationality },
//       { new: true },
//     );

//     res.status(200).send({ result: updatedUser });
//   } catch (e) {
//     return res.status(404).send("something went wrong");
//   }
// }

export async function makeProfile(req, res) {
  try {
    let { address, fullname, email, mobile, dateOfBirth, nationality } = req.body;

    if (!address) return res.status(400).send("no address");
    address = address.toLowerCase();

    const foundUser = await User.findOne({ address });
    if (!foundUser) return res.status(400).send("no user found");

    await imageUpload(address, req.file, "profile");

    if (foundUser.isEmailVerified && foundUser?.email && foundUser?.email === email) {
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
      await foundUser.save();
      await send_verification_mail(email, token);
      // Send verification email to the new email
    } else if (!foundUser.isEmailVerified && email) {
      // User is not verified, and a new email is provided, send a verification email
      const token = foundUser.generateEmailVerificationToken();
      foundUser.tempEmail = email;
      await foundUser.save();
      await send_verification_mail(email, token);
      // Send verification email to the new email
    } else {
      foundUser.isEmailVerified = false;
      foundUser.emailVerificationExpires = undefined;
      foundUser.emailVerificationToken = undefined;
      foundUser.tempEmail = undefined;
      foundUser.email = "";
      await foundUser.save();
    }

    const updatedUser = await User.findOneAndUpdate(
      { address },
      { fullname, mobile, dateOfBirth, nationality },
      { new: true },
    );

    res.status(200).send({ result: updatedUser });
  } catch (e) {
    console.log(e);
    return res.status(404).send("something went wrong");
  }
}

export async function verifyEmail(req, res) {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token,
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
    res.status(200).send("Email verified");
  } catch (e) {
    res.status(404).send("Something went wrong");
  }
}

export async function send_verification_mail(email, verification_code) {
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
        process.env.FRONTEND_URL + "/verify/email/" + verification_code,
      ),
    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  } catch (e) {
    return "error";
  }
}

// export async function makeProfile(req, res) {
//   try {
//     let { address, fullname, email, mobile, dateOfBirth, nationality } = req.body;
//     address = address.toLowerCase();

//     const image = await imageUpload(
//       address,
//       req.files.image,
//       req.files.image.path,
//       "profile",
//     );
//     const updatedUser = await User.findOneAndUpdate(
//       { address },
//       { fullname, email, mobile, dateOfBirth, nationality },
//       { new: true },
//     );

//     res.status(200).send({ result: updatedUser });
//   } catch (e) {
//     console.log(e);
//     return res.status(404).send("something went wrong");
//   }
// }
// export async function validateAddress(req, res, next) {
//   const form = formidable({ multiples: true });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Error", err);
//       throw err;
//     }

//     console.log(fields);
//     console.log(files);

//     let { address } = fields;

//     if (!address) return res.status(400).send("no address");
//     address = address.toLowerCase();

//     const foundUser = await User.findOne({ address });
//     if (!foundUser) return res.status(400).send("no user found");

//     req.body = fields; // save the fields to req.body so they can be used in the next middleware
//     req.files = files; // save the files to req.files so they can be used in the next middleware

//     next(); // Go to the next middleware
//   });
// }
