import { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../../store/UserContext'
import * as actions from '../../../store/actions'

import { useHistory } from 'react-router-native'

import { getUserAsync } from '../../../backend_requests/user'
import { addDays } from '../SharedMethods'

export const useMenstrualData = () => {

    const [state, dispatcher] = useContext(UserContext)
    const [additionalInfo, setAdditionalInfo] = useState([])

    useEffect(() => {
        if(state.user){
            console.log(state.user)
            const newState = []
            if(state.user){
                state.user.cycle.map( (cycle) => {
                    return newState.push({
                        fertile_start:addDays(10, new Date(cycle.bleed_start)),
                        fertile_end:addDays(18, new Date(cycle.bleed_start)),
                        ovulation_date:addDays(14, new Date(cycle.bleed_start))
                    })
                })
                setAdditionalInfo(newState)
            }
        }
    }, [])

    return [additionalInfo, state.user.cycle]

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
                if(res){
                    dispatcher(actions.setUser(res))
                    if (res.cycle.length === 0){
                        history.push("/InitialForm")
                    }else{
                        setIsLoading(false)
                    }
                } 
                else { 
                    setIsLoading(false)
                    throw "Unable to fetch user"
                }
            }).catch(e => {history.push("/Login")})
        }else{
            setIsLoading(false)
        }
    }, [])

}