import { Transform } from "stream";

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split("").reverse().join("");
      this.push(reversedText);
      callback();
    },
  });

  await new Promise((resolve, reject) => {
    process.stdin.pipe(transformStream).pipe(process.stdout);
    process.stdin.on("end", resolve);
    process.stdin.on("error", reject);
    transformStream.on("error", reject);
  });
};

await transform();
