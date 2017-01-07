import React from 'react';
import { shallow } from 'enzyme';

import App from '../app/components/app';

describe("App component tests", function () {
    it("Test App component moutning", function () {
        const app = shallow(<App />);
        expect(app.text()).toContain("Hello from React!");
    });
});
