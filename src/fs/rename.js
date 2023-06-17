import fs from "fs";
import path from "path";

const rename = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);
  const wrongFilenamePath = path.join(__dirname, "files", "wrongFilename.txt");
  const properFilenamePath = path.join(__dirname, "files", "properFilename.md");
  const fsFailedErrorMessage = "FS operation failed";

  try {
    await fs.promises.access(wrongFilenamePath, fs.constants.F_OK);
    try {
      await fs.promises.access(properFilenamePath, fs.constants.F_OK);
      throw new Error(fsFailedErrorMessage);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.rename(wrongFilenamePath, properFilenamePath);
      } else {
        console.error(error);
      }
    }
  } catch (error) {
    throw new Error(fsFailedErrorMessage);
  }
};

await rename();
