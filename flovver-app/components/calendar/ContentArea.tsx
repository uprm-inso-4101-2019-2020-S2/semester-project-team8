import React,{useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'


import ChangePeriodPicker from './shared/ChangePeriodPicker';
import Loading from '../shared/Loading';
import ColorLegend from './shared/ColorLegend';
import * as COLORS from '../../styles/colors'

const ContentArea = ({markedDays}) => {
    
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={styles.ContentContainer}>
            
            <ChangePeriodPicker 
                markedDays={markedDays}
                setIsLoading={setIsLoading}
            />

            <ColorLegend />

            <Text style={styles.textStyle}>Press and hold the start date or end {"\n"} date of your period to edit</Text>
           
            <Loading isVisible={isLoading} />
            
        </View>
    )
}

export default ContentArea

const styles = StyleSheet.create({
    

    ContentContainer:{
        marginTop:50,
        paddingLeft:10,
        paddingRight:10,
        flex:6,
    },

    textStyle:{
        fontSize:12,
        color: COLORS.LIGHT_GREY,
        textAlign:"center",
        marginTop:10
    }

})