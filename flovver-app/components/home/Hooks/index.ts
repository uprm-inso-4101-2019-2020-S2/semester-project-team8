import React, { useState, useEffect, useContext, Dispatch, SetStateAction} from 'react'
import { useHistory } from 'react-router-native'

import { UserContext } from '../../../store/UserContext'
import * as actions from '../../../store/actions'
import { getUserAsync } from '../../../backend_requests/user'

// Custom hook to tell tell when user has been fetched from backend 
export const useUser = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [state, dispatcher] = useContext(UserContext)
    const history = useHistory()

    useEffect(()=>{
        if(!state.token) {
            dispatcher(actions.setSignIn(false))
            history.push("/Login")
        }
        if(!state.user){
            setIsLoading(true)
            getUserAsync(state.token)
            .then(res => {
                if(res){
                    dispatcher(actions.setUser(res))
                    if (res.cycle.length === 0){
                        setIsLoading(false)
                        history.push("/InitialForm")
                    }else{
                        setIsLoading(false)
                    }
                } 
                else { 
                    setIsLoading(false)
                    throw "Unable to fetch user"
                }
            })
        }
    }, [])
    
    return isLoading

}