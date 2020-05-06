import React, {createContext, useReducer, useState} from 'react'
import reducer from './reducers/shared_user_reducer'

export const SharedUserContext = createContext({})


const SharedUserProvider = ({ children }) => {

    const [state, dispatcher] = useReducer(reducer, {
        users:[],
        cycles:[]
    })

    return (
        <SharedUserContext.Provider value={[state, dispatcher]} >
            {children}
        </SharedUserContext.Provider>
    )
}

export default SharedUserProvider