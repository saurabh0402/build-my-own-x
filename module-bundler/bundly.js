const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { transformFromAstSync } = require('@babel/core');

const CONFIG_FILE = 'bundly.config.json';
const DEFAULT_CONFIG = {
  entry: 'index.js',
  output: {
    path: '.',
    filename: 'bundle.js',
    autoCreateFolder: false,
  },
};

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

function createOutputPath(opPath) {
  const splitPath = opPath.split('/');
  let curPath = '';

  splitPath.forEach((p) => {
    curPath += `${p}/`;
    if (!fs.existsSync(curPath)) {
      fs.mkdirSync(curPath);
    }
  });
}

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
  const pathIdMapper = {
    [absEntryPath]: mainAssets.id,
  };

  const entryDirName = path.dirname(absEntryPath);
  for (const asset of graph) {
    // This object is what forms our graph. We store a mapping of dependency to it's ID
    asset.mapping = {};

    asset.dependencies.forEach((childPath) => {
      const absPath = path.join(entryDirName, childPath);
      if (!pathIdMapper[absPath]) {
        const childDependencies = findDependency(absPath);
        graph.push(childDependencies);
        asset.mapping[childPath] = childDependencies.id;
        pathIdMapper[absPath] = childDependencies.id;
      } else {
        asset.mapping[childPath] = pathIdMapper[absPath];
      }
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
    const configExists = fs.existsSync(CONFIG_FILE);
    let config = DEFAULT_CONFIG;

    if (configExists) {
      try {
        const fileConfig = JSON.parse(fs.readFileSync(CONFIG_FILE));
        config = mergeConfig(config, fileConfig);
      } catch (err) {
        console.error('Invalid config file.');
        process.exit(1);
      }
    }

    if (!fs.existsSync(config.output.path)) {
      try {
        createOutputPath(config.output.path);
      } catch (err) {
        console.error('Unable to create bundle destination.');
        process.exit(1);
      }
    }

    const outputPath = path.join(config.output.path, config.output.filename);

    const { graph, entry } = generateGraph(config.entry);
    const bundleString = bundle(graph, entry);
    fs.writeFileSync(outputPath, bundleString);
  }
})();
