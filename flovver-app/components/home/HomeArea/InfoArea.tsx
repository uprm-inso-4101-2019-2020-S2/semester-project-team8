import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import ButtonNoBorder from '../Shared/ButtonNoBorder'

import { getAcronDateShort } from '../../shared/SharedMethods'

const InfoArea = ({ ovulation, fertile, isFertile }) => (
        <View style={styles.Events}> 
                
            <View style={styles.nextEventsView}>
                <Text style={styles.nextEvents1} >{getAcronDateShort(ovulation).toUpperCase()}</Text>
                <Text style={styles.nextEvents2} >NEXT {"\n"} OVULATION</Text>
            </View>
            
            <ButtonNoBorder 
                onPress={()=>{console.log("Hello World")}}
                isFlovver={true} 
                isGear={false} />
                
            <View style={styles.nextEventsView}>
                <Text style={styles.nextEvents1} >{getAcronDateShort(fertile).toUpperCase()}</Text>
                <Text style={styles.nextEvents2} >
                    {isFertile?"FERTILE \n END":"NEXT \n FERTILE"}
                </Text>
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