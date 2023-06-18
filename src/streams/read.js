import { createReadStream } from "fs";
import { dirname, join } from "path";

const read = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToRead.txt");

  const stream = createReadStream(filePath, "utf-8");

  stream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  await new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });
};

await read();