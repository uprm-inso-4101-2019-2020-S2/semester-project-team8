import {StyleSheet} from 'react-native'


const styles = (color:string) => (

    StyleSheet.create({
        button :{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color,
            borderWidth: .5,
            borderColor: '#fff',
            height: 50,
            width:250,
            borderRadius: 100 ,
            margin: 5,
            padding:12,
            
        },
        textStyle:{
            color: "#fff",
            marginBottom : 4,
            fontSize:15,
            marginLeft: 20
        },
        imageIconStyle:{
            padding: 10,
            margin: 5,
            marginRight:22,
            height: 25,
            width: 25,
            resizeMode : 'stretch',
        }
    })

)




export default (color:string) => styles(color)