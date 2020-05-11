import React, {useState, useContext, useEffect} from 'react';
import * as Google from 'expo-google-app-auth'

import LoginView from './LoginView'
import {UserContext} from '../../store/UserContext'
import * as backend from '../../backend_requests/user'
import * as actions from '../../store/actions'

// smart component
const Login = ({history}) => {

    const [isLoading, setLoading] = useState(false)
    const [state, dispatcher] = useContext(UserContext)

    useEffect(() => {
        if (state.isSignedIn){
            history.push("/Home/Index")
        }
    }, [state.isSignedIn]) 

    const signIn = async () => {
        try {
            setLoading(true)
            const result = await Google.logInAsync({
              androidClientId: "716374017659-76kpha4mqm82083hj8krgea83e2d03oo.apps.googleusercontent.com",
              androidStandaloneAppClientId: "716374017659-2dcfq5mejhedsa26vji3skg5mi72e8dq.apps.googleusercontent.com",
              scopes: ["profile", "email"]
            })
            if (result.type === "cancel") {
                setLoading(false)
            }
            if(result.type === "success"){
                const token = await backend.getTokenAsync(result.idToken)
                if (token){
                    dispatcher(actions.setToken(token))
                    dispatcher(actions.setSignIn(true))
                }else{
                    dispatcher(actions.setSignIn(true))
                }
            }
        } catch (e) {
            // TODO: Show Error Modal or message
            console.log(e)
            setLoading(false)
        }
    } 

    return <LoginView isLoading={isLoading} onPress={signIn} />
    
};

export default Login;