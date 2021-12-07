import { put, takeEvery } from 'redux-saga/effects'
import { getUser, getUserByToken, getUserData } from '../../requests/userRequests'
import { adminLogin } from '../../requests/adminRequests' 
import { STORE_USER_SAGA, TOKEN_USER_SAGA, LOGIN_GOOGLE_SAGA, LOGIN_ADMIN_SAGA } from '../constants/userConstants'
import { userDataType } from '../../constants/types'
import { storeUser } from '../actions/userActions'
import asyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-google-app-auth';
import { config } from '../../constants/constants'

function* getUserSaga( { type, payload } : { type: string, payload: { userData: userDataType, navigator: any} } ){
    const answer = yield ( getUser(payload.userData) );
    if( answer ){
        yield asyncStorage.setItem('token', answer.token );
        yield asyncStorage.setItem('refreshToken', answer.refreshToken);
        yield put( storeUser( answer ) );
        payload.navigator.navigate('tabFork')
    }
}

function* getUserByTokenSaga( { type, payload }: { type: string, payload: any } ){
    const token = yield asyncStorage.getItem('token');
    if(token){
        const answer = yield getUserByToken( token, 'token' );
        if(answer){
            yield put( storeUser(answer) );
            payload.navigate('tabFork')
        }
        else{
            const token = yield asyncStorage.getItem('refreshToken');
            if( token ){
                const answer = yield getUserByToken( token, 'refreshToken' );
                if( answer ){
                    yield put( storeUser(answer) );
                    payload.navigate('tabFork')
                }
            }
        }
    }
    else{
        const token = yield asyncStorage.getItem('refreshToken');
        if( token ){
            const answer = yield getUserByToken( token, 'refreshToken' );
            if( answer ){
                yield put( storeUser(answer) );
                payload.navigate('tabFork')
            }
        }

    }
}

function* loginGoogleSaga( { type, payload } : { type: string, payload: any } ){
    const token = yield asyncStorage.getItem('googleToken');
    if( token ){
        const userData = yield getUserData(token);
        if( userData ){
            yield put( { ...userData } );
            payload.navigate('tabFork')
        }
        else{
            const { type, accessToken } = yield Google.logInAsync(config);
            if(type === 'success'){
                yield asyncStorage.setItem('googleToken', accessToken);
                const userData = yield getUserData(accessToken);
                if(userData){
                    yield put( storeUser( {...userData } ) );
                    payload.navigate('tabFork')
                }
            }
        }
    }
    else{
        const { type, accessToken } = yield Google.logInAsync(config);
        if(type === 'success'){
            yield asyncStorage.setItem('googleToken', accessToken);
            const userData = yield getUserData(accessToken);
            if(userData){
                yield put( storeUser( {...userData } ) );
                payload.navigate('tabFork')
            }
        }
    }
}

function* getAdminSaga( { type, payload }: { type: string, payload: {userData: userDataType, navigator: any } } ){
    const answer = yield adminLogin( payload.userData );
    if( answer ){
        yield put( storeUser( { ...answer, type: 'admin' } ) );
        payload.navigator.navigate('tabFork')
    }
}

export function* userWatcher(){
    yield takeEvery( STORE_USER_SAGA, getUserSaga );
    yield takeEvery( TOKEN_USER_SAGA, getUserByTokenSaga );
    yield takeEvery( LOGIN_GOOGLE_SAGA, loginGoogleSaga );
    yield takeEvery( LOGIN_ADMIN_SAGA, getAdminSaga );
}