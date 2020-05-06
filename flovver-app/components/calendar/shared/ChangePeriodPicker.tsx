import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, View,} from 'react-native'
import { UserContext } from '../../../store/UserContext' 
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import * as requests from '../../../backend_requests/user'
import * as actions from '../../../store/actions'

const ChangePeriodPicker = ({show, setShow, dayLongPress, setIsLoading}) => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [state, dispatcher] = useContext(UserContext)


    useEffect(()=>{

    }, [dayLongPress])


    // todo
    const shouldShow = () => {

        if(dayLongPress.dateString){
            
            let foundStart = false
            let foundEnd = false
            for(let i = 0 ; i < state.user.cycle; i++){
                if(state.user.cycle[i].bleed_start === dayLongPress.dateString){
                    foundStart = true
                    break;
                }
                else if(state.user.cycle[i].bleed_end === dayLongPress.dateString){
                    foundEnd = true
                    break;
                }
            }

            return [foundStart, foundEnd]

        }

        return null
    }

    const selectId = (date:Date) => {

        const pt = 0.70 

        let m = moment.utc(date.toISOString())
        
        let m1 = moment.utc(state.user.cycle[1].bleed_start).add(state.user.cycle_avg*pt, 'days')

        return m.isAfter(m1)? state.user.cycle[0].id : state.user.cycle[1].id

    }

    /*
    {
        bleed_start:ISOString,
        bleed_end:null,
        cycle_id:numero
    }
    */
    
    const onChange = (event, date:Date) => {
        
        setShow(false)
        
        const currentDate = date  || selectedDate;

        if (currentDate == selectedDate) {setIsLoading(false); return;}

        setIsLoading(true)

        let t_id = selectId(date) 

        // requests.addPeriod(state.token, {
        //     bleed_start:date.toISOString().split("T")[0],
        //     cycle_id:t_id
        // }).then( res => {
        //     console.log(res)
        //     dispatcher(actions.setUser(res))
        // }).then(()=>{setIsLoading(false)})

    }

    return (
        <>
            {show&&(
                <DateTimePicker
                    minimumDate={new Date()}
                    maximumDate={new Date()}
                    value={selectedDate}
                    onChange={onChange}
                />
                )     
            }
        </>
        

    )


}

const styles = StyleSheet.create({

})

export default ChangePeriodPicker