import { url } from '../constants/constants'

export const searchCategory = async( searchData: { searchText: string, minProductAmount: number, sortBy: string  } ) => {
    try {
        const response = await fetch( url + '/category/filter', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const createCategoryRequest = async( categoryData: { title: string, userId: string } ) => {
    try {
        const response = await fetch(`${url}/category/create`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(categoryData)
        })
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const deleteCategoryRequest = async( productforDelete: { name: string, id: string, userId: string } ) => {
    try {
        const response = await fetch(`${url}/category/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productforDelete)
        });
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const getCategories = async() => {
    try {
        const response = await fetch(`${url}/category/?category=all&page=0&count=5`, {
            method: 'GET',
        });
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const updateCategoryRequest = async( newTitle: { id: string, title: string, name: string, userId: string } ) => {
    try {
        const response = await fetch(`${url}/category/update`, {
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newTitle)
        })
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}