const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants/constants');
import {TokenError} from '../utils/errors';
import userQueries from '../controllers/queries/queries';

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization || req.body.token;
  if ( !accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const foundUser = await userQueries.read( { id: tokenData.userId });
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      email: foundUser.email,
      resume: foundUser.resume
    });
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization || req.body.token;
  if ( !accessToken) {
    return next(new TokenError('Need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    if (tokenData) {
      req.tokenData = tokenData;
      return next()
    }
    return next(new TokenError('Token is invalid'));
  } catch (e) {
    next(e);
  }
};