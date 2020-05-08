import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import CircleArea from './HomeArea/CircleArea'
import InfoArea from './HomeArea/InfoArea'
import LatoText from '../shared/LatoText'

import { useMenstrualData } from '../shared/Hooks'
import * as COLORS from '../../styles/colors'

import moment from 'moment'

const HomeArea = () => {
    
    const [cycleArray, cycleInfo] = useMenstrualData()
    const [displayDay, setDisplayDay] = useState(0)
    const [inPeriod, setInPeriod] = useState(false)
    const [periodDate, setPeriodDate] = useState(new Date())
    const [isFertile, setIsFertile] = useState(false)
    const [ovulation, setOvulation] = useState(new Date())
    const [fertile, setFertile] = useState(new Date())
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)

        const today = new Date()
        let inPeriodSet = false
        let periodDateSet = false 
        let fertile_set = false
        let ovulation_set = false

        let inPeriodTemp = false
        let periodDateTemp = new Date()
        let isFertileTemp = false
        let ovulationTemp = new Date()
        let fertileTemp = new Date()

        for(let i = cycleArray.length - 1; i >= 0; i-- ){

            if(today < new Date(cycleArray[i].bleed_end) 
                && today >= new Date(cycleArray[i].bleed_start) && !inPeriodSet){
                periodDateTemp = new Date(cycleArray[i].bleed_end)
                inPeriodTemp = true
                inPeriodSet = true
                periodDateSet = true
            }

            else if(today > new Date(cycleArray[i].bleed_end) ) {
                continue
            }

            else if (!periodDateSet && !inPeriodSet){
                periodDateTemp = new Date(cycleArray[i].bleed_start)
                inPeriodTemp = false
            }

        }

        for(let i = cycleInfo.length - 1; i>=0; i--){
            
            if (today >= cycleInfo[i].fertile_start && today < cycleInfo[i].fertile_end && !fertile_set){
                isFertileTemp = true
                fertileTemp = cycleInfo[i].fertile_end
                fertile_set  = true
            }

            else if(today < cycleInfo[i].fertile_start && !fertile_set) {
                fertileTemp = cycleInfo[i].fertile_start
                isFertileTemp = false
                fertile_set  = true
            }

            if(today <= cycleInfo[i].ovulation_date && !ovulation_set){
                ovulationTemp = cycleInfo[i].ovulation_date
                ovulation_set = true    
            }    

        }
        
        if(!ovulation_set){
            ovulationTemp = cycleInfo[0].ovulation_date
        }

        let a = moment.utc(today.toISOString())
        let b = moment.utc(periodDateTemp.toISOString())
        setDisplayDay(b.diff(a, 'days'))

        setFertile(fertileTemp)
        setInPeriod(inPeriodTemp)
        setPeriodDate(periodDateTemp)
        setIsFertile(isFertileTemp)
        setOvulation(ovulationTemp)

        setIsLoading(false)
    }, [cycleArray])
    

    // useEffect(()=>{
        
    // }, [periodDate])

    if(isLoading){
        return(
            <View style={{flex:8, justifyContent:"center", alignItems:"center", backgroundColor:COLORS.MID_BLUE}}>
                <ActivityIndicator size="large" color={COLORS.PINK} />
            </View>
        )
    }

    return (
        <View style={styles.homeArea}>
            <View style={styles.inner} >
                <LatoText style={styles.day}>
                    {moment.utc((new Date()).toISOString()).format('ddd, MMM D, YYYY').toUpperCase()}
                </LatoText>
                <CircleArea 
                    displayDay={displayDay}
                    isFertile={isFertile}
                    inPeriod={inPeriod}
                    periodDate={periodDate}
                />
                <InfoArea  
                    isFertile={isFertile}
                    ovulation={ovulation}
                    fertile={fertile}
                    setIsLoading={setIsLoading}
                />
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
        backgroundColor:COLORS.MID_BLUE
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