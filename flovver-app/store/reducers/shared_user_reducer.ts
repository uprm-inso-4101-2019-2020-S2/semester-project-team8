import * as constants from '../actions/constants'


const sharedUserReducer = (state, action) => {
    
    const { type } = action

    switch (type) {
        case constants.SET_USERS:
            return {
                ...state,
                users:action.payload    
            }
        default:
            return state
    }

}