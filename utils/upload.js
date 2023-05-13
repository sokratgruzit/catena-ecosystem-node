import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const imageUpload = (address, files, filePath, folderPath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return new Promise((resolve, reject) => {
    if (files) {
      var tempFilePath = filePath;
      const newFilePath = path.join(
        __dirname,
        "..",
        "uploads",
        folderPath,
        address + ".png",
      );

      fs.rename(tempFilePath, newFilePath, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(newFilePath.replace(/.*(\/uploads.*)/, "$1"));
        }
      });
    } else {
      const deleteFilePath = path.join(
        __dirname,
        "..",
        "uploads",
        folderPath,
        address + ".png",
      );

      fs.unlink(deleteFilePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("image deleted");
        }
      });
    }
  });
};
