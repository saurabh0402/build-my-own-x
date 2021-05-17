const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { transformFromAstSync } = require('@babel/core');

const { generateId } = require('./helper');

function getNode(file) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const ast = parser.parse(fileContent, {
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
    dependencies,
    code,
    file,
    dependencyIdmapper: {},
  };
}

function generateGraph(entry) {
  const absEntry = path.resolve(entry);
  const rootNode = getNode(absEntry);

  // This is used to handle circular dependencies
  const absPathToIdMapper = {
    [absEntry]: rootNode.id,
  };

  const nodes = [rootNode];
  const entryFolder = path.dirname(absEntry);
  for (let node of nodes) {
    node.dependencies.forEach((dependency) => {
      const childAbsPath = path.join(entryFolder, dependency);

      if (!absPathToIdMapper[childAbsPath]) {
        const childNode = getNode(childAbsPath);
        absPathToIdMapper[childAbsPath] = childNode.id;
        node.dependencyIdmapper[dependency] = childNode.id;
        nodes.push(childNode);
      } else {
        node.dependencyIdmapper[dependency] = absPathToIdMapper[childAbsPath];
      }
    });
  }

  return {
    graph: nodes,
    entry: rootNode.id,
  };
}

module.exports = generateGraph;
