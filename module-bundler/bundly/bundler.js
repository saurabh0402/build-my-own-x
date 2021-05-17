/*
  The main function of bundler is to override the require functions in each file
  with one that we will be passing, the one which does not load files but
  gives the code from an object.
*/

function bundle(graph, entry) {
  const objectContent = graph.reduce((content, node) => {
    content += `
      ${node.id}: [
        function(require, module, exports) {
          ${node.code}
        },
        ${JSON.stringify(node.dependencyIdmapper, null, 2)}
      ],
    `;

    return content;
  }, '');

  const moduleObject = `{
    ${objectContent}
  }`;

  const bundle = `
    (function(modules) {
      function globalRequire(nodeId) {
        const [f, dependencyIdmapper] = modules[nodeId];

        function localRequire(path) {
          return globalRequire(dependencyIdmapper[path]);
        }

        const module = { exports: {} };
        f(localRequire, module, module.exports);

        return module.exports;
      }

      globalRequire("${entry}");
    })(${moduleObject});
  `;

  return bundle;
}

module.exports = bundle;
