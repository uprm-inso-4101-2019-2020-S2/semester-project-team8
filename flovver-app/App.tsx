import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Login from './components/login/Login';
import InitialForm from './components/initial_forms/InitialForm'


export default class App extends Component {
  render() {
    return (
      
      <NativeRouter>
        <Switch>
          <Route path="/o" component={Login} />
          <Route path="/" component={InitialForm} />
        </Switch>
      </NativeRouter>
      
    );
  }
  
}

