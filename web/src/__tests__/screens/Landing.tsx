import React from 'react';
import { render } from '@testing-library/react';

import Landing from '../../screens/Landing';

describe('Landing Page Test', () => {
  it('Should render the Landing Page', () => {
    const { debug } = render(<Landing />);

    debug();
  })
});