import { Worker } from "worker_threads";
import { dirname, join } from "path";
import { cpus } from "os";
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToWorker = join(__dirname, "worker.js");
  const cpuCount = cpus().length;
  const results = [];

  await Promise.all(
    Array.from({ length: cpuCount }, async (_, i) => {
      const numberToSend = 10 + i;
      try {
        const worker = new Worker(pathToWorker);
        worker.postMessage(numberToSend);
        const computingResultMessage = await new Promise((resolve) =>
          worker.on("message", resolve)
        );
        results[i] = {
          status: "resolved",
          data: computingResultMessage,
        };
        worker.terminate();
      } catch (error) {
        results[i] = {
          status: "error",
          data: null,
        };
      }
    })
  );
  console.log(results);
};

await performCalculations();