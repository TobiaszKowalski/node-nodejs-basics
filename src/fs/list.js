import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filesPath = join(__dirname, "files");
  const fsFailedErrorMessage = "FS operation failed";

  try {
    await readdir(filesPath).then(files => console.log(files));
  } catch (error) {
    throw new Error(fsFailedErrorMessage);
  }
};

await list();
