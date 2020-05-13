import { useEffect, useContext } from 'react'
import {Alert} from 'react-native'

import { UserContext } from '../../../store/UserContext'
import * as actions from '../../../store/actions'

import { useHistory } from 'react-router-native'

import { getUserAsync } from '../../../backend_requests/user'
import { addDays, diffDays } from '../SharedMethods'



export const useMenstrualData = () => {

    const [state, dispatcher] = useContext(UserContext)

 
    return [state.user.cycle, state.user.cycleInfo]

}

export const calcFertileListHelper = (cycles) => {

    const newState = [];
    cycles.map( (cycle) => {



        newState.push({
            fertile_start:addDays(10, new Date(cycle.bleed_start)),
            fertile_end:addDays(16, new Date(cycle.bleed_start)),
            ovulation_date:addDays(diffDays(new Date(cycle.bleed_start), new Date(cycle.end_date))/2, new Date(cycle.bleed_start))
        })
    })
    return newState

}

export const calcFertileList = (res) => {
    
    return {
        ...res,
        cycleInfo:[...calcFertileListHelper(res.cycle)]
    }
}


// Custom hook to tell tell when user has been fetched from backend 
// Think of adding last updated field to state to see if you have to update user again 
export const useUser = (isLoading, setIsLoading) => {
    
    const [state, dispatcher] = useContext(UserContext)
    const history = useHistory()

    useEffect(()=>{
        setIsLoading(true)
        if(!state.token) {
            dispatcher(actions.setSignIn(false))
            setIsLoading(false)
            history.push("/Login")
        }
        else if(!state.user){
            getUserAsync(state.token)
            .then(res => {
                if(res && res.data && res.status === 200){
                    dispatcher(actions.setUser(res.data))
                    if (res.data.cycle.length === 0){
                        history.push("/InitialForm")
                    }else{
                        dispatcher(actions.setUser(res.data))
                        setIsLoading(false)
                    }
                } 
            }).catch(e => {
                if(e.response && e.response.status && 
                    (e.response.status === 403 || e.response.status === 401 || e.response.status === 400)){
                    dispatcher(actions.setUser(null))
                    dispatcher(actions.setToken(null))
                    dispatcher(actions.setSignIn(false))
                    dispatcher(actions.setSharedUsers([]))
                    Alert.alert("Timed out, please sign in again")
                }
                else { 
                    setIsLoading(false)
                    Alert.alert("Unable to fetch user")
                }
                history.push("/Login")

            })
        }else{
            dispatcher(actions.setUser(state.user))
            setIsLoading(false)
        }
    }, [])

}
