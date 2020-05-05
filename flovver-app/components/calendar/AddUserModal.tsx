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
                <View style={[styles.ContentContainer]}>

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
                        <View style={styles.ButtonBubble}>
                            <TouchableOpacity
                                onPress={() => {console.log("user added :)")}}
                                // if user exists, return "User added.",
                                // else if user already added, return "User already added.",
                                // else, return "User does not exist."
                            >
                                <Text style={styles.textStyle}>ADD USER</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ButtonBubble}>
                            <TouchableOpacity
                                onPress={() => {setAddUserModalVisible(!addUserModalVisible)}}
                            >
                                <Text style={styles.textStyle}>GO BACK</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: COLORS.WHITE,
        elevation:10,
    },

    ContentContainer:{

    },

    InputContainer:{

    },

    ButtonsContainer:{
        flex:1,
        flexDirection:"row"
    },

    ButtonBubble:{
        borderWidth: .5,
    },

    textStyle:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:10,
        letterSpacing: 4,
    },

    InputTextStyle:{
        fontFamily:"lato-regular",
        color:COLORS.WHITE,
        fontSize:10,
        letterSpacing: 4,
    },

    InputStyle:{
        backgroundColor:COLORS.MID_BLUE,

    },

 
})


export default AddUserModal