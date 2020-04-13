import * as int from '../interfaces'
import * as actions from './constants'

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