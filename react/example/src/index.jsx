const reflex = require('../../reflex');

/** @jsx reflex.createElement */
const App = function () {
  return (
    <div>
      <h1 className="hello" onClick={() => console.log('Hello')}>
        Hello World!
      </h1>
      <h2> I am here, where are you? </h2>
    </div>
  );
};

const container = document.getElementById('root');
reflex.render(<App />, container);
