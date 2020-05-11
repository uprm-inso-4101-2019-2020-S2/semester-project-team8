import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import * as COLORS from '../../../styles/colors'


const SharedTitleArea = () => {
    return(
        <>
            <View style={styles.HorizontalWhiteLine} />
            
            <View style={styles.UsersContainer}>
                <Text style={{color:COLORS.WHITE, fontSize:15, letterSpacing:3, fontFamily:"lato-black"}}>SHARED USERS</Text>
            </View>
        </>
    )
}

export default SharedTitleArea


const styles = StyleSheet.create({
    
    HorizontalWhiteLine:{
        width:50,
        backgroundColor:COLORS.WHITE,
        height:5,
    },

    UsersContainer: {
        marginTop:5,
        flex:0.2
    },

})
