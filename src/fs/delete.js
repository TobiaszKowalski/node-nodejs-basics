import fs from "fs";
import path from "path";

const remove = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);
  const fileToRemovePath = path.join(__dirname, "files", "fileToRemove.txt");
  const fsFailedErrorMessage = "FS operation failed";

  try {
    await fs.promises.access(fileToRemovePath, fs.constants.F_OK);
    await fs.promises.unlink(fileToRemovePath);
  } catch (error) {
    throw new Error(fsFailedErrorMessage);
  }
};

await remove();
