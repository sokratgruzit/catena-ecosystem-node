import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import multer from "multer";

import * as dotenv from "dotenv";
dotenv.config();

import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./services/isAuthenticated.js";
import faqRouter from "./modules/faq/faq.routes.js";
import eventRouter from "./modules/event/event.routes.js";
import permissionControler from "./modules/permissions/permissions.routes.js";
import rolesControler from "./modules/roles/roles.routes.js";
import announcementRouter from "./modules/announcement/announcement.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import personsRouter from "./modules/persons/persons.routes.js";
import langsRouter from "./modules/languages/langs.routes.js";
import pressRouter from "./modules/press/press.routes.js";
import proposalsRouter from "./modules/proposals/proposals.routes.js";
import choicesRouter from "./modules/choices/choices.routes.js";
import voteRouter from "./modules/vote/vote.routes.js";
import translateRouter from "./modules/translate/translate.routes.js";
import homePageSliderRouter from "./modules/homePageSlider/homePageSlider.routes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(isAuthenticated);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let imgFolder = req.body.imgFolder;
    
    cb(null, `uploads/${imgFolder}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  return res.status(200).send({ status: true });
});

app.post('/upload-many', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'logo_image', maxCount: 1 },
]), (req, res) => {
  return res.status(200).send({ status: true });
});

app.get("/uploads/:folder/:img", (req, res) => {
  try {
    let imgPath = path.join(
      __dirname,
      `./uploads/${req.params.folder}/${req.params.img}`,
    );

    if (fs.existsSync(imgPath)) {
      res.status(200).sendFile(imgPath);
    } else {
      res.status(400).send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(null);
  }
});

app.use("/admin", adminRouter);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRouter);
app.use("/persons", personsRouter);
app.use("/langs", langsRouter);
app.use("/press", pressRouter);
app.use("/faq", faqRouter);
app.use("/proposals", proposalsRouter);
app.use("/choices", choicesRouter);
app.use("/event", eventRouter);
app.use("/announcement", announcementRouter);
app.use("/vote", voteRouter);
app.use("/translate", translateRouter);
app.use("/home-page-slider", homePageSliderRouter);
app.use("/permissions", permissionControler);
app.use("/roles", rolesControler);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
