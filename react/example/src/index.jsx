const reflex = require('../../reflex');

/** @jsx reflex.createElement */
const elem = (
  <div>
    <h1 className="hello"> Hello World! </h1>
    <h2> I am here, where are you? </h2>
  </div>
);

const container = document.getElementById('root');
reflex.render(elem, container);
