type arrayOfProductsType = {
    id: string,
    title: string,
    price: number,
    path: string 
}[]

type productInBascketType = {
    id: string,
    title: string,
    path: string,
    price: number,
    amount: number
}[]

type userInfoType = {
    id: string,
    login: string,
    locale: string,
    type: string
}

type userDataType = {
    login: string,
    password: string,
    locale: string
}

type productType = {
    id: string,
    title: string,
    path: string,
    price: number
}

type categoriesType = {
    id: string,
    name: string
}

const productBase = {
    id: '', 
    title: '', 
    path: '',
    price: 0,
}

export { arrayOfProductsType, productInBascketType, userInfoType, userDataType, productType, categoriesType, productBase }