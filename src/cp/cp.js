import { spawn } from "child_process";
import { dirname, join } from "path";

const spawnChildProcess = async (args) => {
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = dirname(__filename);
    const pathToScript = join(__dirname, "files", "script.js");

    return new Promise((resolve, reject) => {
        const childProcess = spawn("node", [pathToScript, ...args], {
            stdio: [ "pipe", "pipe", "inherit"]
        })
        process.stdin.pipe(childProcess.stdin);
        childProcess.stdout.pipe(process.stdout);

        childProcess.on("close", code => code === 0 ? resolve() : reject());
        childProcess.on("error", reject);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["arg1", "arg2"]);
