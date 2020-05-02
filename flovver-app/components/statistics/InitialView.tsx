import React, {useState} from 'react'
import BackArrow from '../initial_forms/Shared/BackArrow'
import { Text, View, StyleSheet, Image, Dimensions, 
        Switch, Button, TouchableOpacity, Modal } from 'react-native'

import * as COLORS from '../../styles/colors'

import { BarChart, YAxis, XAxis, Grid} from 'react-native-svg-charts'


const InitialView = ({history}) => {

    
    


    return(

        <View style={styles.container}>
            <View style={styles.title}>
                <BackArrow onPress={()=>{history.push("/Home/Index")}} />
                <Text>GRAPHS AND REPORTS</Text>
            </View>
            <View style={styles.PeriodContainer}>
                <View style={styles.PeriodTitle}>
                    <Text>PERIOD LENGTH</Text>
                    <View style={styles.PeriodInfo}>
                        {/* <YAxis
                            data={0}
                            contentInset={{top: 20}}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(days) => `${days}`}
                        />
                        <BarChart 
                            style={styles.PeriodChart}
                            data={0}
                            svg={'rgb(134, 65, 244)'}
                            contentInset={{top: 10}}
                        >
                        <Grid/>
                        </BarChart>
                        <XAxis
                            data={0}
                            contentInset={{top: 20}}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value} Days`}
                        /> */}
                        {/* X axis: days/duration, Y axis: start date */}
                    </View>
                </View>
                <View style={styles.AveragePeriodLength}>
                    <Text>YOUR AVERAGE PERIOD LENGTH: [X DAYS]</Text>
                </View>
            </View>
            <View style={styles.CycleContainer}>
                <View style={styles.CycleTitle}>
                    <Text>CYCLE LENGTH</Text>
                    <View style={styles.CycleChart}>

                    </View>
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

    title:{
        // fontFamily:"lato-regular",
        // color:COLORS.DARK_GREY,
        // fontSize:20,
        // letterSpacing: 4
    },

    container:{
        backgroundColor: COLORS.PEARL_WHITE
    },

    PeriodContainer:{

    },

    PeriodTitle:{
        backgroundColor: COLORS.WHITE
    },

    PeriodInfo:{

    },

    PeriodChart:{

    },

    AveragePeriodLength:{

    },

    CycleContainer:{

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