import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

import config from "../../config/index.js";
import { Admin } from "../../models/Admin.js";
import { Paths } from "../../models/Paths.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(404).send({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const accessToken = jwt.sign({ userId: admin._id }, config.jwtSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId: admin._id }, config.jwtSecret, {
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
      token: accessToken,
      userId: req.userId,
    });
  } catch (errors) {
    return res.status(500).send({ error: "Error logging in" });
  }
};

export const adminLogout = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (admin) {
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
  } catch (error) {
    return res.status(500).send({ error: "Error in logged out" });
  }
};

export const adminGetNFTUrl = async (req, res) => {
  const { url, owner, tokenId } = req.body;
  
  try {
    const { data } = await axios.get(url);
    const exists = await Paths.findOne({ type: "nfts" });
    
    if (exists) {
      let paths = exists.paths;
      
      if (paths.some(path => path.ownerId === owner && path.nftId === tokenId)) {
        console.log('This path already exists');
      } else {
        paths.push({ 
          ownerId: owner,
          nftId: tokenId
        });

        const filter = { type: 'nfts' };
        const update = { paths: paths };

        await Paths.findOneAndUpdate(
          filter, 
          update, 
          {
            new: true, 
          }
        );
      }
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: "Error while get uls" });
  }
};

export const getPaths = async (req, res) => {
  const { type } = req.body;
  const paths = await Paths.findOne({ type });

  try {
    return res.status(200).send(paths);
  } catch (e) {
    return res.status(500).send({ error: "Error while get paths" });
  }
};