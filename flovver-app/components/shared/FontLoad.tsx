import React from 'react'
import * as Fonts from 'expo-font'
import { AppLoading } from 'expo' 


const FontLoad = ({ children }) => {

    const fetchFonts = () => {
        return Fonts.loadAsync({
            'lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
            'lato-black': require('../../assets/fonts/Lato-Black.ttf'),
            'lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
            'lato-light': require('../../assets/fonts/Lato-Light.ttf'),
            
        });
    };

    const [isLoading, setIsLoading] = React.useState(true)

    if(isLoading){
        return(
            <AppLoading 
                startAsync={fetchFonts}
                onFinish={() => {setIsLoading(false)} }
            />
        )
    }

    return(
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}


export default FontLoad