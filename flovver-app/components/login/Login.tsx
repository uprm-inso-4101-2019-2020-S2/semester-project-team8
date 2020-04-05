import React, {useState, useContext, useEffect} from 'react';
import * as Google from 'expo-google-app-auth'

import LoginView from './LoginView'
import {UserContext} from '../../store/UserContext'

const Login = ({history}) => {

    const [isLoading, setLoading] = useState(false)
    const [signedIn, setSignedIn] = useContext(UserContext)

    useEffect(() => {
        if (signedIn){
            history.push("/InitialForm/")
        }
    }, [signedIn]) 

    const signIn = async () => {
        try {
            setLoading(true)
            const result = await Google.logInAsync({
              androidClientId: "716374017659-76kpha4mqm82083hj8krgea83e2d03oo.apps.googleusercontent.com",
              //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
              scopes: ["profile", "email"]
            })
            if (result.type === "cancel") {
                setLoading(false)
            }
            if(result.type === "success"){
                console.log(result)
                setSignedIn(true)
                setLoading(false)
            }
        } catch (e) {
            // TODO: Show Error Modal or message
            setLoading(false)
        }
    } 

    return <LoginView isLoading={isLoading} onPress={signIn} />
    
};

export default Login;