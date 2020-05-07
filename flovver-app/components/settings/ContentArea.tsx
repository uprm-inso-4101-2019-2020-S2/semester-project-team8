import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Modal, Switch, StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../styles/colors'
import UserTypeModal from './ContentArea/UserTypeModal';
import LogOutModal from './ContentArea/LogOutModal';
import PermissionsModal from './ContentArea/PermissionsModal';
import AddModal from './ContentArea/AddModal';

const ContentArea = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [changeUserTypeModalVisible, setChangeUserTypeModalVisible] = useState(false);
    const [logOutModalVisible, setLogOutModalVisible] = useState(false)
    const [permissionsModalVisible, setPermissionsModalVisible] = useState(false)
    const [addModalVisible, setAddModalVisible] = useState(false)

    return (
        <View style={styles.ContentContainer}>
            <View style={[styles.Items, styles.NotificationContainer]} >
                <Text style={styles.textStyle} >NOTIFICATIONS</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    trackColor={{ false: COLORS.LIGHT_GREY, true: COLORS.PINK }}
                    thumbColor={isEnabled ? COLORS.PINK : COLORS.LIGHT_GREY}
                />
            </View>
            <View style={[styles.Items]} >
                <TouchableOpacity
                    onPress={() => {setChangeUserTypeModalVisible(true)}}
                >
                    <Text style={styles.textStyle} >CHANGE USER TYPE</Text>
                    <UserTypeModal 
                        styles={styles}
                        changeUserTypeModalVisible={changeUserTypeModalVisible}
                        setChangeUserTypeModalVisible={setChangeUserTypeModalVisible}
                    />
                </TouchableOpacity>
            </View> 
            <View style={[styles.Items]}>
                <TouchableOpacity
                    onPress={() => {setAddModalVisible(true)}}
                >
                    <Text style={styles.textStyle}>ADD USER CALENDARS</Text>
                    <AddModal 
                        styles={styles}
                        addModalVisible={addModalVisible}
                        setAddModalVisible={setAddModalVisible}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.Items]}>
                <TouchableOpacity
                    onPress={() => {setPermissionsModalVisible(true)}}
                >
                    <Text style={styles.textStyle}>MANAGE CALENDAR PERMISSIONS</Text>
                    <PermissionsModal 
                        styles={styles}
                        permissionsModalVisible={permissionsModalVisible}
                        setPermissionsModalVisible={setPermissionsModalVisible}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.Items]}>
                <TouchableOpacity
                    onPress={() => {setLogOutModalVisible(true)}}
                >
                    <Text style={styles.textStyle}>LOG OUT</Text>
                    <LogOutModal 
                        styles={styles}
                        logOutModalVisible={logOutModalVisible}
                        setLogOutModalVisible={setLogOutModalVisible}
                    />
                </TouchableOpacity>
                <View style={styles.VersionContainer}>
                    <Text style={[styles.VersionTextStyle]}>VERSION 0.0.1</Text>
                </View>
            </View>
        </View>
    )
}

export default ContentArea


const styles = StyleSheet.create({
    
    textStyle:{
        fontSize:16,
        letterSpacing:2,
        marginTop:10,
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY
    },

    switch:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    modalText:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:10,
        letterSpacing: 4,
        textAlign:"center",
        paddingTop:10
    },

    modalTitleText:{
        fontSize:20,
        color:COLORS.DARK_GREY,
        marginBottom:20
    },
    
    modalContainer:{
        margin: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 30,
        justifyContent:"center",
        alignItems: "center",
        elevation:10,
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