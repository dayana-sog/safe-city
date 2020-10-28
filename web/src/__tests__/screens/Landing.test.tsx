import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Landing from '../../screens/Landing';

afterAll(cleanup)

describe('Landing Page Test', () => {
  it('Should be able to navigate to map page', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
    <Router history={history}>
      <Landing />
    </Router>);

    const button = getByTestId('enter-map');
    
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/app');
  })
});