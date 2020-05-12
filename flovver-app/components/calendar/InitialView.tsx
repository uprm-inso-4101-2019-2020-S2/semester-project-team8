import React, { useContext, useState, useEffect } from 'react'

import { UserContext } from '../../store/UserContext'
import moment from 'moment'
import * as COLORS from '../../styles/colors'

import { getMarkedDates } from './shared/calendarMethods'

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
        
        setMarkedDays(getMarkedDates(state.user.cycle, state.user.cycleInfo))
    
    }, [state.user])



    return(
  
            <View style={styles.container}>

                <TitleArea 
                    backAction={false}
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