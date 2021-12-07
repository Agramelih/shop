import { SET_PRODUCTS_IN_BASCKET } from '../constants/productsInBascketConstants'
import { productInBascketType } from '../../constants/types'

export function storeProductsInBascket( products: productInBascketType ){
    return {
        type: SET_PRODUCTS_IN_BASCKET,
        payload: products
    }
}