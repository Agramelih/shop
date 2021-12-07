import { url } from '../constants/constants'

export const adminLogin = async( logindata: { login: string, password: string } ) => {
    try {
        const response = await fetch(url + '/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(logindata)
        })
        return await response.json();
    } catch (error: any) {
        console.log(error.message)
        return false
    }    
}

export const createAdmin = async( createData: {login: string, password: string } ) => {
    try {
        const response = await fetch(url + '/admin/create', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( createData )
        })
        return await response.json();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}
