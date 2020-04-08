import axios from 'axios'
import { HOST } from '../constants'

// Gets token from backend server returns token or null if it failed
export const getTokenAsync = async (id_token:string) =>  (
    axios.post(
        HOST + "token",
        {"id_token":id_token}
        , { timeout:2000 }
    ).then( res => (
        res.headers["access-token"]
    )).catch( e => null )
)


