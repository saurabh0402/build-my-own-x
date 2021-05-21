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

/***/ "../reflex/index.js":
/*!**************************!*\
  !*** ../reflex/index.js ***!
  \**************************/
/***/ ((module) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar nextUnitOfWork = null;\nvar wipRoot = null;\nvar currentRoot = null;\nvar deletions = [];\n\nfunction isEvent(prop) {\n  return prop.startsWith('on');\n}\n\nfunction isProperty(prop) {\n  return prop !== 'children' && !isEvent(prop);\n} // To make texts consistent with everything else, every text is converted to to an object as well\n\n\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n} // A very small function that just converts the JSX to object\n\n\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === 'object' ? child : createTextElement(child);\n      })\n    })\n  };\n} // Takes an object created from createElement and convert it to DOM element\n\n\nfunction createDom(fiber) {\n  var fiberDom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);\n  Object.keys(fiber.props).forEach(function (propKey) {\n    if (isEvent(propKey)) {\n      var e = propKey.toLowerCase().slice(2);\n      fiberDom.addEventListener(e, fiber.props[propKey]);\n    } else if (isProperty(propKey)) {\n      fiberDom[propKey] = fiber.props[propKey];\n    }\n  });\n  return fiberDom;\n} // The render function, this starts the renedering by setting nextUnitOfWork\n\n\nfunction render(elem, container) {\n  wipRoot = nextUnitOfWork = {\n    dom: container,\n    props: {\n      children: [elem]\n    },\n    alternate: currentRoot\n  };\n  deletions = [];\n  nextUnitOfWork = wipRoot;\n}\n\nfunction updateDom(dom, newProps, oldProps) {\n  function isDeleted(prop) {\n    return !(prop in newProps);\n  }\n\n  Object.keys(oldProps).filter(isEvent).filter(function (prop) {\n    return isDeleted || oldProps[prop] !== newProps[prop];\n  }).forEach(function (prop) {\n    var e = prop.toLowerCase().slice(2);\n    dom.removeEventListener(e, oldProps[prop]);\n  });\n  Object.keys(oldProps).filter(isProperty).filter(isDeleted).forEach(function (prop) {\n    return dom[prop] = '';\n  });\n  Object.keys(newProps).filter(isProperty).forEach(function (prop) {\n    return dom[prop] = newProps[prop];\n  });\n  Object.keys(newProps).filter(isEvent).forEach(function (prop) {\n    var e = prop.toLowerCase().slice(2);\n    console.log(e, newProps[prop]);\n    dom.addEventListener(e, newProps[prop]);\n  });\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork);\n  commitWork(wipRoot.child);\n  currentRoot = wipRoot;\n  wipRoot = null;\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n\n  var domParent = fiber.parent.dom;\n\n  if (fiber.effectTag === 'PLACEMENT') {\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag === 'DELETION') {\n    domParent.removeChild(fiber.dom);\n  } else if (fiber.effectTag === 'UPDATE') {\n    updateDom(fiber.dom, fiber.props, fiber.alternate.props);\n  }\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n} // An infinite loop is created here which is called br browser whenever it is free\n// If there's some rendering that needs to be done, this will trigger it.\n\n\nfunction workLoop(deadline) {\n  var shouldYield = false;\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitWork(nextUnitOfWork);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  }\n\n  requestIdleCallback(workLoop);\n} // The heart and core of rendering. This takes something called a fiber which is just\n// the object created bt createElement plus a couple of other things like child, sibling, etc\n\n\nfunction performUnitWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  var children = fiber.props.children;\n  reconcileChildren(fiber, children);\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  var next = fiber;\n\n  while (next) {\n    if (next.sibling) {\n      return next.sibling;\n    }\n\n    next = next.parent;\n  }\n\n  return next;\n}\n\nfunction reconcileChildren(wipFiber, children) {\n  var _wipFiber$alternate;\n\n  var i = 0;\n  var oldFiber = (_wipFiber$alternate = wipFiber.alternate) === null || _wipFiber$alternate === void 0 ? void 0 : _wipFiber$alternate.child;\n  var prevSibling = null;\n\n  while (i < children.length || oldFiber != null) {\n    var child = children[i]; // At this time, child is what we want to render, oldFiber is what we rendered last time\n\n    var newFiber = null;\n    var sameType = child && oldFiber && child.type === oldFiber.type;\n\n    if (sameType) {\n      newFiber = {\n        type: child.type,\n        props: child.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: 'UPDATE'\n      };\n    }\n\n    if (!sameType && child) {\n      newFiber = {\n        type: child.type,\n        props: child.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: 'PLACEMENT'\n      };\n    }\n\n    if (!sameType && oldFiber) {\n      oldFiber.effectTag = 'DELETION';\n      deletions.push(oldFiber);\n    }\n\n    if (i === 0) {\n      wipFiber.child = newFiber;\n    } else {\n      prevSibling.sibling = newFiber;\n    }\n\n    prevSibling = newFiber;\n    ++i;\n  }\n}\n\nrequestIdleCallback(workLoop);\nmodule.exports = {\n  createElement: createElement,\n  render: render\n};\n\n//# sourceURL=webpack://reflex-example/../reflex/index.js?");

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