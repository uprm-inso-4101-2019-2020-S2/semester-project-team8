import React, {useState} from  'react'
import {ScrollView, View, Text, Picker, StyleSheet} from 'react-native'
import {PINK, LIGHT_GREY, LIGHT_BLUE} from '../../styles/colors'



const ScrollPicker = ({ items, onSubmit, value }) => (

        <View >
            <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => onSubmit(itemValue)}
                itemStyle={{textAlign:'center'}}
                mode="dialog"
            >
                {items.map( (i, key) => {
                    return <Picker.Item label={i} value={i} key={key} />
                })}
             </Picker>
        </View>

)

const styles = StyleSheet.create({

    picker:{
        height:50,
        width:150,
        borderRadius:100,
        backgroundColor:PINK,
        textAlign:'center',
        color:'#fff'
    }

})

export default ScrollPicker