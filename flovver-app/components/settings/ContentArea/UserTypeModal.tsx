import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'

const UserTypeModal = ({changeUserTypeModalVisible, setChangeUserTypeModalVisible, styles}) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={changeUserTypeModalVisible}
    >
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
            <View style={[styles.modalContainer]}>
                <Text style={[styles.modalText, styles.textStyle, styles.modalTitleText]}>What type of user {"\n"}would you like to be?</Text>
                <TouchableOpacity
                    onPress={() => {console.log("Hello World")}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>View-Only</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {console.log("Hello World")}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>Regular</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {setChangeUserTypeModalVisible(!changeUserTypeModalVisible)}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
)


export default UserTypeModal