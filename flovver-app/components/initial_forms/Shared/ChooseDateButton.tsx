import React from 'react'
import {PINK} from '../../../styles/colors'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'


const ChooseDateButton = ({ onPress }) => (
        <TouchableOpacity style={styles.button}
            onPress={() => onPress()}
        >
            <Image style={styles.imageIconStyle} 
            source={require("../../../images/Calendar-Icon.png")} />
            <Text style={styles.textStyle}>CHOOSE DATE</Text>
        </TouchableOpacity>
)

const styles = StyleSheet.create({
    button :{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PINK,
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        width:250,
        borderRadius: 100 ,
        margin: 5,
        padding:12,
        
    },
    textStyle:{
        color: "#fff",
        marginBottom : 4,
        fontSize:15,
        marginLeft: 20
    },
    imageIconStyle:{
        padding: 10,
        margin: 5,
        marginRight:22,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
    }
})

export default ChooseDateButton