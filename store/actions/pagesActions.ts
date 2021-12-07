import { STORE_PAGES } from '../constants/pagesConstants'

export function storePages( pages: number ){
    return {
        type: STORE_PAGES,
        payload: pages
    }
}