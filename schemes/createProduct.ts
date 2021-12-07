import * as yup from 'yup';

let schema = yup.object().shape({
    title: yup.string().required().min(3),
    price: yup.number().required().min(1).max(10000),
    image: yup.string().required().notOneOf(['../assets/placeholder.png'], 'Image required')
})

export default schema