import React, {useState, useEffect} from 'react'

import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native' 

import * as COLORS from '../../../../styles/colors'

const ItemValue = (onPress, image_url:string, email, isAdd) => {
    
    useEffect(() => {console.log(image_url)} ,[])

    return(
    <TouchableOpacity style={styles.container} 
    onPress={onPress}
    >
        <Image 
            source={{uri:image_url}}
            style={styles.ImageStyle} />
        <Text style={styles.text}>{email}</Text>
        {isAdd?<Image 
            style={{ transform:[{rotate: '45deg'}], height:15, width:15 }}
            source={require('../../../../images/Delete.png')}/>:
            <Image 
            style={{ height:15, width:15 }}
            source={require('../../../../images/Delete.png')}/>
            }
    </TouchableOpacity>)
}

export default ItemValue

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