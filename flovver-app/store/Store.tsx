import React from 'react'

import UserProvider from  './UserContext'
import SharedUserProvider from './SharedUserContext'



const Store = ({children}) => (
    <UserProvider> 
        <SharedUserProvider>
            {children}
        </SharedUserProvider>
    </UserProvider>
)


export default Store