import 'babel-polyfill';  // Maintain support with legacy browsers (IE)
import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

render(<App />, document.getElementById('react'));
