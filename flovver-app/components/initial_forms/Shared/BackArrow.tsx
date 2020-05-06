import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as COLORS from '../../../styles/colors' 


const BackArrow = ({ onPress, isWhite=false }) => (
        <TouchableOpacity
            onPress = {()=>{onPress()}}
        >
             {!isWhite&&<Image 
                    style={styles.backArrow}
                    source={require('../../../images/ArrowIcon.png')} />
                    }
        </TouchableOpacity>
)

const styles = StyleSheet.create({
    button :{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 0,
        borderColor: '#fff',
        height: 50,
        width:50,
        borderRadius: 100 ,
        margin: 5,
        padding:12,
        marginLeft: 40
    },

    backArrow:{
        height:20,
        width:20,
    }
})


export default BackArrow