import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import * as COLORS from '../../../styles/colors'


const ColorLegend = () => (
    <View style={styles.LegendContainer} >
        <View style={styles.CircleContainer}>
            <View style={[styles.Circle, styles.PeriodCircle]} />
            <Text style={[styles.LegendText,{marginLeft:-8}]} >PERIOD</Text>
        </View>
        <View style={styles.CircleContainer} >
            <View style={[styles.Circle, styles.FertileCircle]}/>
            <Text style={[styles.LegendText,{marginLeft:-8}]}  >FERTILE</Text>
        </View>
        <View style={styles.CircleContainer} >
            <View style={[styles.Circle, styles.OvulationCircle]}/>
            <Text style={styles.LegendText} >OVULATION</Text>
        </View>
    </View>
)

export default ColorLegend

const styles = StyleSheet.create({


    LegendContainer:{
        paddingTop:25,
        flexDirection:"row",
        justifyContent:"space-around",
    },

    CircleContainer:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        flex:1
    },

    Circle:{
        height:13,
        width:13,
        borderRadius:100,
    },

    LegendText:{
        marginTop:-3
    },

    PeriodCircle:{
        backgroundColor:COLORS.PINK
    },

    FertileCircle:{
        backgroundColor:COLORS.YELLOW
    },
    
    OvulationCircle:{
        backgroundColor:COLORS.ORANGE
    }

}) 