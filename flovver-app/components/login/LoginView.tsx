import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import { LIGHT_GREY, PINK } from '../../styles/colors' 

import Loading from '../shared/Loading'
import SignInGoogle from './SignInGoogle'

const LoginView = ({isLoading, onPress}) => (
    !isLoading?(
        <View style={styles.container} >
                <Image 
                    resizeMode="contain"
                    style = {styles.image}
                    source={require('../../images/FlovverLogo.png')} />
                <SignInGoogle 
                    onPress={onPress}
                />
                <Text 
                    style={styles.consent}>
                    By signing up for Flovver you agree to our Terms of {"\n"} Service. 
                    Learn about how we process and use your data {"\n"} in our Privacy Policy 
                    and how we use cookies and {"\n"} similar technology in our Cookies Policy.
                </Text>
        </View>
    ):(
        <Loading />   
    )
)


const styles = StyleSheet.create({
    "container":{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        fontFamily:'Lato'
    },
    "image":{
        width: Dimensions.get("window").width * 0.7,
        height: 200
    },
    "consent":{
        textAlign:'center',
        fontSize:10,
        color:LIGHT_GREY,
        marginTop:8,
    }
})


export default LoginView