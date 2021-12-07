import { put, takeEvery, call } from 'redux-saga/effects'
import { createCategoryRequest, updateCategoryRequest, deleteCategoryRequest, searchCategory, getCategories } from '../../requests/categoryRequests';
import { DELETE_CATEGORY_SAGA, STORE_CATEGORIES_SAGA, UPDATE_CATEGORY_SAGA, SEARCH_CATEGORY_SAGA, CREATE_CATEGORY_SAGA } from '../constants/categoriesConstants'
import { createCategory, updateCategory, deleteCategory, storeCategories } from '../actions/categoriesActions'

function* storeCategoriesSaga(){
    const answer = yield call(getCategories);
    if(answer){
        yield put( storeCategories( answer.categories ) );
    }
}

function* createCategorySaga( { type, payload }: { type: string, payload: { title: string, userId: string } } ){
    const answer = yield createCategoryRequest( payload );
    if( answer ){
        yield put( createCategory( answer ) )
    }
}

function* updateCategorySaga( {type, payload}: { type: string, payload: { id: string, title: string, name: string, userId: string } } ){
    const answer = yield updateCategoryRequest( payload );
    if( answer ){
        yield put( updateCategory( answer ) )
    }
}

function* deleteCategorySaga( {type, payload} : { type: string, payload: { id: string, name: string, userId: string } } ){
    const answer = yield deleteCategoryRequest( payload );
    if(answer){
        yield put( deleteCategory( payload ) )
    }
}

function* searchCategorySaga( { type, payload }: { type: string, payload: {  searchText: string, minProductAmount: number, sortBy: string } } ){
    const answer = yield searchCategory( payload );
    if(answer){
        yield put( storeCategories(answer) )
    }
}

export function* categoryWatcher(){
    yield takeEvery( STORE_CATEGORIES_SAGA, storeCategoriesSaga );
    yield takeEvery( CREATE_CATEGORY_SAGA, createCategorySaga );
    yield takeEvery( UPDATE_CATEGORY_SAGA, updateCategorySaga );
    yield takeEvery( DELETE_CATEGORY_SAGA, deleteCategorySaga );
    yield takeEvery( SEARCH_CATEGORY_SAGA, searchCategorySaga );
}