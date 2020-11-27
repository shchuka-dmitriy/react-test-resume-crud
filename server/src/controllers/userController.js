import { User }   from './../models';
import queries from './queries/queries';

class UserController {

    constructor () {
        this._controller = new queries( User );
    }

    deleteUserById = async (req, res, next) => {
        try {
            res.send( `${await this._controller.delete( req.params.id )}` );
        } catch (e) {
            next( e );
        }
    };

    getUserById = async (req, res, next) => {
        let userId = req.params.id || req.tokenData.userId;
        try {
            res.send( await this._controller.read( userId, {
                attributes: {
                    exclude: ['password']
                }
            } ) );
        } catch (e) {
            next( e );
        }
    };

    getUsers = async (req, res, next) => {
        const { body: {limit, offset} } = req;
        try {
            const users = await User.findAll( {
                limit,
                where: { role: 'user' },
                offset: offset ? offset : 0,
                order: [['lastName', 'ASC']]
            } );

            let haveMore = true;
            if (users.length < 8) {
                haveMore = false;
            }
            res.send( {users, haveMore} );
        } catch (e) {
            next( e );
        }
    };
}

export default new UserController();
