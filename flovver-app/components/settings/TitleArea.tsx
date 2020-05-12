import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as COLORS from '../../styles/colors'
import BackArrow from '../initial_forms/Shared/BackArrow'

const TitleArea = ({ history, title, backAction }) => {
    return (
        <View style={styles.TitleContainer}>
            <View style={styles.backButton}>
                <BackArrow onPress={()=>{backAction?backAction():history.push("/Home/Index")}} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}


export default TitleArea


const styles = StyleSheet.create({

    TitleContainer:{
        paddingLeft:20,
        paddingTop:35,
        paddingRight:20,
        flexDirection:"row",
    },
    backButton:{
        alignSelf:"flex-start",
        marginTop:-7,
        flex:0.5
    },
    title:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:20,
        letterSpacing: 4
    },

})