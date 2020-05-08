import React, {useState, useEffect, useContext} from 'react';

import { UserContext } from '../../store/UserContext'
import * as actions from '../../store/actions'

import { menstrualInit } from '../../backend_requests/user'

import InitialFormView from './InitialFormView'
import Loading from '../shared/Loading'

// Smart Component
const InitialForm = ( { history } ) => {

    const [userType, setUserType] = useState("regular")
    const [periodStart, setPeriodStart] = useState(new Date())
    const [periodDuration, setPeriodDuration] = useState("5")
    const [cycleLen, setCycleLen] = useState("28")
    const [isLoading, setIsLoading] = useState(false)
    
    const [state, dispatcher] = useContext(UserContext)
   
    useEffect(() => { 
        console.log(state)
        history.push("/InitialForm/UserType")
    }, [])

    const sendInit = async () => {
        setIsLoading(true)
        menstrualInit(state.token, {
            bleed_start: periodStart.toISOString().split("T")[0],
            bleed_duration:parseInt(periodDuration),
            cycle_duration:parseInt(cycleLen)
        }).then(res => {
            if(res && res.status != 400){
                dispatcher(actions.setUser(res.data));
                history.push("/Home/Index")
            }
            else{ throw "An error ocurred" } 
        }).catch(e => {})
    }

    if (isLoading) {
        return <Loading isVisible={isLoading}/>
    }

    return (<InitialFormView 
            periodStart={periodStart}
            setPeriodStart={setPeriodStart}
            periodDuration={periodDuration}
            setPeriodDuration={setPeriodDuration}
            cycleLen={cycleLen}
            setCycleLen={setCycleLen}
            sendInit={sendInit}
            userType={userType}
            setUserType={setUserType}
        />)
}


export default InitialForm