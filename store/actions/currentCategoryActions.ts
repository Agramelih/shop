import { STORE_CURRENT_CATEGORY } from '../constants/currentCategoryConstants'

export function storeCurrentCategory( category: string){
    return{
        type: STORE_CURRENT_CATEGORY,
        payload: category
    }
}