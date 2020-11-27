import * as yup from 'yup';

export default {
    LoginSchema: yup.object().shape({
        email: yup.string().email('check email').required('Email is required'),
        password: yup.string().test('test-password','min 6 symbols',value => (value && value.trim().length>=6)).required('Password is required')
    }),
    RegistrationSchema: yup.object().shape({
        email: yup.string().email('check email').required('Email is required'),
        password: yup.string().test('test-password','min 6 symbols',value => (value && value.trim().length>=6)).required('Password is required'),
        firstName: yup.string().test('test-firstName','required',value => (value && value.trim().length>=1)).required('First Name is required'),
        lastName: yup.string().test('test-lastName','required',value => (value && value.trim().length>=1)).required('Last Name is required'),
        resume: yup.string().test('test-resume','required',value => (value && value.trim().length>=1)).required('Resume Name is required'),
    })
}
