import { url } from '../constants/constants'

export const createNewProductRequest = async(data: { title: string, price: string, category: string, image: string, userId: string } ) => {
    try {
        const answer = await fetch( url + '/product/create', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data) 
        });

        return await answer.json();
    } catch (error: any) {
        console.log(error.message)
        return false
    }
}

export const getArrayOfProductsRequest = async( category: string, page: number, count: number ) => {
    try {
        const response = await fetch(`${url}/category/?category=${category}&page=${page}&count=${count}`, {
            method: 'GET',
        })
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const deleteProductRequest = async(product: { productId: string, userId: string } ) => {
    try {
        const response = await fetch(url + '/product/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(product)
        });
        return await response.text();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const searchProduct = async( searchData: { category: string, searchText: string, price: number, sortType: string, page: number, count: number } ) => {
    try {
        const response = await fetch( url + '/category/search', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        return await response.json();
    } catch (error: any) {
        console.log(error.message)
        return false
    }
}

export const updateProductRequest = async( data: { id: string, title: string, price: string, path: string, userId: string } ) => {
    try {
        const answer = await fetch( url + '/product/update', {
            method: 'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await answer.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}