const fs = require('fs');
const path = require('path');
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

function generateGraph(entry) {
  const absEntryPath = path.resolve(entry);
  const mainAssets = findDependency(absEntryPath);

  const graph = [mainAssets];

  const entryDirName = path.dirname(absEntryPath);
  for (const asset of graph) {
    // This object is what forms our graph. We store a mapping of dependency to it's ID
    asset.mapping = {};

    asset.dependencies.forEach((childPath) => {
      const absPath = path.join(entryDirName, childPath);
      const childDependencies = findDependency(absPath);
      graph.push(childDependencies);

      asset.mapping[childPath] = childDependencies.id;
    });
  }

  return {
    graph,
    entry: mainAssets.id,
  };
}

function bundle(graph, entry) {
  let modules = graph.reduce((o, cur) => {
    o += `
    ${cur.id}: [
      function(require, module, exports) {
        ${cur.code}
      },
      ${JSON.stringify(cur.mapping)}
    ],
    `;

    return o;
  }, '');

  modules = `{
    ${modules}
  }`;

  const result = `
    (function(modules){
      function globalRequire(id) {
        const [f, mapping] = modules[id];

        function localRequire(name) {
          return globalRequire(mapping[name]);
        }

        const module = { exports: {} };
        f(localRequire, module, module.exports);

        return module.exports;
      }

      globalRequire("${entry}");
    })(${modules})
  `;

  return result;
}

(() => {
  if (require.main !== 'module') {
    const { graph, entry } = generateGraph('./example/index.js');
    const bundleString = bundle(graph, entry);
    fs.writeFileSync('bundle.js', bundleString);
  }
})();
