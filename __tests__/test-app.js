import React from 'react';
import {shallow} from 'enzyme';

import App from '../app/components/app';

it("tests App component", function(){
    const app = shallow(<App />);
    expect(app.text()).toContain("Hello from React!");
});