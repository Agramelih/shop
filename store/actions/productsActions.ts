import { SET_PRODUCTS, CREATE_PRODUCT_SAGA, UPDATE_PRODUCT_SAGA, DELETE_PRODUCT_SAGA, STORE_PRODUCT_SAGA, SEARCH_PRODUCT_SAGA } from '../constants/productsConstants'
import { productType } from '../../constants/types'

export function storeProducts( products: productType[] ){
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

export function storeProductSaga( data: { category: string, page: number, count: number } ){
    return {
        type: STORE_PRODUCT_SAGA,
        payload: data
    }
}

export function searchProductSaga( data: { category: string, searchText: string, sortType: string, price: number, page: number, count: number } ){
    return {
        type: SEARCH_PRODUCT_SAGA,
        payload: data
    }
}

export function createProductSaga( product: { title: string, price: string, category: string, image: string, userId: string }, navigator: any ){
    return {
        type: CREATE_PRODUCT_SAGA,
        payload: {product, navigator}
    }
}

export function updateProductSaga( product:  { id: string, title: string, path: string, price: string, userId: string }, navigator: any  ){
    return{
        type: UPDATE_PRODUCT_SAGA,
        payload: {product, navigator}
    }
}

export function deleteProductSaga( product: { productId: string, userId: string } ){
    return{
        type: DELETE_PRODUCT_SAGA,
        payload: product
    }
}