import React from 'react'
import {View, StyleSheet} from 'react-native';
import { Route } from 'react-router-native';

import PeriodForm from './PeriodForm'
import DurationForm from './DurationForm'
import CycleForm from './CycleForm'




const InitialFormView = ({periodStart, setPeriodStart, 
    periodDuration, setPeriodDuration, 
    cycleLen, setCycleLen, sendInit}) => (
        <View style={styles.container} >
            
                <Route 
                    path = "/InitialForm/Period"
                    render={(props)=> <PeriodForm  
                        {...props}
                        onSubmit={setPeriodStart}
                        periodStart={periodStart}

                    /> }
                />
                <Route path="/InitialForm/Duration" 
                    render={(props) => <DurationForm 
                        {...props}
                        onSubmit={setPeriodDuration}
                        periodDuration={periodDuration}
                    />}
                />
                <Route 
                    path = "/InitialForm/CycleForm"
                    render={(props) => <CycleForm 
                        {...props}
                        onSubmit={setCycleLen}
                        cycleLen={cycleLen}
                        sendInit={sendInit}
                    />}
                /> 
            
        </View>
)


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"space-between",
        padding:30
    }

})


export default InitialFormView