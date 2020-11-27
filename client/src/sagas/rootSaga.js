import {takeLatest} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {registerSaga, loginSaga} from './authSagas';
import {headerRequest} from './userSaga';
import {
    getUsersSaga,
    getUserByIdSaga,
    deleteUserSaga,
    updateUserSaga
} from "./usersSaga";

function* rootSaga() {
    yield  takeLatest(ACTION.AUTH_ACTION_REGISTER, registerSaga);
    yield  takeLatest(ACTION.AUTH_ACTION_LOGIN, loginSaga);
    yield  takeLatest(ACTION.HEADER_REQUEST_AUTHORIZE, headerRequest);
    yield  takeLatest(ACTION.GET_USERS_ACTION, getUsersSaga);
    yield  takeLatest(ACTION.GET_USER_BY_ID_ACTION, getUserByIdSaga);
    yield  takeLatest(ACTION.UPDATE_USER_ACTION, updateUserSaga);
    yield  takeLatest(ACTION.DELETE_USER_ACTION, deleteUserSaga);
}

export default rootSaga;