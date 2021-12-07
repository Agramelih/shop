import { 
    STORE_CATEGORIES, 
    STORE_CATEGORIES_SAGA, 
    CREATE_CATEGORY, 
    CREATE_CATEGORY_SAGA,
    UPDATE_CATEGORY, 
    UPDATE_CATEGORY_SAGA, 
    DELETE_CATEGORY_SAGA, 
    DELETE_CATEGORY, 
    SEARCH_CATEGORY_SAGA 
} from '../constants/categoriesConstants'
import { categoriesType } from '../../constants/types'

export function storeCategories( categories: categoriesType[] ){
    return {
        type: STORE_CATEGORIES,
        payload: categories
    }
}   

export function createCategory( category: categoriesType ){
    return {
        type: CREATE_CATEGORY,
        payload: [category]
    }
}

export function createCategorySaga( category: { title: string, userId: string } ){
    return{
        type: CREATE_CATEGORY_SAGA,
        payload: category
    }
}

export function storeCategorySaga(){
    return{
        type: STORE_CATEGORIES_SAGA
    }
}

export function updateCategorySaga( category: { id: string, title: string, name: string, userId: string }){
    return{
        type: UPDATE_CATEGORY_SAGA,
        payload: category
    }
}

export function updateCategory( category: categoriesType){
    return{
        type: UPDATE_CATEGORY,
        payload: [category]
    }
}

export function deleteCategorySaga( category: { id: string, name: string, userId: string } ){
    return{
        type: DELETE_CATEGORY_SAGA,
        payload: category
    }
}

export function deleteCategory( category: categoriesType ){
    return{
        type: DELETE_CATEGORY,
        payload: [category]
    }
}

export function searchCategorySaga( searchData: { searchText: string, minProductAmount: number, sortBy: string } ){
    return{
        type: SEARCH_CATEGORY_SAGA,
        payload: searchData
    }
}