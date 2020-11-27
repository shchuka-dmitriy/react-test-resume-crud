import ACTION from '../actions/actionTypes';

const initialState = {
    users: null,
    isFetching: true,
    error: null,
    haveMore: true
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.GET_USERS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.GET_USERS_SUCCESS: {
            return {
                ...state,
                users: action.users,
                isFetching: false,
                haveMore: action.haveMore,
                error: null
            };
        }

        case ACTION.DELETE_USER_SUCCESS:{
            return{
                ...state,
                error: null,
                users: action.data,
            }
        }

        case ACTION.USER_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }
        default: {
            return state;
        }
    }
}