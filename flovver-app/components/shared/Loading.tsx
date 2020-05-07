import React from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions, Image, Modal } from 'react-native'
import { PINK } from '../../styles/colors'

const Loading = ({isVisible}) => (
    <Modal
        visible={isVisible}
        transparent={false}
        animationType="fade"
    >
        <View style={styles.container}>
                <Image 
                        resizeMode="contain"
                        style = {styles.image}
                        source={require('../../images/FlovverLogo.png')} />
                <ActivityIndicator size="large" color={PINK} />
        </View>
    </Modal>
)

const styles = StyleSheet.create({

    "container":{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        fontFamily:'Lato'
    },
    "image":{
        width: Dimensions.get("window").width * 0.7,
        height: 200
    },

})


export default Loading