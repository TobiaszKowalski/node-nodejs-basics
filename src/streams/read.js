import { createReadStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
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