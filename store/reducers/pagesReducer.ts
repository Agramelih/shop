import { STORE_PAGES } from '../constants/pagesConstants'

export default function pagesReducer( state: number = 0, action: { type: string, payload: number } ){
    switch( action.type ){
        case STORE_PAGES:
            return action.payload

        default:
            return state
    }
}