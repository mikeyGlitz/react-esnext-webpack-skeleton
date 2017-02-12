import React from 'react';
import { shallow } from 'enzyme';

import App from '../app/components/app';

describe('App component tests', () => {
  it('Test App component moutning', () => {
    const app = shallow(<App />);
    expect(app.text()).toContain('Hello from React!');
  });
});
