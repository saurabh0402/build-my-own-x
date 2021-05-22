const reflex = require('../../reflex');

/** @jsx reflex.createElement */
const App = function () {
  const [state, setState] = reflex.useState(1);

  return (
    <div>
      <h1 className="hello" onClick={() => setState((s) => s + 1)}>
        {state}
      </h1>
      <h2> Hello, there. Click count to increase it. </h2>
    </div>
  );
};

const container = document.getElementById('root');
reflex.render(<App />, container);
