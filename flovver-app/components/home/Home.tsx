import React, { useContext, useEffect, useState } from 'react'
import {View, StyleSheet} from 'react-native'

import * as COLORS from '../../styles/colors'

import HomeArea from './HomeArea'
import BottomMenu from './BottomMenu'
import Loading from '../shared/Loading'
import { useUser } from './Hooks'


// Smart Component
const Home = () => {

    const isLoading = useUser() 
    
    if(isLoading) return <Loading />

    return (
        <View style={styles.container}>
            <HomeArea />
            <BottomMenu />
        </View>
    )

} 

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:"stretch",
        backgroundColor:COLORS.MID_BLUE
    }

})


export default Home