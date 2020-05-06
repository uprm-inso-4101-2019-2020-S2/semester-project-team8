import React,{useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars';

import * as COLORS from '../../styles/colors'
import ChangePeriodPicker from './shared/ChangePeriodPicker';


const ContentArea = ({markedDays}) => {
    const [dayLongPress, setDayLongPress] = useState({})
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const onDayLongPress = (day) => {
        setDayLongPress(day)
    }

    const setShowWrapper = (action) => {if(action){setShow(true)}}

    return (
        <View style={styles.ContentContainer}>
            <View>
                <Calendar
                    hideExtraDays={true}
                    theme={{
                        arrowColor: COLORS.MID_BLUE
                    }}
                    markedDates={markedDays}
                    markingType={'period'}
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                />
                <ChangePeriodPicker 
                    setIsLoading={setIsLoading}
                    show={show}
                    setShow={setShowWrapper}
                    dayLongPress={dayLongPress}
                />
            </View>
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
        </View>
    )
}

export default ContentArea

const styles = StyleSheet.create({
    

    ContentContainer:{
        paddingLeft:20,
        paddingRight:20,
        flex:6,
    },

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