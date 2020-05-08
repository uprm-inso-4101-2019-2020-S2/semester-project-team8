import { useEffect, useContext } from 'react'

import { UserContext } from '../../../store/UserContext'
import * as actions from '../../../store/actions'

import { useHistory } from 'react-router-native'

import { getUserAsync } from '../../../backend_requests/user'
import { addDays, diffDays } from '../SharedMethods'

export const useMenstrualData = () => {

    const [state, dispatcher] = useContext(UserContext)

    // useEffect(() => {
    //     if(state.user){
    //         if(state.user){
    //             dispatcher(actions.setUser(calcFertileList(state.user)))
    //         }
    //     }
    // }, []) 
 
    return [state.user.cycle, state.user.cycleInfo]

}


export const calcFertileList = (res) => {
    const newState = [];
    res.cycle.map( (cycle) => {
        newState.push({
            fertile_start:addDays(10, new Date(cycle.bleed_start)),
            fertile_end:addDays(16, new Date(cycle.bleed_start)),
            ovulation_date:addDays(diffDays(new Date(cycle.bleed_start), new Date(cycle.end_date))/2, new Date(cycle.bleed_start))
        })
    })
    return {
        ...res,
        cycleInfo:[...newState]
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
                if(res && res.status && res.status != 200){
                    setIsLoading(false)
                    throw "Timed out sign in again"
                }
                else if(res && res.data){
                    dispatcher(actions.setUser(res))
                    if (res.data.cycle.length === 0){
                        history.push("/InitialForm")
                    }else{
                        dispatcher(actions.setUser(res.data))
                        setIsLoading(false)
                    }
                } 
                else { 
                    setIsLoading(false)
                    throw "Unable to fetch user"
                }
            }).catch(e => {history.push("/Login")})
        }else{
            dispatcher(actions.setUser(state.user))
            setIsLoading(false)
        }
    }, [])

}
