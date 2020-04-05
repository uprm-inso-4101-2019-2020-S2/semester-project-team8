import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import * as COLORS from '../../styles/colors'
import Next from './Shared/Next'
import ScrollPicker from './ScrollPicker'

const CycleForm = ({ history }) => {

    const items = Array.from(Array(80).keys(), x => (x + 10).toString() )
    return (
        <React.Fragment>
            <View
                style={{marginTop:10}}
            >
                <Image 
                    style={styles.backArrow}
                    source={require('../../images/ArrowIcon.png')} />
                <Text style={styles.title}>How long is your {"\n"} typical cycle?</Text>
            </View>

            <ScrollPicker items={items} />

            <View>
                <Text style={styles.informationText}>Period length is measured from the {"\n"} 
                            first to the last day of bleeding</Text>
                <Next onPress={()=>{history.push("/InitialForm/CycleForm")}} />
            </View>

        </React.Fragment>
    );  

}

const styles = StyleSheet.create({

    title:{
        fontSize:35,
        textAlign:"center",
        fontWeight:"bold",
        color:COLORS.DARK_BLUE,
        marginTop:10
    },
    informationText:{
        textAlign:"center",
        fontSize:12,
        marginBottom:10,
        color: COLORS.LIGHT_GREY
    },
    backArrow:{
        height:20,
        width:20,
        marginLeft: Dimensions.get('window').width * -0.12
    }
 
})

export default CycleForm