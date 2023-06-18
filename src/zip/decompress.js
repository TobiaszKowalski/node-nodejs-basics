import { createReadStream, createWriteStream } from "fs";
import { dirname, join } from "path";
import { createGunzip } from "zlib";

const decompress = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToCompress.txt");
  const zipFilePath = join(__dirname, "files", "archive.gz");
  const readStream = createReadStream(zipFilePath);
  const writeStream = createWriteStream(filePath);
  const gunzip = createGunzip();

  await new Promise((resolve, reject) => {
    readStream
      .pipe(gunzip)
      .pipe(writeStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};

await decompress();