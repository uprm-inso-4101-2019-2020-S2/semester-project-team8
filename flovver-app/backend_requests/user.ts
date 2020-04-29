import axios from 'axios'
import { HOST } from './constants'

export const getTokenAsync = async (id_token:string) =>  (
    axios.post(
        HOST + "token",
        {"id_token":id_token}
        , { timeout:2000 }
    ).then( res => (
        res.headers["access-token"]
    )).catch( e => null )
)

export const menstrualInit = async (token:string, menstrual_init) => {
    return axios.post(
        HOST + "menstrual/init",
        menstrual_init,
        { 
          headers: { "Authorization":token, "content-type":"application/json" },
          timeout:2000
        }
    ).then(res => res.data )
    .catch( e => e.response )
}


export const getUserAsync = async (token:string) => {
    return axios.get(
        HOST + "user",
        {
            headers: { "Authorization":token }
        }
    ).then(res => (
        res.data
    ))
    .catch(e => e.response)
}

export const addPeriod = async (token:string, cycle_info) => {
    return axios.post(
        HOST + "menstrual/add_period",
        {
            headers: { "Authorization":token },
            data:cycle_info
        }).then(res => (
            res.data
        )).catch(e => e.response)
}