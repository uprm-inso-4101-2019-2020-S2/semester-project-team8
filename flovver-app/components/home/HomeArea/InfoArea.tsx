import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import ButtonNoBorder from '../Shared/ButtonNoBorder'

const InfoArea = () => (
    <View style={styles.Events}>
                
    <View style={styles.nextEventsView}>
        <Text style={styles.nextEvents1} >APR 8</Text>
        <Text style={styles.nextEvents2} >NEXT {"\n"} OVULATION</Text>
    </View>
    
    <ButtonNoBorder 
        onPress={()=>{console.log("Hello World")}}
        isFlovver={true} 
        isGear={false} />
        
    <View style={styles.nextEventsView}>
        <Text style={styles.nextEvents1} >MAY 8</Text>
        <Text style={styles.nextEvents2} >NEXT {"\n"} FERTILE</Text>
    </View>

</View>
)

export default InfoArea

const styles = StyleSheet.create({
    Events:{
        marginLeft:-5,
        flexDirection:"row",
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent: "space-between"
    },

    nextEvents1:{
        marginTop:10,
        color:'#ffffff',
        fontSize:20,
        borderBottomColor:'#ffffff',
        borderBottomWidth:2,
        fontFamily:"lato-bold"
    },

    nextEvents2:{
        paddingTop:5,
        textAlign:"center",
        color:'#ffffff'
    },

    nextEventsView:{
        position:"relative",
        top:35,
        color:'#ffffff',
        alignItems:"center"
    }
})