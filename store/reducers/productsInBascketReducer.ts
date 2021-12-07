import { productInBascketType, productBase } from '../../constants/types'
import { SET_PRODUCTS_IN_BASCKET } from '../constants/productsInBascketConstants'

const defaultValue = [ { ...productBase, amount: 0 } ];

export default function productsInBuscketReducer( state: productInBascketType = defaultValue , action: { type: string, payload: productInBascketType } ){
    switch(action.type){
        case SET_PRODUCTS_IN_BASCKET:
            return action.payload

        default:
            return state
    }
}