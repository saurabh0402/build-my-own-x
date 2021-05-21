let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = [];

function isEvent(prop) {
  return prop.startsWith('on');
}

function isProperty(prop) {
  return prop !== 'children' && !isEvent(prop);
}

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
    if (isEvent(propKey)) {
      const e = propKey.toLowerCase().slice(2);
      fiberDom.addEventListener(e, fiber.props[propKey]);
    } else if (isProperty(propKey)) {
      fiberDom[propKey] = fiber.props[propKey];
    }
  });

  return fiberDom;
}

// The render function, this starts the renedering by setting nextUnitOfWork
function render(elem, container) {
  wipRoot = nextUnitOfWork = {
    dom: container,
    props: {
      children: [elem],
    },
    alternate: currentRoot,
  };

  deletions = [];
  nextUnitOfWork = wipRoot;
}

function updateDom(dom, newProps, oldProps) {
  function isDeleted(prop) {
    return !(prop in newProps);
  }

  Object.keys(oldProps)
    .filter(isEvent)
    .filter((prop) => isDeleted || oldProps[prop] !== newProps[prop])
    .forEach((prop) => {
      const e = prop.toLowerCase().slice(2);
      dom.removeEventListener(e, oldProps[prop]);
    });

  Object.keys(oldProps)
    .filter(isProperty)
    .filter(isDeleted)
    .forEach((prop) => (dom[prop] = ''));

  Object.keys(newProps)
    .filter(isProperty)
    .forEach((prop) => (dom[prop] = newProps[prop]));

  Object.keys(newProps)
    .filter(isEvent)
    .forEach((prop) => {
      const e = prop.toLowerCase().slice(2);
      console.log(e, newProps[prop]);
      dom.addEventListener(e, newProps[prop]);
    });
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT') {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE') {
    updateDom(fiber.dom, fiber.props, fiber.alternate.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

// An infinite loop is created here which is called br browser whenever it is free
// If there's some rendering that needs to be done, this will trigger it.
function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

// The heart and core of rendering. This takes something called a fiber which is just
// the object created bt createElement plus a couple of other things like child, sibling, etc
function performUnitWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  let children = fiber.props.children;
  reconcileChildren(fiber, children);

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

function reconcileChildren(wipFiber, children) {
  let i = 0;
  let oldFiber = wipFiber.alternate?.child;
  let prevSibling = null;

  while (i < children.length || oldFiber != null) {
    const child = children[i];

    // At this time, child is what we want to render, oldFiber is what we rendered last time

    let newFiber = null;
    const sameType = child && oldFiber && child.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }

    if (!sameType && child) {
      newFiber = {
        type: child.type,
        props: child.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }

    if (!sameType && oldFiber) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (i === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    ++i;
  }
}

requestIdleCallback(workLoop);

module.exports = {
  createElement,
  render,
};
