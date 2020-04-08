import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Store from './store/Store'

import Login from './components/login/Login';
import InitialForm from './components/initial_forms/InitialForm'


const App = () => (
    <Store>
      <NativeRouter>
        <Switch> 
          <Route exact path="/" component={Login} />
          <Route path="/InitialForm/" component={InitialForm} />
        </Switch>
      </NativeRouter>
    </Store>
)


export default App

