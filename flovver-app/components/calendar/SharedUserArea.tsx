import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BackArrow from '../initial_forms/Shared/BackArrow'
import * as COLORS from '../../styles/colors'
import AddUserModal from './AddUserModal'
import AddUserButton from './shared/AddUserButton'


const SharedUserArea = () => {

    const [ addVisible, setAddVisible ] = useState(false)

    return(
        <View style={styles.SharedContainer} >
                    
            <View style={styles.HorizontalWhiteLine} />
            
            <View style={styles.UsersContainer}>
                <Text style={{color:COLORS.WHITE, fontSize:15, letterSpacing:3, fontFamily:"lato-black"}}>SHARED USERS</Text>
            </View>

            <View style={styles.ImageContainer} >
                <View style={styles.IndContainer} >
                    <View  style={styles.Image} />
                    <Text style={styles.Username} >username</Text>
                </View>
                <View style={styles.IndContainer} >
                    <View  style={styles.Image} />
                    <Text style={styles.Username} >username</Text>
                </View>
                <View style={styles.IndContainer} >
                    <View  style={styles.Image} />
                    <Text style={styles.Username} >username</Text>
                </View>
                <View style={styles.IndContainer} >
                    <View  style={styles.Image} />
                    <Text style={styles.Username} >username</Text>
                </View>
                <AddUserButton 
                    onPress={()=>{setAddVisible(true)}}
                />
            </View>

            <View style={styles.DownArrow}>
                <BackArrow isWhite={true} onPress={()=>{console.log("Hello World")}} />
            </View>

            <AddUserModal 
                addUserModalVisible={addVisible}
                setAddUserModalVisible={setAddVisible}
            />
        </View>
    )
}

export default SharedUserArea

const styles = StyleSheet.create({
    
    SharedContainer:{
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        flex:3.5,
        backgroundColor:COLORS.MID_BLUE,
        alignItems:"center",
        paddingTop:10
    },

    HorizontalWhiteLine:{
        width:50,
        backgroundColor:COLORS.WHITE,
        height:5,
    },

    UsersContainer: {
        marginTop:30,
        flex:0.2
    },

    ImageContainer:{
        borderTopColor:COLORS.WHITE,
        borderBottomColor:COLORS.WHITE,
        borderTopWidth:1,
        borderBottomWidth:1,
        flex:0.4,
        flexDirection:"row",
        paddingTop:4,
        justifyContent:"space-around"
    },

    Image: {
        borderRadius:100,
        backgroundColor:COLORS.PINK,
        height:50,
        width:50      
    },

    IndContainer: {
        padding:10,
        alignItems:"center"
    },

    Username: {
        color:COLORS.WHITE,
        textAlign:"center",
        letterSpacing:2,
        fontSize:10
    },

    DownArrow:{
        transform:[{rotate:"-90deg"}]
    }

})