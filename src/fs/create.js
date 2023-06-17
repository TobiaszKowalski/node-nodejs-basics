import fs from 'fs';
import path from 'path';

const create = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fresh.txt');
  const fileContent = "I am fresh and young";
  const fsFailedErrorMessage = "FS operation failed";

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    throw new Error(fsFailedErrorMessage);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(filePath, fileContent);
    } else {
      console.error(error);
    }
  }
};

await create();