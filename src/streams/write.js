import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToWrite.txt");

  const writeStream = createWriteStream(filePath, "utf-8");
  process.stdin.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

await write();
