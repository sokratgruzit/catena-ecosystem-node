import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const uploadImageMany = (address, files, folderPath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return new Promise((resolve, reject) => {
    if (files) {
      const promises = files.map((file, index) => {
        const newFilePath = path.join(
          __dirname,
          "..",
          "uploads",
          folderPath,
          `${address}-${index}.png`,
        );

        return new Promise((resolve, reject) => {
          fs.writeFile(newFilePath, file.buffer, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newFilePath.replace(/.*(\/uploads.*)/, "$1"));
            }
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    } else {
      const deleteFilePaths = files.map((_, index) => {
        const deleteFilePath = path.join(
          __dirname,
          "..",
          "uploads",
          folderPath,
          `${address}-${index}.png`,
        );

        return new Promise((resolve, reject) => {
          fs.unlink(deleteFilePath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(`image ${index} deleted`);
            }
          });
        });
      });

      Promise.all(deleteFilePaths)
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    }
  });
};
