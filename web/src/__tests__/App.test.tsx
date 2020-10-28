import React from 'react';
import ReactDom from 'react-dom';

import App from '../App';

describe('App', () => {
  it('Should render the App without crashing', () => {
    const div = document.createElement('div');

    ReactDom.render(<App />, div);
  });
});