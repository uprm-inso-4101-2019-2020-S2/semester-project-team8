import React, { useState, useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import { Route } from 'react-router-native'

import * as COLORS from '../../styles/colors'

import HomeArea from './HomeArea'
import BottomMenu from './BottomMenu'

import Loading from '../shared/Loading'
import { useUser } from '../shared/Hooks'
import IndexView from './IndexView'
import CalendarInitialView from '../calendar/InitialView'
import SettingsInitialView from '../settings/InitialView'
import StastisticsInitialView from '../statistics/InitialView'

// Smart Component
const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    
    useUser(isLoading, setIsLoading)
    
    if(isLoading) return <Loading isVisible={isLoading} />

    else{
        return (
            <View style={styles.container}>
                <Route path="/Home/Index" component={IndexView} />
                <Route path="/Home/Calendar" component={CalendarInitialView} />
                <Route path="/Home/Settings" component={SettingsInitialView} />
                <Route path="/Home/Statistics" component={StastisticsInitialView} />
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