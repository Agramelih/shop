import { productBase, productType} from '../../constants/types'
import { STORE_CURRENT_PRODUCT } from '../constants/currentProductConstants'

const defaultValue = productBase

export default function currentProductReducer( state: productType = defaultValue, action: { type: string, payload: productType } ){
    switch(action.type){
        case STORE_CURRENT_PRODUCT:
            return action.payload

        default:
            return state
    }
    
}