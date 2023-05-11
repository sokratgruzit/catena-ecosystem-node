import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/User.js";

import config from "../../config/index.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
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
  } catch (error) {
    return res.status(500).send({ error: "Error logging in" });
  }
};

export const logout = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  if (user) {
    res.cookie("Access-Token", "", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.cookie("Refresh-Token", "", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    return res.status(200).send("logged out");
  }
};

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send({
      message: "A user with this email already exists",
    });
  }

  const user = new User({ email, password, username, refreshToken: "" });

  await user.save();

  const accessToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "30d",
  });

  user.refreshToken = refreshToken;

  await user.save();

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
    message: "Successfully registered",
  });
};
