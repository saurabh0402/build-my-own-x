const path = require('path');

const CONFIG_FILE = 'bundly.config.json';
const DEFAULT_CONFIG = {
  entry: 'index.js',
  output: {
    path: '.',
    filename: 'bundle.js',
    autoCreateFolder: false,
  },
};

module.exports = {
  CONFIG_FILE,
  DEFAULT_CONFIG,
};
