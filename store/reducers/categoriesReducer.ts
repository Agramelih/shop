import { categoriesType } from '../../constants/types'
import { STORE_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../constants/categoriesConstants'

const defaultValue = [ { id: '', name: '' } ];

export default function( state: categoriesType[] = defaultValue, action: { type: string, payload: categoriesType[] } ){
    switch(action.type){
        case STORE_CATEGORIES: 
            return action.payload

        case CREATE_CATEGORY:
            return [...state, ...action.payload];

        case UPDATE_CATEGORY:
            const category = action.payload[0];
            let indexForUpdate = -1;
            state.find( (category, index) => {
                if( category.id === category.id ){
                    indexForUpdate = index
                }
            })

            if( indexForUpdate !== -1){
                let temp = [...state];
                temp[indexForUpdate] = category;
                return temp
            }
            return state
        
        case DELETE_CATEGORY:
            const deleteCategory = action.payload[0];
            let indexForDelete = -1; 
            state.find( (category, index) => {
                if( category.id === deleteCategory.id ){
                    indexForDelete = index
                }
            })
            
            if( indexForDelete !== -1){
                let temp = [...state];
                for( let i = indexForDelete; i < temp.length - 1; i++ ){
                    temp[i] = temp[ i + 1 ];
                }
                temp.length -= 1;
                return temp
            }

        default: 
            return state
    }
}