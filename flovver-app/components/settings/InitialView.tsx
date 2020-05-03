import React, {useState} from 'react'
import BackArrow from '../initial_forms/Shared/BackArrow'
import { Text, View, StyleSheet, Image, Dimensions, 
        Switch, Button, TouchableOpacity, Modal } from 'react-native';

import TitleArea from './TitleArea'

import * as COLORS from '../../styles/colors'
import ContentArea from './ContentArea';

const InitialView = ({history}) => {

    return(
        <View style={styles.container}>
            <TitleArea history={history}  
                title="SETTINGS"
            />
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
