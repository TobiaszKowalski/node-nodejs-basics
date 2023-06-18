import { createWriteStream } from "fs";
import { dirname, join } from "path";

const write = async () => {
  const __filename = new URL(import.meta.url).pathname;
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
