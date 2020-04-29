import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BackArrow from '../initial_forms/Shared/BackArrow'
import * as COLORS from '../../styles/colors'

const TitleArea = ({ history }) => {

    return (
        <View style={styles.TitleContainer} >
            <View style={styles.backButton}>
                <BackArrow 
                    onPress={()=>{history.push("/Home/Index")}}
                />
            </View>
            <Text style={styles.title} >CALENDAR</Text>
        </View>
    )

}

export default TitleArea

const styles = StyleSheet.create({


    TitleContainer: {
        paddingLeft:20,
        paddingTop:20,
        paddingRight:20,
        flex:1,
        flexDirection:"row",
    },

    backButton:{
        alignSelf:"flex-start",
        flex:0.5
    },

    title: {
        fontFamily:"lato-black",
        color:COLORS.DARK_GREY,
        fontSize:15
    },

})

