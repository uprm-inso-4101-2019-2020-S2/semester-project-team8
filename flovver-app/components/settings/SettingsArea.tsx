import React, {useState} from 'react'
import BackArrow from '../initial_forms/Shared/BackArrow'
import { Text, View, StyleSheet, Image, Dimensions, 
        Switch, Button, TouchableOpacity, Modal } from 'react-native';
import * as COLORS from '../../styles/colors'

const SettingsArea = ({history}) => {
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View>
            <View>
                <View>
                    <BackArrow onPress={()=>{history.push("/Home/HomeArea")}} />
                </View>
                <Text style={styles.title}>SETTINGS</Text>
            </View>
            <View>
                <Text style={styles.textStyle} >NOTIFICATIONS</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {setModalVisible(true)}}
                >
                    <Text style={styles.textStyle} >CHANGE USER TYPE</Text>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <Text style={styles.textStyle}>What type of user would you like to be?</Text>
                        <TouchableOpacity
                            onPress={() => {console.log("Hello World")}}
                        >
                            <Text style={styles.textStyle}>View-Only</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {console.log("Hello World")}}
                        >
                            <Text style={styles.textStyle}>Regular</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {setModalVisible(!modalVisible)}}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </Modal>
                </TouchableOpacity>
            </View> 
            <View>
                <TouchableOpacity
                    onPress={() => {setModalVisible(true)}}
                >
                    <Text style={styles.textStyle}>LOG OUT</Text>
                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <Text style={styles.textStyle}>Are you sure you want to log out?</Text>
                        <TouchableOpacity
                            onPress={() => {console.log("Hello World")}}
                        >
                            <Text style={styles.textStyle}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {setModalVisible(!modalVisible)}}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </Modal>
                </TouchableOpacity>
            </View>
            <Text> VERSION 0.0.1 </Text>
        </View>

        
    )
}

const styles = StyleSheet.create({

    title:{
        fontFamily:"lato-black",
        color:COLORS.DARK_GREY,
        fontSize:15
    },
    
    textStyle:{

    },

    switch:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    modal:{
        margin: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        //shadowOffset:''
        width: 0,
        height: 2
    }
 
 })

export default SettingsArea
