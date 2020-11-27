import {put, select} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import remove from 'lodash/remove';

export  function* getUsersSaga(action) {
    try{
        const { data } = yield restController.getUsers(action.data);
        yield put({type: ACTION.GET_USERS_SUCCESS, users: data.users, haveMore: data.haveMore});
    }
    catch (e) {
        yield put({type: ACTION.USER_ERROR, error: e.response});
    }
}

export function* getUserByIdSaga(action){
    yield put({type: ACTION.GET_USER_REQUEST});
    try{
        const {data} = yield  restController.getUserById(action.id);
        yield put({type: ACTION.GET_USER_BY_ID_SUCCESS, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_USER_ERROR, error: e.response});
    }
}

export  function* updateUserSaga(action) {
    yield put({type: ACTION.UPDATE_USER_REQUEST});
    try {
        const {data}= yield restController.updateUser(action.data, action.id);
        yield put({type: ACTION.UPDATE_STORE_AFTER_UPDATE_USER, data: data});
    } catch (e) {
        yield put({type: ACTION.UPDATE_USER_ERROR, error: e.response});
    }
}

export function* deleteUserSaga(action) {
    try {
        yield restController.deleteUser(action.id);
        const {users} = yield select(state => state.usersStore);
        const newUsersList = remove(users, (user) => action.data.id !== user.id);
        yield put({type: ACTION.DELETE_USER_SUCCESS, data: newUsersList});
    } catch (err) {
        yield put({type: ACTION.USER_ERROR, error: err.response});
    }
}
