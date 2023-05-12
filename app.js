import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import * as dotenv from "dotenv";
dotenv.config();

import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./services/isAuthenticated.js";
import adminRouter from "./modules/admin/admin.routes.js";

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(isAuthenticated);
app.get("/test", (req, res) => {
  res.send("test");
});

app.post("/api/admin/content/Users", (req, res)=>{
  res.send({})
})

app.use("/admin", adminRouter);

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
