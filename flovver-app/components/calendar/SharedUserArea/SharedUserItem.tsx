import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as COLORS from '../../../styles/colors'
import SharedUserProfile from './SharedUserProfile'

const SharedUserItem = ({email, image_url, id, onPress, whiteFont}) => {

    const [profileVisible, setProfileVisible] = useState(false)

    const userName = () => {
        if(!whiteFont){ 
            return <Text style={[styles.Username, {color:COLORS.BLACK}]} >{email.split("@")[0]}</Text>
        }else{
            return <Text style={[styles.Username]} >{email}</Text>
        }
    }

    const ImageChoose = () => {
        if(!whiteFont){
            return <Image 
            style={[styles.PlusIcon, {transform:[{rotate:'45 deg'}], marginTop:15}]}
            source={require('../../../images/Delete.png')}/>
        }else{
            <Image 
            style={[styles.PlusIcon]}
            source={require('../../../images/PlusIcon.png')}/>
        }
    }

    if (whiteFont) {
        return(
            <TouchableOpacity style={styles.IndContainer} 
                onPress={()=>{setProfileVisible(true)}}
            >
                <View>
                    < Image source={{uri:image_url}} style={styles.Image} />
                </View>
                {userName()}
                    <TouchableOpacity
                    >
                    {ImageChoose()}
                    </TouchableOpacity>
                    <SharedUserProfile 
                        isVisible={profileVisible}
                        setIsVisible={setProfileVisible}
                        email={email}
                        image_url={image_url}
                        id={id}
                    />
            </TouchableOpacity>
        )
    }
    return(
        <View style={styles.IndContainer} >
            <View>
                < Image source={{uri:image_url}} style={styles.Image} />
            </View>
            {userName()}
                <TouchableOpacity
                    onPress={onPress}
                >
                {ImageChoose()}
                </TouchableOpacity>
        </View>
    )
    
}



const styles = StyleSheet.create({
    

    Username: {
        color:COLORS.WHITE,
        textAlign:"center",
        letterSpacing:2,
        fontSize:12,
        marginTop:15
    },

    Image: {
        borderRadius:100,
        backgroundColor:COLORS.PINK,
        height:50,
        width:50,
        position:"relative",
        top:10
    },

    IndContainer: {
        flexDirection:"row",
        margin:10,
        borderTopColor:COLORS.WHITE,
        borderTopWidth:0.3,
        alignItems:"center",
        justifyContent:"space-between"
    },

    PlusIcon: {
        height:20, 
        width:20,
        marginTop:10,
        transform:[{rotate:'45 deg'}]
    }

})

export default SharedUserItem