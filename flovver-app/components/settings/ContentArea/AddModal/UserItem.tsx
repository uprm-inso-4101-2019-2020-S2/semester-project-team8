import React, { useContext } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import * as COLORS from '../../../../styles/colors'
import * as requests from '../../../../backend_requests/user' 
import { UserContext } from '../../../../store/UserContext'
import * as actions from '../../../../store/actions'
import { useHistory } from 'react-router-native'

const UserItem = ({id, email, image_url, setIsLoading}) => {

    const [state, dispatcher] = useContext(UserContext)
    const history = useHistory()

    const addUser = async () => {
        setIsLoading(true)
        requests.addSharedUser(state.token, id)
        .then(res => {
            if(res && res.status && res.status === 200){
                Alert.alert("Added successfully")
            }
            setIsLoading(false)
        })
        .catch(e => {
            if(e.response && e.response.status && 
                (e.response.status === 403 || e.response.status === 401 || e.response.status === 400)){
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSignIn(false))
                dispatcher(actions.setSharedUsers([]))
                Alert.alert("Error adding this user")
            }
            else{
                setIsLoading(false)
                Alert.alert("Timed out, please sign in again")
            }
            history.push("/Login")
        })
    }

    return (
        <TouchableOpacity style={styles.container} 
        onPress={addUser}
        >
        <Image 
            source={{uri:image_url}}
            style={styles.ImageStyle} />
        <Text style={styles.text}>{email}</Text>
        <Image 
            style={{ transform:[{rotate: '45deg'}], height:15, width:15 }}
            source={require('../../../../images/Delete.png')}/>
        </TouchableOpacity> 
    )

}

export default UserItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        paddingTop:10
    },

    ImageStyle:{
        borderRadius:200,
        height:50,
        width:50,
        backgroundColor:COLORS.PINK
    },

    text:{
        alignItems:"center"
    }
})