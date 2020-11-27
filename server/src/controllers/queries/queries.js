import {BadRequestError, ResourceNotFoundError, ServerError} from '../../utils/errors';
const bcrypt = require('bcrypt');

class queries {
    constructor (model) {
        this._model = model;
    }

    get model () {
        return this._model;
    }
    
    create = async (data) => {
        const newInstance = await this.model.create( data );
        if (newInstance) {
            return newInstance;
        }
        throw new BadRequestError();
    };

    read = async (id) => {
        const user = await this.model.findOne({
            where: {
                id
            },
        } );
        if (user) {
            return {user};
        }
        throw new ResourceNotFoundError('user with this data didn`t exist');;
    };

    delete = async (id) => {
        const deletedRowsCount = await this.model.destroy( {
            where: {
                id,
            }
        } );
        if (deletedRowsCount) {
            return deletedRowsCount;
        }
        throw new ResourceNotFoundError( this.model.name );
    };

    updateUser = async (data, userId, transaction) => {
        const [updatedCount, [updatedUser]] = await this.model.update(data,
            { where: { id: userId }, returning: true, transaction });
        if (updatedCount !== 1) {
            throw new ServerError('cannot update user');
        }
        return updatedUser.dataValues;
    };
}

export default queries;