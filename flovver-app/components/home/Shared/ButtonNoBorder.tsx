import React from 'react'
import {PINK} from '../../../styles/colors'
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native'

const ButtonNoBorder = ({ onPress, isGear, isFlovver }) => {
        
        if(isFlovver){
            return (
                <TouchableOpacity style={[styles.flovverButton, styles.button]}
                    onPress={() => onPress()}
                >
                    <Image 
                        style={ [styles.flovverImage] }
                        source={require('../../../images/FlovverIcon.png')} />  
                    
                </TouchableOpacity>
            )
        }
        
        return (
            <TouchableOpacity style={[styles.button, styles.nonFlovverButton]}
                onPress={() => onPress()}
            >
                {
                isGear?<Image
                    style={[styles.nonFlovverImage]}
                    source={require('../../../images/Gear.png')}/>:
                <Image 
                    style={[styles.nonFlovverImage]}
                    source={require('../../../images/Analysis.png')} />  
                }
            </TouchableOpacity>
        )
}


const styles = StyleSheet.create({
    button :{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        
        borderRadius: 100
    },

    nonFlovverButton:{
        backgroundColor: PINK,
        borderWidth: .5,
        borderColor: PINK,
        // marginTop:5 , 
        height: 80,
        width: 80,
    },

    flovverButton:{
        backgroundColor:'#ffffff',
        borderColor: '#ffffff',
        height: 90,
        width: 90,
        position:"relative",
        top:-50,
        elevation:1
    },

    flovverImage:{
        height:55,
        width:30,
        resizeMode:'stretch'
    },

    nonFlovverImage:{
        height: 50,
        width: 50,
        resizeMode:'stretch'
    }

})


export default ButtonNoBorder