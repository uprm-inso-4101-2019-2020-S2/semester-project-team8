import React, {useState} from 'react'
import BackArrow from '../initial_forms/Shared/BackArrow'
import { Text, View, StyleSheet, Image, Dimensions, 
        Switch, Button, TouchableOpacity, Modal } from 'react-native';

import TitleArea from './TitleArea'

import * as COLORS from '../../styles/colors'
import ContentArea from './ContentArea';

const InitialView = ({history}) => {
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [changeUserTypeModalVisible, setChangeUserTypeModalVisible] = useState(false);
    const [logOutModalVisible, setLogOutModalVisible] = useState(false)

    return(
        <View style={styles.container}>

            <TitleArea history={history} />

            <ContentArea />


        </View>

        
    )
}

const styles = StyleSheet.create({ 
   

    container:{
        padding: 10,
        flex:1,
        backgroundColor: COLORS.PEARL_WHITE
    },

 
 })

export default InitialView
