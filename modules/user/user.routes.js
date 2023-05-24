import { Router } from "express";
import * as userController from "./user.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.route("/verify-email/:token").get(userController.verifyEmail);
router.route("/").post(userController.getUserInfo);
router.route("/profile").post(upload.single("image"), userController.makeProfile);

// router.post(
//   upload.single("image"),
//   userController.validateUser,
//   userController.validateAddress,
//   (req, res, next) => {
//     if (!req.file) {
//       return next();
//     }

//     // Save the file if user and address are valid
//     const file = req.file;
//     fs.writeFile(`/path/to/save/${file.originalname}`, file.buffer, (err) => {
//       if (err) {
//         return next(err);
//       }

//       next();
//     });
//   },
//   userController.makeProfile,
// );

export default router;
