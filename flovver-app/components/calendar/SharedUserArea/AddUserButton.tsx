import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image, Dimensions, TextInput, Alert } from 'react-native'
import * as COLORS from '../../../styles/colors'

import { HOST } from '../../../backend_requests/constants'

import DeleteUserItem from '../../settings/ContentArea/AddModal/DeleteUserItem'

import { UserContext } from '../../../store/UserContext'

import { useHistory } from 'react-router-native'

import * as actions from '../../../store/actions'

import axios from 'axios'
import Loading from '../../shared/Loading'
import SharedUserItem from './SharedUserItem'

const AddUserButton = ({addUserButtonModalVisible, setAddUserButtonModalVisible }) => {
    const [usersData, setUsersData] = useState([])
    const [state, dispatcher] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    // axios specific

    useEffect(() => {

        axios.get(HOST + "shared_users/unapproved", { headers:{ "Authorization":state.token } }) 
        .then(res => {
            if (res.status && res.status === 401 || res.status === 403){
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSignIn(false))
                history.push("/Login")  
            }else if(res.status === 200 ){
                console.log(res.data)
                setUsersData(res.data)
            }
        }).catch(e => {
            if (e.response && e.status && e.status === 401 || e.status === 403){
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSignIn(false))
                history.push("/Login")  
            }
            console.log(e.response)
            Alert.alert("Error ocurred when fetching users with access to your calendar ")
        })

    }, [addUserButtonModalVisible])

    // end axios specific

    const addUser = (id) => {

        axios.post(HOST + "shared_users/approve/" + id,{},
            { headers:{ "Authorization":state.token } }
        ).then(res => {
            setIsLoading(true)
            if (res.status && res.status === 401 || res.status === 403){
                dispatcher(actions.setUser(null))
                dispatcher(actions.setToken(null))
                dispatcher(actions.setSignIn(false))
                history.push("/Login")  
            }else if(res.status === 200 ){
                dispatcher(actions.setSharedUsers(res.data))
                setAddUserButtonModalVisible(false)
            }
            setIsLoading(false)
        })
            .catch(e => {
                if (e.response && e.status && e.status === 401 || e.status === 403){
                    dispatcher(actions.setUser(null))
                    dispatcher(actions.setToken(null))
                    dispatcher(actions.setSignIn(false))
                    history.push("/Login")  
                }
                console.log(e.response)
                Alert.alert("Error ocurred when adding ")
            })

    }


    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={addUserButtonModalVisible}
    >
        <Loading isVisible={isLoading} />
            <View style={[styles2.modalContainer]}>
                <View style={styles2.ListStyle}>
                <Text style={[styles2.modalTitleText, {textAlign:"center"} ]}>UNAPPROVED REQUESTS</Text>
                    <FlatList
                        style={{flex:1, marginTop:Dimensions.get("screen").height*0.01}}
                        data={usersData}
                        renderItem={({ item }) => <SharedUserItem 
                        whiteFont={false}
                        key={item.id} id={item.id} image_url={item.image_url} email={item.email} 
                            onPress={()=>{addUser(item.id)}}
                        />}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {setAddUserButtonModalVisible(!addUserButtonModalVisible)}}
                >
                    <Text style={[styles2.modalText, styles2.textStyle]}>GO BACK</Text>
                </TouchableOpacity>
            </View>
    </Modal>)
}

const styles2 = StyleSheet.create({
    
    InputTextStyle:{
        fontFamily:"lato-regular",
        color:COLORS.WHITE,
        fontSize:10,
        letterSpacing: 4,
        textAlign:"center",
        borderRadius:100,
        padding:6,

    },

    InputStyle:{
        backgroundColor:COLORS.MID_BLUE,
        width:Dimensions.get("screen").width *0.65
    },

    input:{
        backgroundColor:COLORS.MID_BLUE
    },

    ListStyle:{
        marginVertical:10,

    },

    FlatListView:{
        
    },

    modalText:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:10,
        letterSpacing: 4,
        textAlign:"center",
        paddingTop:10,
    },

    textStyle:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:12,
        letterSpacing: 4,
    },

    modalContainer:{
        margin: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 50,
        justifyContent:"space-evenly",
        alignItems: "center",
        elevation:10,
        flex:0.8,
        
    },

    

    switch:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },


    modalTitleText:{
        fontSize:20,
        color:COLORS.DARK_GREY,
        marginBottom:20
    },
    
    

    container:{
        padding: 10,
        flex:1,
        backgroundColor: COLORS.PEARL_WHITE
    },


    NotificationContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:30        
    },

    VersionContainer:{
        position:"absolute",
        left:Dimensions.get("screen").width * 0.35,
        top:Dimensions.get("screen").height * 0.70
    },

    VersionTextStyle:{
        fontFamily:"lato-regular",
        textAlign:"center",
        fontSize:10,
        letterSpacing: 2,
        color:COLORS.LIGHT_GREY
    },

    Items:{
        paddingTop:20
    },

    ContentContainer:{
        padding: 10
    },

})

export default AddUserButton