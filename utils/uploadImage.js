import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const imageUpload = (address, file, folderPath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return new Promise((resolve, reject) => {
    if (file) {
      const newFilePath = path.join(
        __dirname,
        "..",
        "uploads",
        folderPath,
        address + ".png",
      );
      fs.writeFile(newFilePath, file.buffer, (err) => {
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
          resolve("there was no img");
        } else {
          resolve("image deleted");
        }
      });
    }
  });
};
