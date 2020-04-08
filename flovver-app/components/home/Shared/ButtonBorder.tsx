import React from 'react'
import {PINK, MID_BLUE} from '../../../styles/colors'
import {TouchableOpacity, StyleSheet, Image} from 'react-native'

const ButtonBorder = ({ onPress }) => {
        
        return (
            <TouchableOpacity style={styles.button}
                onPress={() => {onPress()}}
            >
                <Image
                    style={styles.imageIconStyle}
                    source={require('../../../images/Calendar-Icon.png')}/>
            </TouchableOpacity>
        )
}


const styles = StyleSheet.create({
    button :{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: PINK,
        borderWidth: 5,
        borderColor: MID_BLUE,
        height: 80,
        width: 80,
        borderRadius: 100,
        marginTop:-40   
    },
    imageIconStyle:{
        height: 50,
        width: 50,
        resizeMode : 'stretch',
    }
})


export default ButtonBorder