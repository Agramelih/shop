import * as yup from 'yup';

let schema = yup.object().shape({
    title: yup.string().required().matches(/^[a-zA-Z]+$/, 'title must contain only letters').min(3).max(20),
})

export default schema