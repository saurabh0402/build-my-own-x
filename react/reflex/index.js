const { createElement, createDom } = require('./creator');
const { isEvent, isProperty } = require('./helpers');
const { render, performUnitWork } = require('./render-phase');
const { commitRoot } = require('./commit-phase');

// The next fiber to be processed
global.nextUnitOfWork = null;

// Reference to the fiber tree that will be commited
global.wipRoot = null;

// This stores what the current rendered tree is
// i.e., fiber tree that was rendered in last render
global.currentRoot = null;

// Elems that needs to be deleted
global.deletions = [];

// An infinite loop is created here which is called br browser whenever it is free
// If there's some rendering that needs to be done, this will trigger it.
function workLoop(deadline) {
  let shouldYield = false;

  while (!shouldYield && global.nextUnitOfWork) {
    global.nextUnitOfWork = performUnitWork(global.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!global.nextUnitOfWork && global.wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

module.exports = {
  createElement,
  render,
};
