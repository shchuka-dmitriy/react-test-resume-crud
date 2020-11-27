const yup = require('yup');

module.exports.registrationSchema = yup.object().shape({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    password: yup.string().required().min(1),
    email: yup.string().email().required().min(4),
});

module.exports.loginSchema = yup.object().shape({
    email: yup.string().email().required().min(4),
    password: yup.string().required().min(1),
});
