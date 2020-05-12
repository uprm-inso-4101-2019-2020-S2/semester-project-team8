import axios from 'axios'
import { HOST } from './constants'

export const getTokenAsync = async (id_token:string) =>  (
    axios.post(
        HOST + "token",
        {"id_token":id_token}
        , { timeout:10000 }
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
          timeout:10000
        }
    ).then(res => res )
    .catch( e => {throw e} )
}


export const getUserAsync = async (token:string) => {
    return axios.get(
        HOST + "user",
        {
            headers: { "Authorization":token }
        }
    ).then(res => (
        res
    ))
    .catch(e => { {throw e}
        // if(e.response){
        //     return e.response
        // } else {
        //     e
        // }
    })
}

export const addPeriod = async (token:string, cycle_info) => {
    const options = {
        headers: { "Authorization":token }
    };
      
    return axios.post(
        HOST + "menstrual/add_period",
        cycle_info,
        options
        ).then(res => {
            console.log(res)
            return res
        }).catch(e => {throw e})
}


export const updatePeriod = async (token:string, body) => {
    const options = {
        headers: { "Authorization":token }
    }

    return axios.put(
        HOST + "menstrual/update",
        body,
        options
    ).then(res => {
        console.log(res)
        return res
    }).catch(e => {throw e})
    
}

export const addSharedUser = async (token:string, id) => {

    return axios.post(
        HOST + "shared_users/add/"+id,
        {},
        {
            headers: { "Authorization":token }
        }
    ).then(res => {
        
        return res
    }).catch(e => {{throw e}
        
        // if (e.response) {
        //     console.log(e.response)
        //     return e.response}
        // else { 
        //     throw e
        // }
    })

}