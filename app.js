import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

import corsOptions from "./config/corsOptions";

import cookieParser from "cookie-parser";

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
  res.send("test");
});
// app.use(isAuthenticated);

// app.use("/user", userRoutes);

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
