const schemas = require('../../utils/validation/user');
import {BadRequestError} from '../../utils/errors';

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await schemas.registrationSchema.isValid(req.body);
  if ( !validationResult) {
    return next(new BadRequestError('Invalid data for registration'));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await schemas.loginSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    return next(new BadRequestError('Invalid data for login'));
  }
};
