import React from 'react';
import Router from './Router';
import {withRouter} from 'react-router-dom';
import './App.css';

const App = () => (
  <div className="App">
    <Router
    />
  </div>
);

export default withRouter(App);
