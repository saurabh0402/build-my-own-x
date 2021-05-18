/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var reflex = __webpack_require__(/*! ../../reflex */ \"../reflex/index.js\");\n/** @jsx reflex.createElement */\n\n\nvar elem = reflex.createElement(\"div\", null, reflex.createElement(\"h1\", {\n  className: \"hello\"\n}, \" Hello World! \"), reflex.createElement(\"h2\", null, \" I am here, where are you? \"));\nvar container = document.getElementById('root');\nreflex.render(elem, container);\n\n//# sourceURL=webpack://reflex-example/./src/index.jsx?");

/***/ }),

/***/ "../reflex/index.js":
/*!**************************!*\
  !*** ../reflex/index.js ***!
  \**************************/
/***/ ((module) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar nextUnitOfWork = null;\n\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\n\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === 'object' ? child : createTextElement(child);\n      })\n    })\n  };\n}\n\nfunction createDom(fiber) {\n  var fiberDom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);\n  Object.keys(fiber.props).forEach(function (propKey) {\n    if (propKey !== 'children') {\n      fiberDom[propKey] = fiber.props[propKey];\n    }\n  });\n  return fiberDom;\n}\n\nfunction render(elem, container) {\n  nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [elem]\n    }\n  };\n}\n\nfunction workLoop(deadline) {\n  var shouldYield = false;\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitWork(nextUnitOfWork);\n  }\n\n  requestIdleCallback(workLoop);\n}\n\nfunction performUnitWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  if (fiber.parent) {\n    fiber.parent.dom.appendChild(fiber.dom);\n  }\n\n  var children = fiber.props.children;\n  var i = 0;\n  var prevSibling = null;\n\n  while (i < children.length) {\n    var child = children[i];\n\n    var newFiber = _objectSpread(_objectSpread({}, child), {}, {\n      parent: fiber,\n      dom: null\n    });\n\n    if (i === 0) {\n      fiber.child = newFiber;\n    } else {\n      prevSibling.sibling = newFiber;\n    }\n\n    prevSibling = newFiber;\n    ++i;\n  }\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  var next = fiber;\n\n  while (next) {\n    if (next.sibling) {\n      return next.sibling;\n    }\n\n    next = next.parent;\n  }\n\n  return next;\n}\n\nrequestIdleCallback(workLoop);\nmodule.exports = {\n  createElement: createElement,\n  render: render\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.jsx");
/******/ 	
/******/ })()
;