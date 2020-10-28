import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as Leaflet from 'leaflet'

import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

import SafeCityMap from '../../screens/SafeCityMap';

afterAll(cleanup);

describe('SafeCityMap Page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to navigate to map page', async () => {
    const history = createMemoryHistory();

    apiMock.onGet('cities').reply(200, []);

    const { getByTestId, container } = render(
      <Router history={history}>
        <SafeCityMap />
      </Router>,
    );
    
    // expect(container.firstChild.)

    const button = getByTestId('create-safe-city-link');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(history.location.pathname).toBe('/cities/create');
  });
});