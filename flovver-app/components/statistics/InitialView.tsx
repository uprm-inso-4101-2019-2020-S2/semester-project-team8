import React, {useState} from 'react'
import BackArrow from '../initial_forms/Shared/BackArrow'
import { Text, View, StyleSheet, Image, Dimensions, 
        Switch, Button, TouchableOpacity, Modal } from 'react-native'

import * as COLORS from '../../styles/colors'
import * as scale from 'd3-scale'
import { BarChart, YAxis, XAxis, Grid} from 'react-native-svg-charts';

import TitleArea from '../settings/TitleArea'


const InitialView = ({history}) => {

    
    const data = [
        {
            value: 50,
            label: 'One',
        },
        {
            value: 10,
            label: 'Two',
        },
        {
            value: 40,
            label: 'Three',
        },
        {
            value: 95,
            label: 'Four',
        },
        {
            value: 85,
            label: 'Five',
        },
    ]

    // const CUT_OFF = 50
    // const Labels = ({  x, y, bandwidth, data }) => (
    //     data.map((value, index) => (
    //         <Text
    //             key={ index }
    //             x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
    //             y={ y(index) + (bandwidth / 2) }
    //             fontSize={ 14 }
    //             fill={ value > CUT_OFF ? 'white' : 'black' }
    //             alignmentBaseline={ 'middle' }
    //         >
    //             {value}
    //         </Text>
    //     ))
    // )

    return(

        <View style={styles.container}>
            <TitleArea 
                history={history}
                title="GRAPHS AND REPORTS"
            />
            <View style={styles.PeriodContainer}>
                <View style={styles.PeriodTitle}>
                    <Text style={styles.textStyle}>PERIOD LENGTH</Text>
                </View>
                    <View style={styles.PeriodInfo}>
                        <YAxis
                            data={data}
                            contentInset={{top: 20}}
                            yAccessor={({ index }) => index}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            scale={scale.scaleBand}
                            numberOfTicks={10}
                            formatLabel={(days) => `${days}`}
                        />
                        <BarChart 
                            style={styles.PeriodChart}
                            yAccessor={({ item }) => item.value}
                            
                            data={data}
                            svg={{fill:COLORS.MID_BLUE}}
                            contentInset={{top: 10}}
                            gridMin={0}
                            // horizontal={false}
                            
                        >
                            <Grid direction={Grid.Direction.VERTICAL}/>
                            {/* <Labels/> */}
                        </BarChart>
                        {/* <XAxis
                            data={data}
                            contentInset={{left:10}}
                            xAccessor={({ index }) => index}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            scale={scale.scaleBand}
                            numberOfTicks={10}
                            formatLabel={(days) => `${days}`}  
                        /> */}
                        {/* X axis: days/duration, Y axis: start date */}
                    </View>
                
                <View style={styles.AveragePeriodLength}>
                    <Text>YOUR AVERAGE PERIOD LENGTH: [X DAYS]</Text>
                </View>
            </View>
            <View style={styles.CycleContainer}>
                <View style={styles.CycleTitle}>
                    <Text style={styles.textStyle}>CYCLE LENGTH</Text>
                </View>
                <View style={styles.CycleChart}>
                    
                </View>
                <View style={styles.AverageCycleLength}>
                    <Text>YOUR AVERAGE CYCLE LENGTH: [X DAYS]</Text>
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
        marginTop:10,
        marginLeft:15,
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY
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