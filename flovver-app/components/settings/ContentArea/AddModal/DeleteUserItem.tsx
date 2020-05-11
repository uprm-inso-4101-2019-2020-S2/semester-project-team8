import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'

import { useHistory } from 'react-router-native' 
import  axios from 'axios'

import * as COLORS from '../../../../styles/colors'
import * as actions from '../../../../store/actions'
import { UserContext } from '../../../../store/UserContext'
import { HOST } from '../../../../backend_requests/constants'

const DeleteUserItem = ({id, email, image_url, setIsLoading, setUsersData}) => {

    const [state, dispatcher] = useContext(UserContext)

    const history = useHistory()

    const onPress = () => {
        setIsLoading(true)
        axios.delete(HOST + "shared_users/revoke/" + id,
            { headers: { "Authorization":state.token } }
        ).then(res => {
            if(res && res.status && res.status === 200){
                setUsersData(res.data)
            }
            setIsLoading(false)
        })
        .catch(e => {
            if(e.status === 403 || e.status === 401){
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSignIn(false))
                history.push("/Login") 
            }else{
                Alert.alert("Error deleting record")
            }
        })
    }

    return (
        <View style={styles.container} 
        >
            <Image 
                source={{uri:image_url}}
                style={styles.ImageStyle} />
            <Text style={styles.text}>{email}</Text>
            <TouchableOpacity
                onPress={onPress}
            >
            <Image 
                style={{height:20, width:20}}
                source={require('../../../../images/Delete.png')}/>
            </TouchableOpacity>
        </View> 
    )

}

export default DeleteUserItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        marginBottom:10
    },

    ImageStyle:{
        borderRadius:200,
        height:50,
        width:50,
        marginRight:20,
        backgroundColor:COLORS.PINK
    },

    text:{
        alignItems:"center",
        marginRight:20
    }
})