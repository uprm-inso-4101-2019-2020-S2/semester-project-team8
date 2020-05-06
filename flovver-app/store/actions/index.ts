import * as int from '../interfaces'
import * as actions from './constants'

// USER STATE
export const setToken = (token:string):int.Action => ({
    type:actions.SET_TOKEN,
    payload:token
})

export const setSignIn = (value:boolean):int.Action => ({
    type:actions.SIGN_IN,
    payload:value
})

export const setUser = (user:int.User):int.Action => ({
    type:actions.SET_USER,
    payload:user
})

// SHARED USER
export const setSharedUsers = (users:Array<any>):int.Action => ({
    type:actions.SET_USERS,
    payload:users
})

// SET CYCLES FROM SHARED USER
export const setCycles = (user_id, cycles):int.Action => ({
    type:actions.SET_USERS_CYCLES,
    payload:{
        user_id:user_id,
        cycle:cycles
    }
})

