const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const credentials = require("./middleware/credentials");

require("dotenv").config();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();
app.use(express.json({ extended: true }));
app.use(credentials);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/images/:img", (req, res) => {
  const { folder } = req.body;
  try {
    let imgPath = path.join(__dirname, `./uploads/${folder}/${req.params.img}`);

    if (fs.existsSync(imgPath)) {
      res.status(200).sendFile(imgPath);
    } else {
      res.status(400).send(null);
    }
  } catch (err) {
    res.status(400).send(null);
  }
});

app.post("/profile", upload.single("img"), async (req, res) => {
  const { address } = req.body;

  if (!address && req.auth?.address) {
    address = req.auth.address;
  }

  if (req.file) {
    var filePath = req.file.path;

    fs.rename(
      __dirname.split("/src")[0] + "/" + filePath,
      __dirname.split("/src")[0] + "/uploads/profile/" + address + ".png",
      function (err) {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          res.status(200).json("updated");
        }
      }
    );
  } else {
    fs.unlink(
      __dirname.split("/src")[0] + "/uploads/profile/" + address + ".png",
      (err) => {}
    );
    res.status(200).json("image deleted");
  }
});

app.get("/api/test", (req, res) => {
  res.send("test");
});
//static path
const root = require("path").join(__dirname, "front", "build");
app.use(express.static(root));

async function start() {
  const PORT = process.env.PORT || 5000;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log(`Server Error ${e.message}`);
    process.exit(1);
  }
}

start();
