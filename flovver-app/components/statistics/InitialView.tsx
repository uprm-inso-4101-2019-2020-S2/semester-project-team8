import React, {useState} from 'react'

import { Text, View, StyleSheet } from 'react-native'

import * as COLORS from '../../styles/colors'

import ChartInfo from './ChartInfo'

import TitleArea from '../settings/TitleArea'

import { UserContext } from '../../store/UserContext'


const InitialView = ({history}) => {

    
    

    return(

        <View style={styles.container}>
            <TitleArea 
                history={history}
                title="GRAPHS AND REPORTS"
                backAction={null}
            />
            <View style={styles.PeriodContainer}>
                <View style={styles.PeriodTitle}>
                    <Text style={styles.textStyle}>PERIOD LENGTH</Text>
                </View>
                    <View style={styles.PeriodInfo}>
                        <ChartInfo forPeriod={true}></ChartInfo>
                    </View>
                
                <View style={styles.AveragePeriodLength}>
                    <Text style={styles.averageTextStyle}>YOUR AVERAGE PERIOD LENGTH: [X DAYS]</Text>
                </View>
            </View>
            <View style={styles.CycleContainer}>
                <View style={styles.CycleTitle}>
                    <Text style={styles.textStyle}>CYCLE LENGTH</Text>
                </View>
                <View style={styles.CycleChart}>
                    <ChartInfo forPeriod={false}></ChartInfo>
                </View>
                <View style={styles.AverageCycleLength}>
                    <Text style={styles.averageTextStyle}>YOUR AVERAGE CYCLE LENGTH: [X DAYS]</Text>
                </View>
            </View>


        </View>
    )

}

export default InitialView

const styles = StyleSheet.create({

    textStyle:{
        fontSize:16,
        letterSpacing:2,
        marginTop:5,
        marginBottom:5,
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        textAlign:'center'
    },

    averageTextStyle:{
        fontSize:14,
        letterSpacing:2,
        marginTop:5,
        marginBottom:5,
        fontFamily:"lato-regular",
        color:COLORS.DARK_BLUE,
        textAlign:'center'
    },

    container:{
        backgroundColor: COLORS.PEARL_WHITE,
        flex:1
    },

    PeriodContainer:{
        flex:3
    },

    PeriodTitle:{
        backgroundColor: COLORS.WHITE,
        marginTop:10,
        
    },

    PeriodInfo:{
       flex:1
    },

    PeriodChart:{
        flex:1
    },

    AveragePeriodLength:{

    },

    CycleContainer:{
        flex:3
    },

    CycleTitle:{
        backgroundColor: COLORS.WHITE
    },

    CycleInfo:{

    },

    CycleChart:{

    },

    AverageCycleLength:{

    }
})