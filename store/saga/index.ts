import { all } from 'redux-saga/effects'
import { userWatcher } from './userSaga'
import { categoryWatcher } from './categorySaga'
import { productWatcher } from './productSaga'

export function* rootWatcher(){
    yield all( [ userWatcher(), categoryWatcher(), productWatcher() ] )
}