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

    const [user, setUser] = React.useState({
        email:"test@test.com",
        id:5,
        cycle:[
            {
                "bleed_start":Date(),
                "bleed_end":Date(),
                "start_date":Date(),
                "end_date":Date(),
                "id":1
            },
            {
                "bleed_start":Date(),
                "bleed_end":Date(),
                "start_date":Date(),
                "end_date":Date(),
                "id":2
            }
        ]
    })
    const [signedIn, setSignedIn] = React.useState(false)
    const [token, setToken] = React.useState("")

    // In useEffect:

        // Verify if user is in secure store

        // if user is in secure store and there is no internet setUser and setSignedIn

        // If not check if token is in secure store 

        // get User from server and setUser, setToken, setSignedIn

        // If not in secure store leave everything with default values

    return (
        <UserContext.Provider value={[signedIn, setSignedIn, user, setUser]}  >
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider