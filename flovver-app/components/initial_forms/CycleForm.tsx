import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as COLORS from '../../styles/colors'
import Next from './Shared/Next'
import ScrollPicker from './Shared/ScrollPicker'
import BackArrow from './Shared/BackArrow'

const CycleForm = ({ history, onSubmit, cycleLen, sendInit }) => {

    const items = Array.from(Array(80).keys(), x => (x + 10).toString() )
    return (
        <React.Fragment>
            <View
                style={{marginTop:10, alignSelf:"stretch"}}
            >
                <BackArrow onPress={()=>{history.push("/InitialForm/Duration")}} />
                <Text style={styles.title}>How long is your {"\n"} typical cycle?</Text>
            </View>

            <ScrollPicker 
                items={items}
                value={cycleLen}
                onSubmit={onSubmit}
            />

            <View>
                <Text style={styles.informationText}>Period length is measured from the {"\n"} 
                            first to the last day of bleeding</Text>
                <Next onPress={()=>{sendInit()}} />
            </View>

        </React.Fragment>
    );  

}

const styles = StyleSheet.create({

    title:{
        fontSize:35,
        textAlign:"center",
        
        color:COLORS.DARK_BLUE,
        marginTop:10,
        fontFamily:"lato-black"
    },
    informationText:{
        textAlign:"center",
        fontSize:12,
        marginBottom:10,
        color: COLORS.LIGHT_GREY,
        
    },
    backArrow:{
        height:20,
        width:20,
        marginLeft: Dimensions.get('window').width * -0.12
    }
 
})

export default CycleForm