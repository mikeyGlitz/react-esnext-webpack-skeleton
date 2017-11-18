global.requestAnimationFrame = callback => setTimeout(callback, 0);

/* eslint-disable */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
/* eslint-enable */

Enzyme.configure({ adapter: new Adapter() });
