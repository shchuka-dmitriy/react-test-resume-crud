import {put} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* notAuthorizeSaga(action){
    yield put({type: ACTION.GET_USER_REQUEST});
    try{
        const {data}=yield  restController.getUser();
        action.replace('/');
        yield  put({type: ACTION.GET_USER_SUCCESS, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_USER_ERROR,error: e});
    }
}

export function* headerRequest(){
    yield put({type: ACTION.GET_USER_REQUEST});
    try{
        const {data}=yield  restController.getUser();
        yield  put({type: ACTION.GET_USER_SUCCESS, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_USER_ERROR, error: e.response});
    }
}