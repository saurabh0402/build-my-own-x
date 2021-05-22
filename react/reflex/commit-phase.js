const { isEvent, isDeleted, getEventName, isProperty } = require('./helpers');

function commitRoot() {
  global.deletions.forEach(commitWork);
  commitWork(global.wipRoot.child);
  global.deletions = [];
  global.currentRoot = global.wipRoot;
  global.wipRoot = null;
}

function commitDeletion(domParent, fiber) {
  while (!fiber.dom) {
    fiber = fiber.child;
  }

  domParent.removeChild(fiber.dom);
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  let parent = fiber.parent;
  while (!parent.dom) {
    parent = parent.parent;
  }

  const domParent = parent.dom;

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETION' && fiber.dom) {
    commitDeletion(domParent, fiber);
  } else if (fiber.effectTag === 'UPDATE') {
    updateDom(fiber);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function updateDom(fiber) {
  const dom = fiber.dom;
  const oldProps = fiber.alternate.props;
  const newProps = fiber.props;

  Object.keys(oldProps)
    .filter(isEvent)
    .filter(
      (prop) => isDeleted(prop, newProps) || oldProps[prop] !== newProps[prop]
    )
    .forEach((prop) => {
      const e = getEventName(prop);
      dom.removeEventListener(e, oldProps[prop]);
    });

  Object.keys(oldProps)
    .filter((prop) => isProperty && isDeleted(prop, newProps))
    .forEach((prop) => {
      dom[prop] = '';
    });

  Object.keys(newProps)
    .filter(isProperty)
    .forEach((prop) => (dom[prop] = newProps[prop]));

  Object.keys(newProps)
    .filter(isEvent)
    .forEach((prop) => {
      const e = getEventName(prop);
      dom.addEventListener(e, newProps[prop]);
    });
}

module.exports = {
  commitRoot,
};
