import { STORE_USER, STORE_USER_SAGA, TOKEN_USER_SAGA , LOGIN_GOOGLE_SAGA, LOGIN_ADMIN_SAGA } from '../constants/userConstants'
import { userInfoType } from '../../constants/types'
import { userDataType } from '../../constants/types'

export function storeUser( user: userInfoType ){
    return {
        type: STORE_USER,
        payload: user
    }
}

export function storeUserSaga( { userData, navigator } : { userData: userDataType, navigator: any } ){
    return{
        type: STORE_USER_SAGA,
        payload: { userData, navigator } 
    }
}

export function tokenUserSaga(tokenName: string ){
    return{
        type: TOKEN_USER_SAGA,
        payload: tokenName
    }
}

export function loginGoogleSaga( navigator: any ){
    return{        
        type: LOGIN_GOOGLE_SAGA,
        payload: navigator
    }
}

export function adminLoginSaga( { userData, navigator } : { userData: userDataType, navigator: any } ){
    return{
        type: LOGIN_ADMIN_SAGA,
        payload: { userData, navigator } 
    }
}