import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native'
import * as COLORS from '../../styles/colors'

const AddUserModal = ({addUserModalVisible, setAddUserModalVisible, }) => {

    const [textValue, setTextValue] = useState('SEARCH...')
    const [userExists, setUserExists] = useState(false) // expected to be used to test if user exists
    
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={addUserModalVisible}
        >
            <View style={styles.container}>
                <View style={[styles.modalContainer]}>

                    <View style={styles.InputContainer}>
                        <TextInput 
                            style={[styles.InputStyle, styles.InputTextStyle]}
                            placeholder={textValue}
                            placeholderTextColor={COLORS.DARK_GREY}
                            maxLength={50} 
                            defaultValue=""
                            onChangeText={text => setTextValue(text)}
                            value={textValue}
                        />
                    </View>

                    <View style={styles.ButtonsContainer}>
                        
                            <TouchableOpacity
                                style={styles.ButtonBubble}
                                onPress={() => {console.log("user added :)")}}
                                // if user exists, return "User added.",
                                // else if user already added, return "User already added.",
                                // else, return "User does not exist."
                            >
                                <Text style={styles.textStyle}>ADD USER</Text>
                            </TouchableOpacity>
                        
                        
                            <TouchableOpacity
                                onPress={() => {setAddUserModalVisible(!addUserModalVisible)}}
                                style={styles.ButtonBubble}
                            >
                                <Text style={styles.textStyle}>GO BACK</Text>
                            </TouchableOpacity>
                        
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({ 
   

    container:{
        alignItems:"center",
        justifyContent:"center", 
        flex:1,
    },

    ContentContainer:{
        borderRadius:60,
        flex:1
    },

    InputContainer:{

    },

    ButtonsContainer:{
        padding:10,
        flexDirection:"row",
        alignSelf:"flex-end",
        
    },

    ButtonBubble:{
        borderWidth: .5,
        borderRadius:100,
        padding:10,
        marginRight:10
    },

    textStyle:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:12,
        letterSpacing: 4,
    },

    InputTextStyle:{
        fontFamily:"lato-regular",
        color:COLORS.WHITE,
        fontSize:10,
        letterSpacing: 4,
        textAlign:"center",
        borderRadius:100,
        padding:6
    },

    InputStyle:{
        backgroundColor:COLORS.MID_BLUE,
        width:150
    },

    modalContainer:{
        margin: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 30,
        justifyContent:"center",
        alignItems: "center",
        elevation:10,
        flex:0.3
    },


 
})


export default AddUserModal