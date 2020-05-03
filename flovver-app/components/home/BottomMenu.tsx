import React from 'react'
import {View, StyleSheet} from 'react-native'
import * as COLORS from '../../styles/colors'
import ButtonNoBorder from './Shared/ButtonNoBorder'
import ButtonBorder from './Shared/ButtonBorder'

const BottomMenu = ({history}) => {

    return (
        <View style={styles.bottomMenu}>
            <ButtonNoBorder 
                onPress={()=>{history.push("/Home/Settings")}}
                isGear={true}
                isFlovver={false}
            />
            <ButtonBorder 
                onPress={()=>{history.push("/Home/Calendar")}}
            />
            <ButtonNoBorder 
                onPress={()=>{history.push("/Home/Statistics")}}
                isGear={false}
                isFlovver={false}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({

    bottomMenu:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor:COLORS.PINK
    }

})

export default BottomMenu