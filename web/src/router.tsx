import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './screens/Landing';
import OrphanagesMap from './screens/OrphanagesMap';
import Orphanage from './screens/Orphanage';
import CreateOrphanage from './screens/CreateOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;