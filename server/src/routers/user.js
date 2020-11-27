import express            from 'express';
import userController  from '../controllers/userController.js';
const userCreateUpdateController = require('../controllers/userCreateUpdateController');
const upload = require('../utils/fileUpload');
const userRouter = express.Router();
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validation/validators');
const hashPass = require('../middlewares/hashPassMiddle');

userRouter.route( '/registration' )
    .post(
        upload.uploadAvatar,
        validators.validateRegistrationData,
        hashPass,
        userCreateUpdateController.registration )

userRouter.route( '/login' )
    .post(
        validators.validateLogin,
        hashPass,
        userCreateUpdateController.login );

userRouter.route( '/users' )
          .post( userController.getUsers );

userRouter.route( '/user(/:id)?' )
          .get( checkToken.checkToken, userController.getUserById )
          .patch(
              checkToken.checkToken,
              upload.uploadAvatar,
              // userCreateUpdateController.deletePrevPhotos,
              upload.deletePrevPhoto,
              hashPass,
              userCreateUpdateController.updateUser)
          .delete( userController.deleteUserById );

export default userRouter;