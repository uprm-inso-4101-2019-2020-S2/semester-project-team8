import * as int from '../interfaces'
import * as constants from '../actions/constants'
import { calcFertileList } from '../../components/shared/Hooks'

const userReducer = (state, action) => {

    const { type } = action

    switch(type){

        case constants.SET_USER:
            let new_state = action.payload
            if (action.payload && action.payload.cycle){
                new_state = calcFertileList(new_state)
            }
            console.log(new_state)
            return {
                ...state,
                user:new_state
            }
        
        case constants.SET_TOKEN:
            return {
                ...state,
                token:action.payload
            }

        case constants.SIGN_IN:
            return {
                ...state,
                isSignedIn:action.payload
            }
        
        case constants.SET_USERS:
            return {
                ...state,
                sharedUsers:action.payload    
            }

        case constants.SET_USERS_CYCLES:
            return {
                ...state,
                sharedCycles:action.payload
            }

        default:
            return state
    }

}


export default userReducer 