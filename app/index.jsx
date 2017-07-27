import 'babel-polyfill';  // Maintain support with legacy browsers (IE)
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

/**
 * Renders the react component to the DOM
 * @return {void}
 */
const render = () => {
  ReactDOM.render(<App />, document.getElementById('react'));
};

// Accept for HMR
if (module.hot) {
  module.hot.accept('./components/app', render);
}

render();
