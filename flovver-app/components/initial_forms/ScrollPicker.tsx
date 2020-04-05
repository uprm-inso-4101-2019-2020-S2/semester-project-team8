import React, {useState} from  'react'
import {ScrollView, View, Text, Picker} from 'react-native'
import {PINK} from '../../styles/colors'



const ScrollPicker = ({ items }) => {

    const [selectedValue, setSelectedValue] = useState("1");

    return (
        <View >
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150, backgroundColor:"#A7A4A4", borderRadius:100}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                mode="dialog"
            >
                {items.map( (i, key) => {
                    return <Picker.Item label={i} value={i} key={key} />
                })}
             </Picker>
        </View>
    );
        
} 


export default ScrollPicker