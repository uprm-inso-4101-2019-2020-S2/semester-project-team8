import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ButtonNoBorder from './Shared/ButtonNoBorder'



import LatoText from '../shared/LatoText'
import * as COLORS from '../../styles/colors'



const HomeArea = () => (
    <View style={styles.homeArea}>
        <View style={styles.inner} >
            <LatoText style={styles.day}>WED, APRIL 3, 2020</LatoText>
            <View style={styles.circle}>
                <LatoText style={styles.text}>PERIOD IN</LatoText>
                <Text style={[styles.text, styles.periodCountDown]}>8 DAYS</Text>
                <View></View>
                <LatoText style={[styles.chanceText, styles.text] }>LOW CHANCE {"\n"} OF GETTING PREGNANT</LatoText>
            </View>
            <View style={styles.Events}>
                
                <View style={styles.nextEventsView}>
                    <Text style={styles.nextEvents1} >APR 8</Text>
                    <Text style={styles.nextEvents2} >NEXT {"\n"} PERIOD</Text>
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
        </View>
    </View>
)


export default HomeArea

const styles = StyleSheet.create({

    homeArea:{
        flex:8,
        alignItems:"center",
        justifyContent:"space-around",
    },

    inner:{
        
        alignItems:"center",
        justifyContent:"center",
        position:"relative",
        top:-50
    },

    day:{
        textAlign:"center",
        fontSize:16,
        color:'#ffffff',
        fontWeight:"bold",
        letterSpacing:2,
        fontFamily:"lato-bold"
    },

    circle: {
        marginTop:30,
        height:275,
        width:275,
        borderColor:COLORS.LIGHT_BLUE,
        borderWidth:4,
        borderRadius:200,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:20,
        
    },

    Events:{
        flexDirection:"row",
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent: "space-evenly"
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
    },

    text:{
        color:"#ffffff",
        textAlign:"center",
        fontSize:11,
        letterSpacing:0.5,
        
    },

    chanceText:{
        borderTopColor:"#ffffff",
        borderTopWidth:2,
        paddingTop:25,
        
    },

    periodCountDown : {
        color:"#ffffff",
        fontSize:40,
        textAlign:"center",
        letterSpacing:5,
        marginBottom:15,
        fontFamily:"lato-bold",
        marginTop:10
    }

})