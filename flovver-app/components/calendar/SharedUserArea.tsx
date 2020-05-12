import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'

import * as COLORS from '../../styles/colors'

import AddUserButton from './SharedUserArea/AddUserButton'

import SharedTitleArea from './SharedUserArea/SharedTitleArea'
import SharedUserItem from './SharedUserArea/SharedUserItem'
import AddButton from './SharedUserArea/AddButton'
import Axios from 'axios'
import { HOST } from '../../backend_requests/constants'
import {UserContext} from '../../store/UserContext'
import * as actions from '../../store/actions'
import { useHistory } from 'react-router-native'


const SharedUserArea = () => {

    const [ addVisible, setAddVisible ] = useState(false)
    const [ state, dispatcher ] = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        
        Axios.get(HOST + "shared_users/accessible",
        { headers:{ "Authorization":state.token } }
        ).then(res => {
            if(res.status === 200){
                dispatcher(actions.setSharedUsers(res.data))
            }
        }).catch(e => {
            if(e.status && e.status === 401 || e.status === 403){
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSignIn(false))
                history.push("/Login")
            }else{
                Alert.alert("Error ocurred when fetching users")
            }
        })

    }, [addVisible])


    return(
        <View style={styles.SharedContainer} >
                    
            <SharedTitleArea />

            <FlatList 
                style={styles.FlatListStyle}
                data={state.sharedUsers}
                renderItem={({item}) => (
                    <SharedUserItem 
                        email={item.email} 
                        id={item.id} 
                        image_url={item.image_url}
                        whiteFont={true}    
                        onPress={()=>{console.log("Hello")}}
                    />
                )}
            />    

            <AddButton setAddVisible={setAddVisible} />     
                
            <AddUserButton 
                addUserButtonModalVisible={addVisible}
                setAddUserButtonModalVisible={setAddVisible}
            />
        </View>
    )
}

export default SharedUserArea

const styles = StyleSheet.create({
    
    SharedContainer:{
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        flex:3,
        backgroundColor:COLORS.MID_BLUE,
        alignItems:"center",
        justifyContent:"center",
        paddingTop:30
    },

    Image: {
        borderRadius:100,
        backgroundColor:COLORS.PINK,
        height:50,
        width:50,
        position:"relative",
        top:10
    },

    
    FlatListStyle:{
        width:Dimensions.get("screen").width*0.90,
        alignSelf:"center", 
        position:"relative",
        top:100
    }

})