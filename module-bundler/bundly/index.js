const fs = require('fs');
const path = require('path');

const generateGraph = require('./generate-graph');
const bundle = require('./bundler');

const { CONFIG_FILE, DEFAULT_CONFIG } = require('./constants');
const { mergeConfig, createOutputFolder } = require('./helper');

(() => {
  let config = DEFAULT_CONFIG;

  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const userConfig = JSON.parse(fs.readFileSync(CONFIG_FILE));
      config = mergeConfig(config, userConfig);
    }
  } catch (err) {
    console.err('Invalid Config File!');
    process.exit(1);
  }

  try {
    if (!fs.existsSync(config.output.path)) {
      createOutputFolder(config.output.path);
    }
  } catch (err) {
    console.log(
      'Unable to create the output folder. Please give required permission or create it yourself to continue.'
    );
    process.exit(1);
  }

  const { graph, entry } = generateGraph(config.entry);
  const bundleText = bundle(graph, entry);

  const outputPath = path.join(config.output.path, config.output.filename);
  fs.writeFileSync(outputPath, bundleText);
})();
