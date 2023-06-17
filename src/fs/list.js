import { readdir } from "fs/promises";
import { dirname, join } from "path";

const list = async () => {
  const __filename = new URL(import.meta.url).pathname;
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
