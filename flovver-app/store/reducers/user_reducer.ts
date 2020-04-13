import * as int from '../interfaces'
import * as constants from '../actions/constants'

const userReducer = (state, action) => {

    const { type } = action

    switch(type){

        case constants.SET_USER:
            return {
                ...state,
                user:action.payload
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

        default:
            return state
    }

}


export default userReducer 