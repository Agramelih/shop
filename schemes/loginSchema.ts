import * as yup from 'yup';

let schema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required()
})

export default schema