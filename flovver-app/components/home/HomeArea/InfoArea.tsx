import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import ButtonNoBorder from '../Shared/ButtonNoBorder'

import { getAcronDateShort } from '../../shared/SharedMethods'

const InfoArea = ({ ovulation, fertile, isFertile, setIsLoading }) => {
        
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const onChange = (event, date) => {
        setShow(false)
        const currentDate = date  || selectedDate;
        setIsLoading(true)
    }

    return( <View style={styles.Events}> 
            
        <View style={styles.nextEventsView}>
            <Text style={styles.nextEvents1} >{getAcronDateShort(ovulation).toUpperCase()}</Text>
            <Text style={styles.nextEvents2} >NEXT {"\n"}OVULATION</Text>
        </View>
        
        <ButtonNoBorder 
            onPress={()=>{setShow(true)}}
            isFlovver={true} 
            isGear={false} />
            
        <View style={styles.nextEventsView}>
            <Text style={styles.nextEvents1} >{getAcronDateShort(fertile).toUpperCase()}</Text>
            <Text style={styles.nextEvents2} >
                {isFertile?"FERTILE \nEND":"NEXT \nFERTILE"}
            </Text>
        </View>

        {show&&(
            <DateTimePicker 
                value={selectedDate}
                onChange={onChange}
            />)   
        }

    </View>)
}


export default InfoArea

const styles = StyleSheet.create({
    Events:{
        marginLeft:-5,
        flexDirection:"row",
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent: "space-between"
    },

    nextEvents1:{
        marginTop:10,
        color:'#ffffff',
        fontSize:20,
        borderBottomColor:'#ffffff',
        borderBottomWidth:2,
        fontFamily:"lato-bold"
    },

    nextEvents2:{
        paddingTop:5,
        textAlign:"center",
        color:'#ffffff'
    },

    nextEventsView:{
        position:"relative",
        top:35,
        color:'#ffffff',
        alignItems:"center"
    }
})