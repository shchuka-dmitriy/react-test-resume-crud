import ACTION from '../actions/actionTypes';

const initialState = {
    isFetching: true,
    selectUserData: null,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                selectUserData: null
            }
        }
        case ACTION.GET_USER_BY_ID_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                error: null,
                selectUserData: action.data
            }
        }
        case ACTION.GET_USER_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                selectUserData: null
            }
        }
        default:
            return state;
    }
}