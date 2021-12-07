import * as yup from 'yup';

let schema = yup.object().shape({
    login: yup.string().required().matches(/^[a-zA-Z]+$/, 'login must contain only letters').min(3),
    password: yup.string().required().matches(/^[a-zA-Z]+$/, 'password must contain only letters').min(8)
})

export default schema