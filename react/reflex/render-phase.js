/*
  In rendering phase, our main task is to create the Fiber tree which will then be
  commited to DOM in the commit phase.

  Our actual renderer is the workLoop function. We have scheduled its running using
  requestIdleCallback function and it will keep running. workLoop checks if there's
  something in nextUnitOfWork, and performs it if required.

  The job of render is to set nextUnitOfWork such that when workLoop next runs it
  will perform the job.

  The core of rendering is though done inside performUnitWork function which actually
  creates the fiber tree for us. The fiber tree contains everything that we will need
  while commiting the tree to DOM.
*/

const { createDom } = require('./creator');
const { isFunctionalComponent } = require('./helpers');

function render(elem, root) {
  global.wipRoot = {
    dom: root,
    props: {
      children: [elem],
    },
    alternate: global.currentRoot,
  };

  global.nextUnitOfWork = global.wipRoot;
}

let wipFiber = null;
let hookIndex = 0;

function reconcileFunctionalComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  const oldHook = wipFiber.alternate?.hooks?.[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  (oldHook?.queue || []).forEach((action) => (hook.state = action(hook.state)));

  function setState(action) {
    hook.queue.push(action);
    global.wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    global.nextUnitOfWork = wipRoot;
  }

  wipFiber.hooks.push(hook);
  ++hookIndex;
  return [hook.state, setState];
}

function reconcileHtmlComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
}

function performUnitWork(fiber) {
  if (isFunctionalComponent(fiber)) {
    reconcileFunctionalComponent(fiber);
  } else {
    reconcileHtmlComponent(fiber);
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

/*
  This function compares the last rendered Fiber tree to the one we are creating now.
  Depending on that it decides what it wants to do with a node - update, create or delete
*/
function reconcileChildren(fiber, children) {
  let i = 0;
  let oldFiber = fiber.alternate?.child;
  let prevSibling = null;

  while (i < children.length || oldFiber) {
    const child = children[i];
    let newFiber = null;
    const sameType = child && oldFiber && child.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: child.type,
        dom: oldFiber.dom,
        props: child.props,
        alternate: oldFiber,
        parent: fiber,
        effectTag: 'UPDATE',
      };
    }

    if (!sameType && child) {
      newFiber = {
        type: child.type,
        dom: null,
        props: child.props,
        alternate: null,
        parent: fiber,
        effectTag: 'PLACEMENT',
      };
    }

    if (!sameType && oldFiber) {
      global.deletions.push(oldFiber);
      oldFiber.effectTag = 'DELETION';
    }

    if (i === 0) {
      fiber.child = newFiber;
    } else if (child) {
      prevSibling.sibling = newFiber;
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    prevSibling = newFiber;
    ++i;
  }
}

module.exports = {
  render,
  performUnitWork,
  useState,
};
