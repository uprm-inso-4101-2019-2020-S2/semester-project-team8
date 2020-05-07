import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { UserContext } from '../../../store/UserContext'
import { useHistory } from 'react-router-native'
import * as actions from '../../../store/actions'

const LogOutModal = ({logOutModalVisible, styles, setLogOutModalVisible}) => {
    
    const [state, dispatcher] = useContext(UserContext)
    const history = useHistory()

    const onSubmit = () => {
        dispatcher(actions.setUser(null))
        dispatcher(actions.setToken(null))
        history.push("/Login")
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={logOutModalVisible}
        >
            <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                <View style={[styles.modalContainer]}>
                    <Text style={[styles.modalText, styles.textStyle, styles.modalTitleText]}>ARE YOU SURE YOU {"\n"}WANT TO LOG OUT?</Text>
                    <TouchableOpacity
                        onPress={onSubmit}
                    >
                        <Text style={[styles.modalText, styles.textStyle]}>CONFIRM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {setLogOutModalVisible(!logOutModalVisible)}}
                    >
                        <Text style={[styles.modalText, styles.textStyle]}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default LogOutModal