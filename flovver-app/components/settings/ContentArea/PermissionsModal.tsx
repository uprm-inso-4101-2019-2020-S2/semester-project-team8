import React from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native'
import * as COLORS from '../../../styles/colors'


const PermissionsModal = ({permissionsModalVisible, styles, setPermissionsModalVisible}) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={permissionsModalVisible}
    >
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
            <View style={[styles.modalContainer]}>
                <View style={styles.ListStyle}>
                    {/* for each user, add to the list */}
                    {/* 
                        (style flex row 1) [image, name, delete]
                        source={require('../../../../images/Delete.png')}

                    */}
                    <FlatList
                        
                        data={null} // array
                        renderItem={null} // renderItem({ item (object), index in array (number), separators })
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {setPermissionsModalVisible(!permissionsModalVisible)}}
                >
                    <Text style={[styles.modalText, styles.textStyle]}>GO BACK</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
)



const styles = StyleSheet.create({

    ListStyle:{
        paddingTop:30
    },

    modalText:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:10,
        letterSpacing: 4,
        textAlign:"center",
        paddingTop:10
    },

    textStyle:{
        fontFamily:"lato-regular",
        color:COLORS.DARK_GREY,
        fontSize:12,
        letterSpacing: 4,
    },

    modalContainer:{
        margin: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 30,
        justifyContent:"center",
        alignItems: "center",
        elevation:10,
    },


})

export default PermissionsModal