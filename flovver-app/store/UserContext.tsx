import React from 'react'
import reducer from './reducers/user_reducer'

export const UserContext = React.createContext([]);

const UserProvider = ({children}) => {

    const [state, dispatcher] = React.useReducer(reducer, {
        user:null,
        token:null,
        isSignedIn:false,
        sharedUsers:[],
        sharedUserCycles:[]
    })

    // In useEffect:

        // Verify if user is in secure store

        // if user is in secure store and there is no internet setUser and setSignedIn

        // If not check if token is in secure store 

        // get User from server and setUser, setToken, setSignedIn

        // If not in secure store leave everything with default values

    return (
        <UserContext.Provider value={[state, dispatcher]}  >
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider