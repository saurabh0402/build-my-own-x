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

eval("var reflex = __webpack_require__(/*! ../../reflex */ \"../reflex/index.js\");\n/** @jsx reflex.createElement */\n\n\nvar elem = reflex.createElement(\"div\", null, reflex.createElement(\"h1\", {\n  className: \"hello\",\n  onClick: function onClick() {\n    return console.log('Hello');\n  }\n}, ' ', \"Hello World!\", ' '), reflex.createElement(\"h2\", null, \" I am here, where are you? \"));\nvar container = document.getElementById('root');\nreflex.render(elem, container);\n\n//# sourceURL=webpack://reflex-example/./src/index.jsx?");

/***/ }),

/***/ "../reflex/commit-phase.js":
/*!*********************************!*\
  !*** ../reflex/commit-phase.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! ./helpers */ \"../reflex/helpers.js\"),\n    isEvent = _require.isEvent,\n    isDeleted = _require.isDeleted,\n    getEventName = _require.getEventName,\n    isProperty = _require.isProperty;\n\nfunction commitRoot() {\n  __webpack_require__.g.deletions.forEach(commitWork);\n  commitWork(__webpack_require__.g.wipRoot.child);\n  __webpack_require__.g.deletions = [];\n  __webpack_require__.g.currentRoot = __webpack_require__.g.wipRoot;\n  __webpack_require__.g.wipRoot = null;\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n\n  var domParent = fiber.parent.dom;\n\n  if (fiber.effectTag === 'PLACEMENT') {\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag === 'DELETION') {\n    domParent.removeChild(fiber.dom);\n  } else if (fiber.effectTag === 'UPDATE') {\n    updateDom(fiber);\n  }\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\nfunction updateDom(fiber) {\n  var dom = fiber.dom;\n  var oldProps = fiber.alternate.props;\n  var newProps = fiber.props;\n  Object.keys(oldProps).filter(isEvent).filter(function (prop) {\n    return isDeleted(prop, newProps) || oldProps[prop] !== newProps[prop];\n  }).forEach(function (prop) {\n    var e = getEventName(prop);\n    dom.removeEventListener(e, oldProps[prop]);\n  });\n  Object.keys(oldProps).filter(function (prop) {\n    return isProperty && isDeleted(prop, newProps);\n  }).forEach(function (prop) {\n    dom[prop] = '';\n  });\n  Object.keys(newProps).filter(isProperty).forEach(function (prop) {\n    return dom[prop] = newProps[prop];\n  });\n  Object.keys(newProps).filter(isEvent).forEach(function (prop) {\n    var e = getEventName(prop);\n    dom.addEventListener(e, newProps[prop]);\n  });\n}\n\nmodule.exports = {\n  commitRoot: commitRoot\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/commit-phase.js?");

/***/ }),

/***/ "../reflex/creator.js":
/*!****************************!*\
  !*** ../reflex/creator.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar _require = __webpack_require__(/*! ./helpers */ \"../reflex/helpers.js\"),\n    isEvent = _require.isEvent,\n    isProperty = _require.isProperty,\n    getEventName = _require.getEventName; // For consistency and easier handling we create virtual DOM objects for text as well\n// This function takes some text and create this object\n\n\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n} // The function used to create virtual DOM objects from the JSX representation of the same\n\n\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === 'object' ? child : createTextElement(child);\n      })\n    })\n  };\n} // Takes a fiber and creates the final DOM object that will then be added to the browser\n\n\nfunction createDom(fiber) {\n  var dom = fiber.type === 'TEXT' ? document.createTextNode('') : document.createElement(fiber.type);\n  Object.keys(fiber.props).filter(isProperty).forEach(function (prop) {\n    return dom[prop] = fiber.props[prop];\n  });\n  Object.keys(fiber.props).filter(isEvent).forEach(function (prop) {\n    var e = getEventName(prop);\n    dom.addEventListener(e, fiber.props[prop]);\n  });\n  return dom;\n}\n\nmodule.exports = {\n  createElement: createElement,\n  createDom: createDom\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/creator.js?");

/***/ }),

/***/ "../reflex/helpers.js":
/*!****************************!*\
  !*** ../reflex/helpers.js ***!
  \****************************/
/***/ ((module) => {

eval("function isEvent(prop) {\n  return prop.startsWith('on');\n}\n\nfunction isProperty(prop) {\n  return prop !== 'children' && !isEvent(prop);\n}\n\nfunction getEventName(prop) {\n  return prop.toLowerCase().slice(2);\n}\n\nfunction isDeleted(prop, props) {\n  return !(prop in props);\n}\n\nmodule.exports = {\n  isEvent: isEvent,\n  isProperty: isProperty,\n  getEventName: getEventName,\n  isDeleted: isDeleted\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/helpers.js?");

/***/ }),

