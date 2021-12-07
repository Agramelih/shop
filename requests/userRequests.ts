import { url } from '../constants/constants'

export const purchase = async( productInBascket: {title: string, path: string, price: number, amount: number }[], tokenId: string) => {
    try {
        const response = await fetch(url + '/users/purchase', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                amount: productInBascket.map( (product) => product.price * product.amount).reduce( (accumulator, price) => accumulator + price),
                token: tokenId,
            })
        })
        return await response.text();
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const getUserData = async(token: string) => {
    try {
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const response = await userInfoResponse.json();
        
        if(response.error){
            return false
        }
        else{
            return response
        }
        
    } catch (error: any) {
        console.log(error.message)
        return false
    } 
}

export const getUser = async(userData: { login: string, password: string, locale: string } ) => {
    try {
        const user = await fetch( url + '/users/log', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( userData )
        });
        return await user.json();
    } catch (error: any) {
        console.log(error.message)
        return false
    }
}

export const getUserByToken = async(token: string, tokenName: string) => {
    try {
        const response = await fetch(`${url}/users/${tokenName}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( { token: token } )
        });
        return await response.json();
    } catch (error: any) {
        console.log(error)
        return false
    }
}

export const regUser = async( userData: { login: string, password: string } ) => {
    console.log("userData", userData)
    try {
        const response = await fetch(url + `/users/create?login=${userData.login}&password=${userData.password}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        return await response.json();
    } catch (error: any) {
        console.log(error.message)
        return false
    }  
}