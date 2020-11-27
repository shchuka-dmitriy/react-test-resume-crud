import {ANONYMOUS_PHOTO} from "../constants/constants";
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants/constants');
import {NotUniqueEmail} from '../utils/errors/index';
const userQueries = require('./queries/userQueries');

module.exports.registration = async (req, res, next) => {
    try {
        if (req.files) {
            req.body.avatar = req.files[0].filename;
        }
        const newUser = await userQueries.userCreation(
            Object.assign(req.body, { password: req.hashPass, role: 'user' }));
        const accessToken = jwt.sign({
            userId: newUser.id,
            role: newUser.role,
            email: newUser.email
        }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
        await userQueries.updateUser({ accessToken }, newUser.id);
        res.send({ token: accessToken, role: newUser.role });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            next(new NotUniqueEmail());
        } else {
            next(err);
        }
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const foundUser = await userQueries.findUser({ email: req.body.email });
        await userQueries.passwordCompare(req.body.password, foundUser.password);
        const accessToken = jwt.sign({
            userId: foundUser.id,
            role: foundUser.role,
            email: foundUser.email,
        }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
        await userQueries.updateUser({ accessToken }, foundUser.id);
        res.send({ token: accessToken, role: foundUser.role });
    } catch (err) {
        next(err);
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        if (req.files ) {
            if (req.files.length > 0) {
                req.body.avatar = req.files[0].filename;
            } else {
                if (req.body.photosListForRemoved !== 'null')
                req.body.avatar = ANONYMOUS_PHOTO;
            }
        }
        req.hashPass && (req.body.password = req.hashPass);
        const updatedUser = await userQueries.updateUser(req.body,
            req.params.id);
        console.log("updatedUser UPDATE USER 3");
        console.log(updatedUser);
        res.send({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            avatar: updatedUser.avatar,
            email: updatedUser.email,
            resume: updatedUser.resume,
            // role: updatedUser.role,
            id: updatedUser.id,
        });
    } catch (err) {
        next(err);
    }
};
