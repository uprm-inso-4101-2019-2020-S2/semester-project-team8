import React, {useState, useEffect, useContext} from 'react'

import {StyleSheet, View,} from 'react-native'
import { Calendar } from 'react-native-calendars';

import * as COLORS from '../../../styles/colors'
import { UserContext } from '../../../store/UserContext' 
import DateTimePicker from '@react-native-community/datetimepicker'

import { updatePeriod } from '../../../backend_requests/user'

import moment from 'moment'

import * as requests from '../../../backend_requests/user'
import * as actions from '../../../store/actions'

import { useHistory } from 'react-router-native'

const ChangePeriodPicker = ({markedDays, setIsLoading}) => {

    // datetimepicker sleected date
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [show, setShow] = useState(false)

    // Global user stored in react context
    const [state, dispatcher] = useContext(UserContext)

    // Id selected
    const [selectedId, setSelectedId] = useState(null)
    // Whether bleed_start was selected or not
    const [startSelected, setStartSelected] = useState(false)

    // Available date Ranges
    const [minDate, setMinDate] = useState(new Date())
    const [maxDate, setMaxDate] = useState(new Date()) 

    // history object for redirects
    const history = useHistory()

    const onDayLongPress = ( {dateString} ) => {
        
        for(let i = 0; i < state.user.cycle.length; i++){
            
            if(dateString === state.user.cycle[i].bleed_start){
                setSelectedId(state.user.cycle[i].id)
                setMaxDate(new Date(state.user.cycle[i].bleed_end))
                setStartSelected(true)
                let m1 = moment.utc(state.user.cycle[i].bleed_start)
                let m2 = m1.add(-state.user.cycle_avg, 'days')
                setMinDate(new Date(m2.format("YYYY-MM-DD")))
                setShow(true)
                return
            }

            else if(dateString === state.user.cycle[i].bleed_end) {
                setSelectedId(state.user.cycle[i].id)
                let m0 = moment.utc(state.user.cycle[i].bleed_start)
                m0 = m0.add(2, 'days')
                setMinDate(new Date(m0.format("YYYY-MM-DD")))
                setStartSelected(false)
                let m1 = moment.utc(state.user.cycle[i].bleed_end)
                let m2 = m1.add(state.user.cycle_avg, 'days')
                setMaxDate(new Date(m2.format("YYYY-MM-DD")))
                setShow(true)
                return
            }

        }

        setStartSelected(null)
        setSelectedId(null)
        
    } 

    const onChange = (e, date:Date) => {
        
        if(date && date != selectedDate && selectedId != null) {
            
            
            setShow(false)
            setIsLoading(true)
            
            const cycle = state.user.cycle.filter(x => x.id === selectedId)
            
            let body = {
                bleed_start:null,
                bleed_end:null,
                cycle_id:selectedId
            }
            
            if(startSelected) {
                body.bleed_start = date.toISOString().split("T")[0]
            } else { body.bleed_end=date.toISOString().split("T")[0] }

            console.log(body)

            updatePeriod(state.token, body)
            .then( res => {
                if(res && res.status && (res.status == 403 || res.status == 400) ) {
                    console.log("Timed Out sign in again")
                    dispatcher(actions.setUser(null))
                    dispatcher(actions.setToken(null))
                    dispatcher(actions.setSignIn(false))
                    dispatcher(actions.setSharedUsers(null))
                    history.push("/Login")
                }
                else if (res && res.data && res.data.email) {
                    console.log(res)
                    dispatcher(actions.setUser(res.data))
                }else {
                    throw "error"
                }
            }).then(() => { setIsLoading(false) } )
            .catch(e => setIsLoading(false) )

        }else{
            setShow(false)
            setIsLoading(false)
        }

        
    }

    return (
        <>
            <Calendar
                    hideExtraDays={true}
                    theme={{
                        arrowColor: COLORS.MID_BLUE
                    }}
                    markedDates={markedDays}
                    markingType={'period'}
                    onDayLongPress={onDayLongPress}
            />
            {show&&(
                <DateTimePicker
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    value={selectedDate}
                    onChange={onChange}
                />
                )     
            }
        </>
    )


}

export default ChangePeriodPicker