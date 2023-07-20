import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where the images will be saved
    let imgFolder = req.body.imgFolder;

    cb(null, `uploads/${imgFolder}`);
  },
  filename: function (req, file, cb) {
    // Use the original file name as the saved file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const imageUpload = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).send('Error uploading file.');
    }
   
    console.log(req.image);
    res.send('File uploaded successfully.');
  });
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);

  // return new Promise((resolve, reject) => {
  //   if (file) {
  //     const newFilePath = path.join(
  //       __dirname,
  //       "..",
  //       "uploads",
  //       folderPath,
  //       address + ".png",
  //     );
      
  //     fs.writeFile(newFilePath, file.buffer, (err) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(newFilePath.replace(/.*(\/uploads.*)/, "$1"));
  //       }
  //     });
  //   } else {
  //     const deleteFilePath = path.join(
  //       __dirname,
  //       "..",
  //       "uploads",
  //       folderPath,
  //       address + ".png",
  //     );

  //     fs.unlink(deleteFilePath, (err) => {
  //       if (err) {
  //         resolve("there was no img");
  //       } else {
  //         resolve("image deleted");
  //       }
  //     });
  //   }
  // });
};
