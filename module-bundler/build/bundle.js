
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

      globalRequire("apoZuwklIiNubwWNJnYd");
    })({
    
      apoZuwklIiNubwWNJnYd: [
        function(require, module, exports) {
          "use strict";

var _hello = _interopRequireDefault(require("./hello.js"));

var _messages = _interopRequireDefault(require("./messages.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
  console.log(_messages["default"][1]);
  (0, _hello["default"])();
})();
        },
        {
  "./hello.js": "VwYADiBGfGrQGnrRtkxB",
  "./messages.js": "MQsmoPEMJIvxgVNIpWxH"
}
      ],
    
      VwYADiBGfGrQGnrRtkxB: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _messages = _interopRequireDefault(require("./messages.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  console.log(_messages["default"][0]);
}
        },
        {
  "./messages.js": "MQsmoPEMJIvxgVNIpWxH"
}
      ],
    
      MQsmoPEMJIvxgVNIpWxH: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var msgs = ['Hello World.', 'Hi There.', 'Wooohoooo.'];
var _default = msgs;
exports["default"] = _default;
        },
        {}
      ],
    
  });
  