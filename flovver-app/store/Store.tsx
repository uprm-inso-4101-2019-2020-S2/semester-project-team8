import React from 'react'

import UserProvider from  './UserContext'



const Store = ({children}) => (
    <UserProvider> 
        {children}
    </UserProvider>
)


export default Store