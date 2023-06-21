const parseEnv = () => {
  const parsedRssVariables = Object.entries(process.env)
    .filter(([key]) => key.startsWith("RSS_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log(parsedRssVariables);
};

parseEnv();
