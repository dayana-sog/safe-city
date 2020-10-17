import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './screens/Landing';
import SafeCityMap from './screens/SafeCityMap';
import SafeCityPoint from './screens/SafeCityPoint';
import CreateSafeCityPoint from './screens/CreateSafeCityPoint';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={SafeCityMap} />
        <Route path="/cities/create" component={CreateSafeCityPoint} />
        <Route path="/cities/:id" component={SafeCityPoint} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;