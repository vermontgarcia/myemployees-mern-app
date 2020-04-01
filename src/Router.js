import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logs from './Components/Logs';
import Chart from './Components/Chart';


const Router = () => (
  <Switch>
    <Route exact path='/' render={(props) => (
      <Home
        {...props}
      />)}
    />
    <Route exact path='/signup' render={(props) => (
      <Signup
        {...props} 
      />)}
    />
    <Route exact path='/login' render={(props) => (
      <Login
        {...props} 
      />)}
    />
    <Route exact path='/logs' render={(props) => (
      <Logs
        {...props} 
      />)}
    />
    <Route exact path='/logchart' render={(props) => (
      <Chart
        {...props} 
      />)}
    />
  </Switch>
);

export default Router;