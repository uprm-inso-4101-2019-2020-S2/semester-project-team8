import React from 'react'
import { View, StyleSheet } from 'react-native'

import CircleArea from './HomeArea/CircleArea'
import InfoArea from './HomeArea/InfoArea'

import LatoText from '../shared/LatoText'

import { useMenstrualData } from '../shared/Hooks'
import { getDate } from '../shared/SharedMethods'

const HomeArea = () => {
    
    const [menstrualData, cycleArray] = useMenstrualData()

    const getNextPeriod = () => {
        
        const date1 = new Date()
        const date2 = new Date(cycleArray[0].bleed_start)
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays 
    } 

    return (
        <View style={styles.homeArea}>
            <View style={styles.inner} >
                <LatoText style={styles.day}>WED, APRIL 3, 2020</LatoText>
                <CircleArea 
                    nextPeriod={getNextPeriod()}
                    nextPeriodDate={getDate(new Date(cycleArray[0].bleed_start))}
                />
                <InfoArea />
            </View>
        </View>
    )
}


export default HomeArea

const styles = StyleSheet.create({

    homeArea:{
        flex:8,
        alignItems:"center",
        justifyContent:"space-around",
    },

    inner:{
        
        alignItems:"center",
        justifyContent:"center",
        position:"relative",
        top:-50
    },

    day:{
        textAlign:"center",
        fontSize:16,
        color:'#ffffff',
        fontWeight:"bold",
        letterSpacing:2,
        fontFamily:"lato-bold"
    },

})