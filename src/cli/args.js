const parseArgs = () => {
  const cliArgs = process.argv.slice(2);
  for (let i = 0; i < cliArgs.length; i += 2) {
    const propName = cliArgs[i].replace(/^--/, "");
    const value = cliArgs[i + 1];
    console.log(`${propName} is ${value}`);
  }
};

parseArgs();
