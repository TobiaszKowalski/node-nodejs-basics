import { readFile } from "fs/promises";
import { dirname, join } from "path";

const read = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = dirname(__filename);
  const fileToReadPath = join(__dirname, "files", "fileToRead.txt");
  const fsFailedErrorMessage = "FS operation failed";

  try {
    await readFile(fileToReadPath, "utf-8").then((fileContent) => console.log(fileContent));
  } catch (error) {
    throw new Error(fsFailedErrorMessage);
  }
};

await read();
