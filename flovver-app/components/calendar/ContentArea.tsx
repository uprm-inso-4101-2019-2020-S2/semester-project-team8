import React,{useState} from 'react'
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native'


import * as COLORS from '../../styles/colors'
import ChangePeriodPicker from './shared/ChangePeriodPicker';
import Loading from '../shared/Loading';


const ContentArea = ({markedDays}) => {

    
    const [isLoading, setIsLoading] = useState(false)


    return (
        <View style={styles.ContentContainer}>
            <View>
                <ChangePeriodPicker 
                    markedDays={markedDays}
                    setIsLoading={setIsLoading}
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
           
            <Loading isVisible={isLoading} />
            
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