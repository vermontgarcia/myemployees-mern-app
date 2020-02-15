import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home';


const Router = () => (
  <Switch>
    <Route exact path='/' render={(props) => (
      <Home
        {...props}
    />)}
  />
  </Switch>
);

export default Router;