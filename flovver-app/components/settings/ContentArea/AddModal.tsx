import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image, Dimensions, TextInput, Alert } from 'react-native'
import * as COLORS from '../../../styles/colors'

import { HOST } from '../../../backend_requests/constants'

import UserItem from './AddModal/UserItem'

import { UserContext } from '../../../store/UserContext'

import axios from 'axios'
import Loading from '../../shared/Loading'

const AddModal = ({addModalVisible, styles, setAddModalVisible}) => {
    const [text, setText] = useState('SEARCH...')
    const [usersData, setUsersData] = useState([])
    const [state, dispatcher] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    
    // axios specific

    useEffect( () => {

        const CancelToken = axios.CancelToken;
        const call1 = CancelToken.source()

        const search = async () => {
            const axios_options = {
                headers:{ "Authorization":state.token },
                cancelToken:call1.token
            }
    
            await axios.get(HOST + "user/" + text,
                axios_options
            ).then(res => {
                if(res.status === 200) { 
                    setUsersData(res.data)
                }
            }).catch( thrown => {
                if(axios.isCancel(thrown)) { console.log("Request Cancelled") }
                else{setUsersData([])}
            })

        }

        search()

        return () => {
            call1.cancel
        }
        
    }, [text])

    useEffect(() => {
        if(addModalVisible){
            setText("SEARCH...")
        }
    }, [addModalVisible])

    useEffect(()=>{
        if(isLoading) { setText("SEARCH...") }
    }, [isLoading])

    // end axios specific
    if(isLoading) return <Loading isVisible={isLoading} />

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={addModalVisible}
    >
            <View style={[styles2.modalContainer]}>
                <View style={styles2.ListStyle}>
                    <Text style={[styles.modalTitleText, {textAlign:"center"} ]}>ADD USER</Text>
                    <TextInput 
                            style={[styles2.InputStyle, styles2.InputTextStyle]}
                            placeholder={text}
                            placeholderTextColor={COLORS.DARK_GREY}
                            maxLength={50} 
                            defaultValue=""
                            onChangeText={text => setText(text)}
                            onFocus={()=>{setText("")}}
                            value={text}
                            disableFullscreenUI={true}
                    />

                    <FlatList
                        style={{flex:1, marginTop:Dimensions.get("screen").height*0.01}}
                        data={usersData} 
                        renderItem={({ item }) => <UserItem key={item.id} id={item.id} image_url={item.image_url} email={item.email} 
                            setIsLoading={setIsLoading}
                        />}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {setAddModalVisible(!addModalVisible)}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>GO BACK</Text>
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
        flex:0.8
    },

    // ButtonBubble:{
    //     borderWidth: .5,
    //     borderRadius:100,
    //     padding:10,
    //     marginRight:10,
    //     alignItems:"center",
    //     justifyContent:"center"
    // },


})

export default AddModal