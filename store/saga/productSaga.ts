import { put, takeEvery, call } from 'redux-saga/effects'
import { CREATE_PRODUCT_SAGA, UPDATE_PRODUCT_SAGA, DELETE_PRODUCT_SAGA, STORE_PRODUCT_SAGA, SEARCH_PRODUCT_SAGA } from '../constants/productsConstants'
import { createNewProductRequest, updateProductRequest, getArrayOfProductsRequest, deleteProductRequest, searchProduct } from '../../requests/productRequests'
import { storeProducts } from '../actions/productsActions'
import { storePages } from '../actions/pagesActions'


function* storeProductSaga( {type, payload} : { type: string, payload: { category: string, page: number, count: number } } ){
    const answer = yield call( getArrayOfProductsRequest, payload.category, payload.page, payload.count )
    if(answer){
        yield put( storeProducts( answer.products ) );
        yield put( storePages( (answer.numberOfProducts - answer.numberOfProducts % payload.count) / payload.count ) )
    }
}

function* searchProductSaga( { type, payload }: { 
    type: string, 
    payload: { category: string, searchText: string, sortType: string, price: number, page: number, count: number } 
} ){
    const answer = yield call( searchProduct, payload );
    if( answer ){
        yield put( storeProducts(answer.products) );
        yield put( storePages( (answer.amount - answer.amount % payload.count) / payload.count ) )
    }
}

function* createProductSaga( { type, payload }: { 
    type: string, 
    payload: { product: { title: string, price: string, category: string, image: string, userId: string }, navigator: any } 
} ){
    yield call( createNewProductRequest, payload.product );
    const refresh = yield call( getArrayOfProductsRequest, 'all', 0, 5 );
    if( refresh ){
        yield put( storeProducts( refresh.products ) );
        yield put( storePages( (refresh.numberOfProducts - refresh.numberOfProducts % 5) / 5 ) )
        payload.navigator.navigate('tabFork');
    }
}

function* updateProductSaga( { type, payload }: { 
    type: string, 
    payload: { product: { id: string, title: string, path: string, price: string, userId: string }, navigator: any} 
} ) {
    yield call( updateProductRequest, payload.product );
    const refresh = yield call( getArrayOfProductsRequest,'all', 0, 5 );
    if(refresh){
        yield put( storeProducts( refresh.products ) );
        yield put( storePages( (refresh.numberOfProducts - refresh.numberOfProducts % 5) / 5 ) )
        payload.navigator.navigate('tabFork');
    }
}

function* deleteProductSaga( { type, payload }: { type: string, payload: { productId: string, userId: string } } ){
    yield call( deleteProductRequest, payload );
    const refresh = yield call( getArrayOfProductsRequest, 'all', 0, 5 ) ;
    if( refresh ){
        yield put( storeProducts( refresh.products ) );
        yield put( storePages( (refresh.numberOfProducts - refresh.numberOfProducts % 5) / 5 ) )
    }
}

export function* productWatcher(){
    yield takeEvery( CREATE_PRODUCT_SAGA, createProductSaga );
    yield takeEvery( UPDATE_PRODUCT_SAGA, updateProductSaga );
    yield takeEvery( DELETE_PRODUCT_SAGA, deleteProductSaga );
    yield takeEvery( STORE_PRODUCT_SAGA, storeProductSaga );
    yield takeEvery( SEARCH_PRODUCT_SAGA, searchProductSaga ); 
}