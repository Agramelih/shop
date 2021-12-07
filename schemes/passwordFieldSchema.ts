import * as yup from 'yup';

let schema = yup.object().shape({
    password: yup.string().required(),
})

export default schema