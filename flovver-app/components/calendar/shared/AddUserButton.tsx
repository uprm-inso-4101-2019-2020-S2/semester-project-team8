import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Image } from 'react-native'
import * as COLORS from '../../../styles/colors'

const AddUserButton = ({ onPress }) => (
    <TouchableOpacity
    style={styles.IndContainer}
        onPress = {onPress}
    >
        <View style={styles.ImageContainer} >
            <Image 
                style={styles.Image}
                source={require('../../../images/PlusIcon.png')} 
            />
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button :{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 0,
        borderColor: '#fff',
        height: 50,
        width:50,
        borderRadius: 100 ,
        margin: 5,
        padding:12,
        marginLeft: 40
    },

    ImageContainer: {
        borderRadius:100,
        backgroundColor:COLORS.LIGHT_GREY,
        height:50,
        width:50,
        alignItems:"center",
        justifyContent:"center"
    },

    Image:{
        height:30,
        width:30,
        borderRadius:100,
    },

    IndContainer: {
        padding:10,
        alignItems:"center"
    },

    PlusButton:{
        height:20,
        width:20,
    }
})


export default AddUserButton