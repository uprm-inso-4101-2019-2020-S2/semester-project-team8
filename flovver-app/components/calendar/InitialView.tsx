import React, { useContext, useState, useEffect } from 'react'

import { UserContext } from '../../store/UserContext'
import moment from 'moment'
import * as COLORS from '../../styles/colors'

import { View, StyleSheet } from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';

import TitleArea from '../settings/TitleArea';
import ContentArea from './ContentArea';
import SharedUserArea from './SharedUserArea';
import SharedTitleArea from './SharedUserArea/SharedTitleArea';

const InitialView = ({history}) => {
    
    const [state] = useContext(UserContext)
    const [markedDays, setMarkedDays] = useState({})


    useEffect(() => {
        const markedDates = {}
        state.user.cycle.map((cycle)=>{
            
            let sd = new Date(cycle.bleed_start)
            let ed = new Date(cycle.bleed_end)

            for(let i = new Date(sd); i <= new Date(ed); i.setDate(i.getDate() + 1)){
                // TODO: MAKE ROUUUUUUUUUND!!!
                if(i.getDate() === sd.getDate()){
                    markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                        color:COLORS.PINK,
                        startingDay: true
                    }
                }
                else if(i.getDate() === ed.getDate()){
                    markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                        color:COLORS.PINK,
                        endingDay:true
                    }
                }else{
                    markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                        color:COLORS.PINK,
                    }
                }
                
            }
            
        })

        state.user.cycleInfo.map((info)=>{
            const sd = new Date(info.fertile_start)
            const ed = new Date(info.fertile_end)

            for(let i = new Date(sd); i <= new Date(ed); i.setDate(i.getDate() + 1)){
                // TODO: MAKE ROUUUUUUUUUND!!!
                if(i.getDate() === sd.getDate()){
                    markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                        color:COLORS.YELLOW,
                        startingDay: true
                    }
                }
                else if(i.getDate() === ed.getDate()){
                    markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                        color:COLORS.YELLOW,
                        endingDay:true
                    }
                }else{
                    markedDates[moment.utc(i.toISOString()).format("YYYY-MM-DD")] = {
                        color:COLORS.YELLOW,
                    }
                }
                
            }
            markedDates[moment.utc(info.ovulation_date.toISOString()).format("YYYY-MM-DD")] = {
                ...markedDates[moment.utc(info.ovulation_date.toISOString()).format("YYYY-MM-DD")],
                color:COLORS.ORANGE,

            }
        })
  
        setMarkedDays(markedDates)
    }, [state.user])



    return(
  
            <View style={styles.container}>

                <TitleArea 
                    title={"CALENDAR"}
                    history={history} />

                <ContentArea markedDays={markedDays} />

                <SwipeUpDown 
                    itemFull={<SharedUserArea/>}
                    itemMini={<View style={{alignItems:"center"}}>
                        <SharedTitleArea />
                    </View>}
                    swipeHeight={100}
                    style={{
                        backgroundColor:COLORS.MID_BLUE,
                        height:60,
                    }}
                    SWIPE_HEIGHT={100}
                    />

                {/* <SharedUserArea /> */}
               
            </View>

    )
}


export default InitialView


const styles = StyleSheet.create({
    
    container:{
        flex:1,
        justifyContent:"flex-start",
        alignItems:"stretch",
        backgroundColor:COLORS.PEARL_WHITE
    }

})