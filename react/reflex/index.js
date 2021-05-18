let nextUnitOfWork = null;

// To make texts consistent with everything else, every text is converted to to an object as well
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// A very small function that just converts the JSX to object
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

// Takes an object created from createElement and convert it to DOM element
function createDom(fiber) {
  const fiberDom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props).forEach((propKey) => {
    if (propKey !== 'children') {
      fiberDom[propKey] = fiber.props[propKey];
    }
  });

  return fiberDom;
}

// The render function, this starts the renedering by setting nextUnitOfWork
function render(elem, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [elem],
    },
  };
}

// An infinite loop is created here which is called br browser whenever it is free
// If there's some rendering that needs to be done, this will trigger it.
function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork);
  }

  requestIdleCallback(workLoop);
}

// The heart and core of rendering. This takes something called a fiber which is just
// the object created bt createElement plus a couple of other things like child, sibling, etc
function performUnitWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  let children = fiber.props.children;
  let i = 0;
  let prevSibling = null;

  while (i < children.length) {
    const child = children[i];

    const newFiber = {
      ...child,
      parent: fiber,
      dom: null,
    };

    if (i === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    ++i;
  }

  if (fiber.child) {
    return fiber.child;
  }

  let next = fiber;
  while (next) {
    if (next.sibling) {
      return next.sibling;
    }

    next = next.parent;
  }

  return next;
}

requestIdleCallback(workLoop);

module.exports = {
  createElement,
  render,
};
