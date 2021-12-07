import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import productsReducer from './reducers/productsReducer'
import productsInBascketReducer from './reducers/productsInBascketReducer'
import categoriesReducer from './reducers/categoriesReducer'
import currentProductReducer from './reducers/currentProductReducer'
import pagesReducer from './reducers/pagesReducer'
import currentCategoryReducer from './reducers/currentCategoryReducer'
import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from './saga/index'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    productsInBascket: productsInBascketReducer,
    categories: categoriesReducer,
    currentProduct: currentProductReducer,
    pages: pagesReducer,
    currentCategory: currentCategoryReducer
})

export type RootState = ReturnType<typeof store.getState>

export const store = createStore(rootReducer, applyMiddleware( sagaMiddleware ) )

sagaMiddleware.run( rootWatcher );