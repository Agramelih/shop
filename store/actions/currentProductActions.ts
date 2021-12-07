import { STORE_CURRENT_PRODUCT } from '../constants/currentProductConstants'
import { productType } from '../../constants/types'

export function storeCurrentProduct( product: productType ){
    return{
        type: STORE_CURRENT_PRODUCT,
        payload: product
    }
}