import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {LIGHT_GREY} from '../../styles/colors';
import { Route } from 'react-router-native';

import PeriodForm from './PeriodForm'
import DurationForm from './DurationForm'
import CycleForm from './CycleForm'

const InitialForm = ( { history } ) => {

    const [periodStart, setPeriodStart] = useState("")
    const [periodDuration, setPeriodDuration] = useState(5)
    const [cycleLen, setCycleLen] = useState(28)
    
    useEffect(() => {
        history.push("/InitialForm/Period")
    }, [])

    return (
        <View style={styles.container} >
            <Route 
                path = "/InitialForm/Period"
                component={PeriodForm} />
            <Route path="/InitialForm/Duration" 
                   render = {() => (<DurationForm onSubmit={setPeriodDuration}/>) } />
            <Route 
                path = "/InitialForm/Cycle"
                render = {() => (<CycleForm onSubmit={setCycleLen}/>) } />
        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})

export default InitialForm