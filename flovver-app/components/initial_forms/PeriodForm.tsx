import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DARK_BLUE, PINK} from '../../styles/colors'
import Next from './Shared/Next'
import ChooseDateButton from './Shared/ChooseDateButton'

const PeriodForm = ({history}) => {

    const [date, setDate] = useState(new Date(1598051730000))
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate  || date;
        setDate(currentDate);
    };


    return (
        <React.Fragment>
            <Text style={styles.title} >When did your last {"\n"} period start?</Text>
            <View>
                <ChooseDateButton 
                    onPress={()=>{setShow(true)}}
                />
                <Text style={{textAlign:'center', marginTop:10}} >{date.getMonth()}-{date.getDay()}-{date.getFullYear()}</Text>
            </View>
            {show &&
               <DateTimePicker 
                value={date}
                onChange = {onChange}
                style={{backgroundColor:PINK}}
               />
            }
            <Next onPress={()=>{history.push("/InitialForm/Duration")}} />
            
        </React.Fragment>
    )

}

const styles = StyleSheet.create({

   title:{
       fontSize:40,
       textAlign:"center",
       fontWeight:"bold",
       color:DARK_BLUE
   }

})


export default PeriodForm