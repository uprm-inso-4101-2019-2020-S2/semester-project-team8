import React, { useEffect, useState, useContext } from 'react'

import * as COLORS from '../../../styles/colors'
import TitleArea from '../../settings/TitleArea'

import { HOST } from '../../../backend_requests/constants'
import { UserContext } from '../../../store/UserContext'
import { calcFertileListHelper } from '../../shared/Hooks/index'
import { getMarkedDates } from '../shared/calendarMethods'
import * as actions from '../../../store/actions'

import { View, Text, Modal, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native'
import { useHistory } from 'react-router-native'
import { Calendar } from 'react-native-calendars'
import Axios from 'axios'
import ColorLegend from '../shared/ColorLegend'
import RemoveUserButton from './RemoveUserButton'

const SharedUserProfile = ({isVisible, setIsVisible, email, id, image_url}) => {

    const history = useHistory()
    const [cycles, setCycles] = useState([])
    const [fertileInfo, setFertileInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, dispatcher] = useContext(UserContext)
    const [markedDates, setMarkedDates] = useState({})

    useEffect(() => {

        if(isVisible){
            
            setLoading(true)
            Axios.get(HOST + "shared_users/cycles/"+id, {
                headers:{
                    "Authorization":state.token
                }
            }).then(res => {
                if(res.status === 200) { 
                    console.log(res.data)
                    setFertileInfo(calcFertileListHelper(res.data))
                    setCycles(res.data)
                }
                setLoading(false)
            }).catch(e => {
                if(e.status === 401 || e.status === 403){
                    Alert.alert("Your session timed out. Sign in again")
                    dispatcher(actions.setSignIn(false))
                    dispatcher(actions.setToken(null))
                    dispatcher(actions.setUser(null))
                    history.push("/Login")
                }
            })

        }

    }, [isVisible])


    useEffect(() => {

        setMarkedDates(getMarkedDates(cycles, fertileInfo))

    }, [cycles, fertileInfo])
    

    return (
        <Modal
            transparent={false}
            visible={isVisible}
            animationType={"slide"}
        >
            <View style={styles.modalContainer} >
                <TitleArea 
                    title={"PROFILE"}
                    history={history}
                    backAction={()=>{setIsVisible(false)}}
                />

                <View  style={styles.imageAndEmail} >
                    <View style={styles.profileImageContainer} > 
                        <Image 
                            style={styles.profileImage}
                            source={{uri:image_url}}/>
                    </View>
                    <Text style={styles.emailStyle} >
                        {email.toUpperCase()}
                    </Text>
                </View>

                <View style={styles.calendarContainer} >
                    {!loading&&
                    <Calendar 
                        markedDates={markedDates}
                        hideExtraDays={true}
                        markingType={'period'}
                        theme={{
                            arrowColor: COLORS.MID_BLUE
                        }}
                    />}
                    {loading&&<View
                        style={{alignItems:"center", justifyContent:"center"}}
                    ><ActivityIndicator size="large" color={COLORS.PINK}/></View>}
                    
                    <ColorLegend />

                    <RemoveUserButton record_id={id} setIsVisible={setIsVisible} />
                </View>

            </View>
        </Modal>
    )

}

export default SharedUserProfile

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        backgroundColor:COLORS.PEARL_WHITE,
        justifyContent:"space-evenly",
        alignItems:"stretch"
    },
    imageAndEmail:{
        flexDirection:"row",

        padding:30
    },
    profileImage:{
        height:50,
        width:50,
        borderRadius:100
    },
    emailStyle:{
        flex:1,
        marginTop:15,
        fontFamily:"lato-regular"
    },
    profileImageContainer:{
        flex:0.4
    },

    calendarContainer: {
        flex:1,
        marginTop:-10,
        paddingLeft:10,
        paddingRight:10
    }
})