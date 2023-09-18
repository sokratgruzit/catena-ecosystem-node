import { User } from "../../models/User.js";
import { io } from "../../app.js";
import axios from "axios";

import nodemailer from "nodemailer";
import { verification_template } from "../../utils/email_template.js";
import { paginateResults } from "../../utils/pagination.js";

export async function getProfileImages(req, res) {

  let data = [
    {
      id: "QmVCmhfX15r92Ho4VscPQk3EucLq2PzhZ18Q5XQL62i4UQ",
      img: "https://infura-ipfs.io/ipfs/QmVCmhfX15r92Ho4VscPQk3EucLq2PzhZ18Q5XQL62i4UQ",
      name: "Storm",
      price: "1",
      url: "https://sokrat-nfts.infura-ipfs.io/ipfs/QmVCmhfX15r92Ho4VscPQk3EucLq2PzhZ18Q5XQL62i4UQ",
      description: "Storm",
      website: "catena.network",
      royalties: "20",
      fileSize: "100",
      category: "Profile",
      property: "Anarchy",
      social: {
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: "Qma3nyDUc5T3Qop9bskFGGq3H221SWnaw7YeHibiJtQCBq",
      img: "https://infura-ipfs.io/ipfs/Qma3nyDUc5T3Qop9bskFGGq3H221SWnaw7YeHibiJtQCBq",
      name: "Samurai",
      price: "1",
      url: "https://sokrat-nfts.infura-ipfs.io/ipfs/Qma3nyDUc5T3Qop9bskFGGq3H221SWnaw7YeHibiJtQCBq",
      description: "Samurai",
      website: "catena.network",
      royalties: "20",
      fileSize: "100",
      category: "Profile",
      property: "Anarchy",
      social: {
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: "QmTE5F635ZB3bHntbmcLxsf6ESBYV1EP6HoE2nDSg5GN8a",
      img: "https://infura-ipfs.io/ipfs/QmTE5F635ZB3bHntbmcLxsf6ESBYV1EP6HoE2nDSg5GN8a",
      name: "Moon",
      price: "1",
      url: "https://sokrat-nfts.infura-ipfs.io/ipfs/QmTE5F635ZB3bHntbmcLxsf6ESBYV1EP6HoE2nDSg5GN8a",
      description: "Moon",
      website: "catena.network",
      royalties: "20",
      fileSize: "100",
      category: "Profile",
      property: "Anarchy",
      social: {
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: "Qmcre8w5dSfGWiveeyAPkA7JJ3XWcYNksRveTiZB8PhhVX",
      img: "https://infura-ipfs.io/ipfs/Qmcre8w5dSfGWiveeyAPkA7JJ3XWcYNksRveTiZB8PhhVX",
      name: "Light",
      price: "1",
      url: "https://sokrat-nfts.infura-ipfs.io/ipfs/Qmcre8w5dSfGWiveeyAPkA7JJ3XWcYNksRveTiZB8PhhVX",
      description: "Light",
      website: "catena.network",
      royalties: "20",
      fileSize: "100",
      category: "Profile",
      property: "Anarchy",
      social: {
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: "QmTzzhoefNAeLuU2tqPKF5Wyc9payX9pvoUVQf7zZmKjM5",
      img: "https://infura-ipfs.io/ipfs/QmTzzhoefNAeLuU2tqPKF5Wyc9payX9pvoUVQf7zZmKjM5",
      name: "Lucky",
      price: "1",
      url: "https://sokrat-nfts.infura-ipfs.io/ipfs/QmTzzhoefNAeLuU2tqPKF5Wyc9payX9pvoUVQf7zZmKjM5",
      description: "Lucky",
      website: "catena.network",
      royalties: "20",
      fileSize: "100",
      category: "Profile",
      property: "Anarchy",
      social: {
        instagram: "https://www.instagram.com",
        facebook: "https://www.facebook.com",
        twitter: "https://twitter.com"
      }
    }
  ];

  return res.status(200).json(data);
}

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

    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(404).send("no user or unauthorized");
  }
}

export async function makeProfile(req, res) {
  try {
    let query = {};
    let address = req.body.address;

    if (!req.body.address) return res.status(400).send("no address");
    address = address.toLowerCase();

    const foundUser = await User.findOne({ address });
    if (!foundUser) return res.status(400).send("no user found");

    if (!req.body.step) {
      query = {
        step: 1,
        avatar: req.body.avatar,
        avatarLocked: req.body.avatarLocked
      };
    }

    if (req.body.step === 1) {
      query = {
        step: 2,
      };
    }

    if (req.body.step === 2) {
      query = {
        step: 2,
        team: req.body.team,
        avatarLocked: req.body.avatarLocked
      };
    }

    if (req.body.step === 3) {
      query = {
        step: 3,
        nick: req.body.nick
      };
    }

    if (req.body.step === 10) {
      query = {
        step: 0
      };
    }

    const updatedUser = await User.findOneAndUpdate({ address }, query, {
      new: true,
    });

    res.status(200).send(updatedUser);
    //   if (
    //     foundUser.isEmailVerified &&
    //     foundUser?.email &&
    //     foundUser?.email === email
    //   ) {
    //     // User is already verified and the email hasn't changed, no need to send a new verification email
    //   } else if (
    //     foundUser.isEmailVerified &&
    //     foundUser?.email &&
    //     foundUser?.email !== email
    //   ) {
    //     // User is verified, but the provided email is different, reset the verification status and send new verification email
    //     const token = foundUser.generateEmailVerificationToken();
    //     foundUser.isEmailVerified = false;
    //     foundUser.email = "";
    //     foundUser.tempEmail = email;
    //     foundUser.password = password;
    //     await foundUser.save();
    //     await sendVerificationEmail(email, token, locale);
    //     // Send verification email to the new email
    //   } else if (!foundUser.isEmailVerified && email) {
    //     // User is not verified, and a new email is provided, send a verification email
    //     const token = foundUser.generateEmailVerificationToken();
    //     foundUser.tempEmail = email;
    //     await foundUser.save();
    //     await sendVerificationEmail(foundUser.tempEmail, token, locale);
    //     // Send verification email to the new email
    //   } else {
    //     foundUser.isEmailVerified = false;
    //     foundUser.emailVerificationExpires = undefined;
    //     foundUser.emailVerificationToken = undefined;
    //     foundUser.tempEmail = undefined;
    //     foundUser.email = "";
    //     foundUser.password = "";
    //     foundUser.status = false;
    //     await foundUser.save();
    //   }

    //   let clearedUser = {};
    //   let query = { fullname, mobile, dateOfBirth, password, status };

    //   if (password === "") query = { fullname, mobile, dateOfBirth, status };

    //   const updatedUser = await User.findOneAndUpdate({ address }, query, {
    //     new: true,
    //   });

    //   clearedUser.email = updatedUser.isEmailVerified
    //     ? updatedUser.email
    //     : updatedUser.tempEmail;
    //   clearedUser.dateOfBirth = updatedUser.dateOfBirth;
    //   clearedUser.mobile = updatedUser.mobile;
    //   clearedUser.fullname = updatedUser.fullname;

    //   res.status(200).send(clearedUser);
  } catch (e) {
    console.log(e);
    return res.status(404).send("Something went wrong");
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
