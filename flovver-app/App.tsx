import React from 'react';
import { NativeRouter, Switch, Route, Redirect } from 'react-router-native';


import Store from './store/Store'

import Login from './components/login/Login';
import InitialForm from './components/initial_forms/InitialForm'
import Home from './components/home/Home'
import FontLoad from './components/shared/FontLoad'
import { StatusBar } from 'react-native';

console.disableYellowBox = true;

const App = () => (
    <Store>
      <StatusBar hidden={true} />
      <FontLoad>
        <NativeRouter>
          <Switch> 
            <Route exact path="/Login" component={Login} />
            <Route path="/InitialForm" component={InitialForm} />
            <Route path="/Home" component={Home} />
            <Route path="/" render={()=><Redirect to="/Home/Index"/>} /> 
          </Switch>
        </NativeRouter>
      </FontLoad>
    </Store>
)


export default App

