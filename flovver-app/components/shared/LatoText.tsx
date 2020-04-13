import React from 'react'

import {Text, StyleSheet} from 'react-native'

const isIterable = (obj) => {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function'

}


const LatoText = (props) => {
    
    if(isIterable(props.style)){
        return <Text {...props} style={[...props.style, styles.font]} />
    }
    else if (props.style)
    {
        return <Text {...props} style={[props.style, styles.font]} />
    }
    return <Text {...props}  />
}


const styles = StyleSheet.create({
    font:{
        fontFamily:"lato-black"
    }
})

export default LatoText