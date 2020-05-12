import React, { useState, useContext } from 'react'

import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native'

import * as COLORS from '../../../styles/colors'

import { UserContext } from '../../../store/UserContext'

import { HOST } from '../../../backend_requests/constants'

import * as actions from '../../../store/actions'

import Loading from '../../shared/Loading'

import Axios from 'axios'

import { useHistory } from 'react-router-native'

const RemoveUserButton = ( {record_id, setIsVisible} ) => {

    const history = useHistory()
    const [loading, setIsLoading] = useState(false)
    const [state, dispatcher] = useContext(UserContext)

    const onPress = () => {
        setIsLoading(true)

        Axios.delete(HOST + "shared_users/revoke_me/"+record_id, {
            headers:{ "Authorization":state.token }
        }).then(res => {
            if(res.status === 200){
                dispatcher(actions.setSharedUsers(res.data))
            }
        }).catch( e => {
            if(e.status === 401 || e.status === 403){
                dispatcher(actions.setSignIn(false))
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSharedUsers([]))
                Alert.alert("Your session has expired")
                history.push("/Login")
            }else{
                Alert.alert("An error has ocurred verify that you have internet")
            }
        })

    }

    if(loading) return <Loading isVisible={loading}/>

    return(
        <View style={styles.buttonContainer} >
            <TouchableOpacity 
                onPress={onPress}
            style={styles.buttonStyle} >
                <Text style={styles.buttonText} >REMOVE USER</Text>
                <Image 
                    style={styles.iconStyle}
                    source={require('../../../images/Trash.png')}
                />
            </TouchableOpacity>
        </View>
    )
    
}

export default RemoveUserButton

const styles = StyleSheet.create({
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:0,
        left:Dimensions.get("screen").width * 0.35,
        top:Dimensions.get("screen").height * 0.6
    },

    buttonStyle:{
        flexDirection:"row",
        borderRadius:100,
        borderWidth:0.1,
        padding:10,
        backgroundColor:COLORS.PINK
    },

    iconStyle:{
        height:20,
        width:20
    },

    buttonText:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        marginTop:3
    }

})