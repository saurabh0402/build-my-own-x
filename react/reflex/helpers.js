function isEvent(prop) {
  return prop.startsWith('on');
}

function isProperty(prop) {
  return prop !== 'children' && !isEvent(prop);
}

function getEventName(prop) {
  return prop.toLowerCase().slice(2);
}

function isDeleted(prop, props) {
  return !(prop in props);
}

function isFunctionalComponent(fiber) {
  return fiber.type instanceof Function;
}

module.exports = {
  isEvent,
  isProperty,
  getEventName,
  isDeleted,
  isFunctionalComponent,
};
