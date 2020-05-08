import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { UserContext } from '../../../store/UserContext' 
import DateTimePicker from '@react-native-community/datetimepicker';

import ButtonNoBorder from '../Shared/ButtonNoBorder'

import { getAcronDateShort } from '../../shared/SharedMethods'

import * as requests from '../../../backend_requests/user'
import * as actions from '../../../store/actions'

import {useHistory} from 'react-router-native'

import {useMenstrualData} from '../../shared/Hooks'

import moment from 'moment'

const InfoArea = ({ ovulation, fertile, isFertile, setIsLoading }) => {
        
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [state, dispatcher] = useContext(UserContext)

    const history = useHistory()

    const selectId = (date:Date) => {

        const pt = 0.70 

        let m = moment.utc(date.toISOString())
        
        let m1 = moment.utc(state.user.cycle[1].bleed_start).add(state.user.cycle_avg*pt, 'days')

        return m.isAfter(m1)? state.user.cycle[0].id : state.user.cycle[1].id

    }

    const onChange = (event, date:Date) => {
        
        setShow(false)
        
        const currentDate = date  || selectedDate;

        if (currentDate == selectedDate) {setIsLoading(false); return;}

        setIsLoading(true)

        let t_id = selectId(date) 

        requests.addPeriod(state.token, {
            bleed_start:date.toISOString().split("T")[0],
            cycle_id:t_id
        }).then( res => {
            console.log(res)
            if(res && res.status && (res.status == 403 || res.status==401 || res.status == 400) ){
                console.log("Timed Out sign in again")
                    dispatcher(actions.setUser(null))
                    dispatcher(actions.setToken(null))
                    dispatcher(actions.setSignIn(false))
                    dispatcher(actions.setSharedUsers(null))
                    history.push("/Login")
            }else if(res && res.status != 500 && res.data){
                    dispatcher(actions.setUser(res.data))
            }else{
                throw "No internet or internal server eroror"
            }
        }).then(()=>{setIsLoading(false)})
        .catch(e => {console.log(e); setIsLoading(false)})

    }

    return( 
        <View style={styles.Events}> 
            
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
                maximumDate={new Date()}
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