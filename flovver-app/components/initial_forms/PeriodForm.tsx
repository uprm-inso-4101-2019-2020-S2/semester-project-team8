import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PeriodForm = (props:any) => {

    const [date, setDate] = useState(new Date(1598051730000))
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate  || date;
        setDate(currentDate);
    };

    return (
        <React.Fragment>
            <Button
                onPress={()=>setShow(true)}
                title="Choose Date"
            />
            {show ?
               <DateTimePicker 
                value={date}
                onChange = {onChange}
               />
               :<View><Text>Not Chosen</Text></View>
            }
            <Text>Date chosen is: {date.toString()} </Text>
        </React.Fragment>
    )

}


export default PeriodForm