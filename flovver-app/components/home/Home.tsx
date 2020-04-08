import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as COLORS from '../../styles/colors'
import ButtonNoBorder from './Shared/ButtonNoBorder'
import ButtonBorder from './Shared/ButtonBorder'

const Home = () => {


    return (
        <View style={styles.container}>
            <View style={styles.homeArea}>
                <View style={styles.inner} >
                    <Text style={styles.day}>WED, APRIL 3, 2020</Text>
                    <View style={styles.circle}>
                        
                    </View>
                    <View style={styles.texts}>
                        
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
            <View style={styles.bottomMenu}>
                <ButtonNoBorder 
                    onPress={()=>{console.log("Hello World")}}
                    isGear={true}
                    isFlovver={false}
                />
                <ButtonBorder 
                    onPress={()=>{console.log("Hello World")}}
                />
                <ButtonNoBorder 
                    onPress={()=>{console.log("Hello World")}}
                    isGear={false}
                    isFlovver={false}
                />
            </View>
        </View>
    )
} 


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:"stretch",
        backgroundColor:COLORS.MID_BLUE
    },

    homeArea:{
        flex:8,
        alignItems:"center",
        justifyContent:"space-around"
    },

    bottomMenu:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor:COLORS.PINK
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
        letterSpacing:2
    },

    circle: {
        marginTop:50,
        height:250,
        width:250,
        borderColor:'#ffffff',
        borderWidth:3,
        borderRadius:200,
    
    },

    texts:{
        flexDirection:"row",
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent: "space-evenly"
    },

    nextEvents1:{
        marginTop:10,
        color:'#ffffff',
        fontSize:20,
        fontWeight:"bold",
        borderBottomColor:'#ffffff',
        borderBottomWidth:2,
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


export default Home