import ACTION from './actionTypes';

export const headerRequest = (data) => {
    return {
        type: ACTION.HEADER_REQUEST_AUTHORIZE,
        id: data
    }
};

export const clearUserStore = () => {
    return {
        type: ACTION.CLEAR_USER_STORE
    }
};

export const clearAuth = () => {
    return {
        type: ACTION.AUTH_ACTION_CLEAR
    }
};

export const authActionLogin = (data) => {
    return {
        type: ACTION.AUTH_ACTION_LOGIN,
        data: data
    }
};

export const authActionRegister = (data) => {
    return {
        type: ACTION.AUTH_ACTION_REGISTER,
        data: data
    }
};

export const clearErrorSignUpAndLogin = () => {
    return {
        type: ACTION.AUTH_ACTION_CLEAR_ERROR
    }
};

export const getUserAction = (data) => {
    return {
        type: ACTION.GET_USER_ACTION,
        replace: data
    }
};

export const getUsersAction = (data) => {
    return {
        type: ACTION.GET_USERS_ACTION,
        data: data
    }
};

export const getUserByIdAction = (data) => {
    return {
        type: ACTION.GET_USER_BY_ID_ACTION,
        id: data
    }
};

export const deleteUserAction = (data) => {
    return {
        type: ACTION.DELETE_USER_ACTION,
        id: data
    }
};

export const updateUserAction = (data, id) => {
    return {
        type: ACTION.UPDATE_USER_ACTION,
        data: data,
        id: id
    }
};

export const checkUserAction = (data) => {
    return {
        type: ACTION.GET_USER_ACTION,
        data: data
    }
};
