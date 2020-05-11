import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import * as COLORS from '../../../styles/colors'

const AddButton = ({setAddVisible}) => {
    

    return (
        <TouchableOpacity
            onPress={()=>{setAddVisible(true)}}
        >
            <Text style={styles.text}>View Unapproved Requests</Text>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    text:{
        fontFamily:"lato-regular",
        color:COLORS.PEARL_WHITE,
        fontSize:15,
        letterSpacing: 4,
        textAlign:"center",
        padding:10,
        borderRadius:100,
        borderColor:COLORS.PEARL_WHITE,
        borderWidth:0.4
    }
})