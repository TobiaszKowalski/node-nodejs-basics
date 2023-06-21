import { createReadStream, createWriteStream } from "fs";
import { dirname, join } from "path";
import { createGzip } from "zlib";
import { fileURLToPath } from 'url';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToCompress.txt");
  const zipFilePath = join(__dirname, "files", "archive.gz");
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(zipFilePath);
  const gzip = createGzip();

  await new Promise((resolve, reject) => {
    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};

await compress();
