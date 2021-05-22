const { isEvent, isProperty, getEventName } = require('./helpers');

// For consistency and easier handling we create virtual DOM objects for text as well
// This function takes some text and create this object
function createTextElement(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// The function used to create virtual DOM objects from the JSX representation of the same
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}

// Takes a fiber and creates the final DOM object that will then be added to the browser
function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((prop) => (dom[prop] = fiber.props[prop]));

  Object.keys(fiber.props)
    .filter(isEvent)
    .forEach((prop) => {
      const e = getEventName(prop);
      dom.addEventListener(e, fiber.props[prop]);
    });

  return dom;
}

module.exports = {
  createElement,
  createDom,
};
