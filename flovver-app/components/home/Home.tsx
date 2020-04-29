import React, { useState, useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import { Route } from 'react-router-native'

import * as COLORS from '../../styles/colors'

import HomeArea from './HomeArea'
import BottomMenu from './BottomMenu'

import Loading from '../shared/Loading'
import { useUser } from '../shared/Hooks'
import IndexView from './IndexView'
import InitialView from '../calendar/InitialView'
import SettingsArea from '../settings/SettingsArea'

// Smart Component
const Home = ({history}) => {

    const [isLoading, setIsLoading] = useState(true)
    
    useUser(isLoading, setIsLoading)
    
    if(isLoading) return <Loading />

    else{
        return (
            <View style={styles.container}>
                <Route path="/Home/Index" component={IndexView} />
                <Route path="/Home/Calendar" component={InitialView} />
                <Route path="/Home/Settings" component={SettingsArea} />
            </View>
        )
    }

} 

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:"stretch"
    }

})


export default Home