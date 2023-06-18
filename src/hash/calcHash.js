import fs from 'fs';
import { dirname, join } from "path";
import crypto from 'crypto';

const calculateHash = async () => {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");

  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);

  for await (const chunk of stream) {
    hash.update(chunk);
  }

  const hexHash = hash.digest('hex');
  console.log(hexHash);
};

await calculateHash();