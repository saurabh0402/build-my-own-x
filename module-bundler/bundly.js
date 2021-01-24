const fs = require('fs');
const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { transformFromAstSync } = require('@babel/core');

function generateId() {
  const ID_LEN = 20;
  const ALLOWED_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let id = '';
  for (let i = 0; i < ID_LEN; ++i) {
    id += ALLOWED_CHARS[Math.floor(Math.random() * ALLOWED_CHARS.length)];
  }

  return id;
}

// This function find dependencies of a single file and then tranpiles the code
function findDependency(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env'],
  });

  return {
    id: generateId(),
    filename,
    code,
    dependencies,
  };
}

(() => {
  if (require.main !== 'module') {
    const t = findDependency('./example/index.js');
    console.log(t);
  }
})();
