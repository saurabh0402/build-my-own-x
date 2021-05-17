const fs = require('fs');
const path = require('path');

function mergeConfig(oldConfig, newConfig) {
  return {
    ...oldConfig,
    ...newConfig,
    output: {
      ...(oldConfig.output || {}),
      ...(newConfig.output || {}),
    },
  };
}

function createOutputFolder(path) {
  const nestedFolders = path.split('/');

  let curPath = '.';
  nestedFolders.forEach((folder) => {
    curPath = `${curPath}/${folder}`;

    if (!fs.existsSync(curPath)) {
      fs.mkdirSync(curPath);
    }
  });
}

function generateId(len = 20) {
  const ALLOWED_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let id = '';
  for (let i = 0; i < len; ++i) {
    id += ALLOWED_CHARS[Math.floor(Math.random() * ALLOWED_CHARS.length)];
  }

  return id;
}

module.exports = {
  mergeConfig,
  createOutputFolder,
  generateId,
};
