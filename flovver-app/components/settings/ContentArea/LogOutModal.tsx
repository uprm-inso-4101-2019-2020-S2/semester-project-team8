import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'


const LogOutModal = ({logOutModalVisible, styles, setLogOutModalVisible}) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={logOutModalVisible}
    >
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
            <View style={[styles.modalContainer]}>
                <Text style={[styles.modalText, styles.textStyle, styles.modalTitleText]}>Are you sure you {"\n"}want to log out?</Text>
                <TouchableOpacity
                    onPress={() => {console.log("Hello World")}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {setLogOutModalVisible(!logOutModalVisible)}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
)

export default LogOutModal