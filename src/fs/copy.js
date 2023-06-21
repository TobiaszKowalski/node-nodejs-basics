import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourceFolder = path.join(__dirname, "files");
  const targetFolder = path.join(__dirname, "files_copy");
  const fsFailedErrorMessage = "FS operation failed";

  try {
    try {
      await fs.promises.access(sourceFolder, fs.constants.F_OK);
    } catch (error) {
      throw new Error(fsFailedErrorMessage);
    }

    try {
      await fs.promises.access(targetFolder, fs.constants.F_OK);
      throw new Error(fsFailedErrorMessage);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error(error);
      }
    }

    await fs.promises.mkdir(targetFolder);

    const files = await fs.promises.readdir(sourceFolder);
    for (const file of files) {
      const sourceFile = path.join(sourceFolder, file);
      const destinationFile = path.join(targetFolder, file);
      await fs.promises.copyFile(sourceFile, destinationFile);
    }
  } catch (error) {
    console.error(error.message);
  }
};

await copy();
