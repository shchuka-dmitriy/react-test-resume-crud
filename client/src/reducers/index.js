import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import getUsersReducer from "./getUsersReducer";
import getUserByIdReducer from "./getUserByIdReducer";
import updateUserReducer from "./updateUserReducer";
import getUserReducer from './userReducer';
import authReducer from "./authReducer";

const appReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    userStore: getUserReducer,
    usersStore: getUsersReducer,
    selectUserStore: getUserByIdReducer,
    updatedUserStore: updateUserReducer,
});

export default appReducer;