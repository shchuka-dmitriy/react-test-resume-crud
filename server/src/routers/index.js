import express                from 'express';
import * as ErrorHandlers     from './../middlewares/errorHandler/index.js';
import userRouter        from './user';
const router = express.Router();

router.use( userRouter );
router.use( ErrorHandlers.handleApplicationError );
router.use( ErrorHandlers.handleSequelizeError );

export default router;