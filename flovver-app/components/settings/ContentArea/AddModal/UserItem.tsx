import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as COLORS from '../../../../styles/colors'



const UserItem = ({id, email, image_url}) => {

    return (
        <TouchableOpacity style={styles.container} >
            <View style={styles.ImageStyle} />
            <Text style={styles.text}>{email}</Text>
            <Image 
                style={{ transform:[{rotate: '45deg'}], height:15, width:15 }}
                source={require('../../../../images/Delete.png')}/>
        </TouchableOpacity>
    )

}

export default UserItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        paddingTop:10
    },

    ImageStyle:{
        borderRadius:200,
        height:50,
        width:50,
        backgroundColor:COLORS.PINK
    },

    text:{
        alignItems:"center"
    }
})