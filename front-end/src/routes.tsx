import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home/index';
import CreatePoint from './pages/CreatePoint/index';

const Routes = () => {
  return(
    <BrowserRouter>
      <Route component={Home} path="/" exact/>
      <Route component={CreatePoint} path="/create-point"/>
    </BrowserRouter>
  );
}

export default Routes;
