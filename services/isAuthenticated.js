import jwt from "jsonwebtoken";
import config from "../config/index.js";

export function isAuthenticated(req, res, next) {
  const accessToken = req.cookies["Access-Token"];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, config.jwtSecret);
      req.userId = decoded.userId;
    } catch (e) {
      refresh(req, res);
    }
  }
  next();
}

function refresh(req, res) {
  const refreshToken = req.cookies["Refresh-Token"];
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwtSecret);
      const accessToken = jwt.sign({ userId: decoded.userId }, config.jwtSecret, {
        expiresIn: "15m",
      });
      req.userId = decoded.userId;
      res.cookie("Access-Token", accessToken, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
    } catch (e) {}
  }
}
