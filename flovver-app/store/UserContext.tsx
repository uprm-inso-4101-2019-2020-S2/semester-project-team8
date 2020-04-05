import React from 'react'

export const UserContext = React.createContext([]);

export interface Cycle {
    id: number,
    calendar_id: number,
    owner_id: number
    bleed_start: Date,
    bleed_end: Date,
    start_date: Date,
    end_date: Date
}

export interface User {
    id: number,
    email: string,
    cycle: Cycle
}

const UserProvider = ({children}) => {

    const [user, setUser] = React.useState()
    const [signedIn, setSignedIn] = React.useState(false)

    return (
        <UserContext.Provider value={[user, setUser, signedIn, setSignedIn]}  >
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider