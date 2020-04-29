import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import LatoText from '../../shared/LatoText'
import * as COLORS from '../../../styles/colors'
import {getAcronDateShort} from '../../shared/SharedMethods'


const CircleArea = ({ displayDay, inPeriod, periodDate, isFertile }) => {
            
    
            
    return (<View style={styles.circle }>
        <LatoText style={styles.text}>PERIOD {inPeriod?"ENDS":""} IN</LatoText>
        <Text style={[styles.text, styles.periodCountDown]}>{displayDay} DAYS</Text>
        <LatoText
            style={{
                marginTop:-5,
                color:"white",
                paddingBottom:10,
            }} 
        >{getAcronDateShort(periodDate).toUpperCase()}</LatoText>
        <LatoText style={[styles.chanceText, styles.text] }>{isFertile?"HIGH":"LOW"} CHANCE {"\n"}OF GETTING PREGNANT</LatoText>
    </View>)
}


const styles = StyleSheet.create({
    circle: {
        marginTop:30,
        height:275,
        width:275,
        borderColor:COLORS.PINK,
        borderWidth:4,
        borderRadius:200,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:20,
        
    },
    text:{
        color:"#ffffff",
        textAlign:"center",
        fontSize:11,
        letterSpacing:0.5,
    },
    chanceText:{
        borderTopColor:"#ffffff",
        borderTopWidth:2,
        paddingTop:25,
    },
    periodCountDown : {
        color:"#ffffff",
        fontSize:40,
        textAlign:"center",
        letterSpacing:5,
        marginBottom:15,
        fontFamily:"lato-bold",
        marginTop:10
    }
})


export default CircleArea