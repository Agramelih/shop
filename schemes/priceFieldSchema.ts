import * as yup from 'yup';

let schema = yup.object().shape({
    price: yup.number().required().typeError('price must be number').min(1).max(10000),
})

export default schema