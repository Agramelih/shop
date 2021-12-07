import {userInfoType} from '../../constants/types'
import {STORE_USER} from '../constants/userConstants'

const defaultValue = { 
    id: '',
    login: '',
    locale: '',
    type: ''
} 

export default function userReducer( state: userInfoType = defaultValue, action: { type: string, payload: userInfoType } ){
    switch(action.type){
        case STORE_USER:
            return action.payload

        default:
            return state
    }
}