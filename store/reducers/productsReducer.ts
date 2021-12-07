import { productType, productBase } from '../../constants/types'
import { SET_PRODUCTS } from '../constants/productsConstants'

const defaultValue = productBase

export default function productsReducer( state: productType[] = [defaultValue], action: { type: string, payload: productType[] } ){
    switch( action.type ){
        case SET_PRODUCTS:
            return action.payload
        
        default:
            return state
    }
}