import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';


import Store from './store/Store'

import Login from './components/login/Login';
import InitialForm from './components/initial_forms/InitialForm'
import Home from './components/home/Home'
import FontLoad from './components/shared/FontLoad'

const App = () => (
    <Store>
      <FontLoad>
        <NativeRouter>
          <Switch> 
            <Route exact path="/" component={Login} />
            <Route path="/InitialForm" component={InitialForm} />
            <Route path="/Home" component={Home} />
          </Switch>
        </NativeRouter>
      </FontLoad>
    </Store>
)


export default App