/***/ "../reflex/index.js":
/*!**************************!*\
  !*** ../reflex/index.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! ./creator */ \"../reflex/creator.js\"),\n    createElement = _require.createElement,\n    createDom = _require.createDom;\n\nvar _require2 = __webpack_require__(/*! ./helpers */ \"../reflex/helpers.js\"),\n    isEvent = _require2.isEvent,\n    isProperty = _require2.isProperty;\n\nvar _require3 = __webpack_require__(/*! ./render-phase */ \"../reflex/render-phase.js\"),\n    render = _require3.render,\n    performUnitWork = _require3.performUnitWork;\n\nvar _require4 = __webpack_require__(/*! ./commit-phase */ \"../reflex/commit-phase.js\"),\n    commitRoot = _require4.commitRoot; // The next fiber to be processed\n\n\n__webpack_require__.g.nextUnitOfWork = null; // Reference to the fiber tree that will be commited\n\n__webpack_require__.g.wipRoot = null; // This stores what the current rendered tree is\n// i.e., fiber tree that was rendered in last render\n\n__webpack_require__.g.currentRoot = null; // Elems that needs to be deleted\n\n__webpack_require__.g.deletions = []; // An infinite loop is created here which is called br browser whenever it is free\n// If there's some rendering that needs to be done, this will trigger it.\n\nfunction workLoop(deadline) {\n  var shouldYield = false;\n\n  while (!shouldYield && __webpack_require__.g.nextUnitOfWork) {\n    __webpack_require__.g.nextUnitOfWork = performUnitWork(__webpack_require__.g.nextUnitOfWork);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n\n  if (!__webpack_require__.g.nextUnitOfWork && __webpack_require__.g.wipRoot) {\n    commitRoot();\n  }\n\n  requestIdleCallback(workLoop);\n}\n\nrequestIdleCallback(workLoop);\nmodule.exports = {\n  createElement: createElement,\n  render: render\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/index.js?");

/***/ }),

/***/ "../reflex/render-phase.js":
/*!*********************************!*\
  !*** ../reflex/render-phase.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n  In rendering phase, our main task is to create the Fiber tree which will then be\n  commited to DOM in the commit phase.\n\n  Our actual renderer is the workLoop function. We have scheduled its running using\n  requestIdleCallback function and it will keep running. workLoop checks if there's\n  something in nextUnitOfWork, and performs it if required.\n\n  The job of render is to set nextUnitOfWork such that when workLoop next runs it\n  will perform the job.\n\n  The core of rendering is though done inside performUnitWork function which actually\n  creates the fiber tree for us. The fiber tree contains everything that we will need\n  while commiting the tree to DOM.\n*/\nvar _require = __webpack_require__(/*! ./creator */ \"../reflex/creator.js\"),\n    createDom = _require.createDom;\n\nfunction render(elem, root) {\n  __webpack_require__.g.wipRoot = {\n    dom: root,\n    props: {\n      children: [elem]\n    },\n    alternate: __webpack_require__.g.currentRoot\n  };\n  __webpack_require__.g.nextUnitOfWork = __webpack_require__.g.wipRoot;\n}\n\nfunction performUnitWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  reconcileChildren(fiber);\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  var next = fiber;\n\n  while (next) {\n    if (next.sibling) {\n      return next.sibling;\n    }\n\n    next = next.parent;\n  }\n\n  return next;\n}\n/*\n  This function compares the last rendered Fiber tree to the one we are creating now.\n  Depending on that it decides what it wants to do with a node - update, create or delete\n*/\n\n\nfunction reconcileChildren(fiber) {\n  var _fiber$alternate;\n\n  var i = 0;\n  var oldFiber = (_fiber$alternate = fiber.alternate) === null || _fiber$alternate === void 0 ? void 0 : _fiber$alternate.child;\n  var children = fiber.props.children;\n  var prevSibling = null;\n\n  while (i < children.length || oldFiber) {\n    var child = children[i];\n    var newFiber = null;\n    var sameType = child && oldFiber && child.type === oldFiber.type;\n\n    if (sameType) {\n      newFiber = {\n        type: child.type,\n        dom: oldFiber.dom,\n        props: child.props,\n        alternate: oldFiber,\n        parent: fiber,\n        effectTag: 'UPDATE'\n      };\n    }\n\n    if (!sameType && child) {\n      newFiber = {\n        type: child.type,\n        dom: null,\n        props: child.props,\n        alternate: null,\n        parent: fiber,\n        effectTag: 'PLACEMENT'\n      };\n    }\n\n    if (!sameType && oldFiber) {\n      __webpack_require__.g.deletions.push(oldFiber);\n      oldFiber.effectTag = 'DELETION';\n    }\n\n    if (i === 0) {\n      fiber.child = newFiber;\n    } else if (child) {\n      prevSibling.sibling = newFiber;\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n\n    prevSibling = newFiber;\n    ++i;\n  }\n}\n\nmodule.exports = {\n  render: render,\n  performUnitWork: performUnitWork\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/render-phase.js?");

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
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