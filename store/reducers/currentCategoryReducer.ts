import { STORE_CURRENT_CATEGORY } from '../constants/currentCategoryConstants'

export default function currentCategoryReducer( state: string = 'all', action:{ type: string, payload: string } ){
    switch( action.type ){
        case STORE_CURRENT_CATEGORY:
            return action.payload

        default:
            return state
    }
}