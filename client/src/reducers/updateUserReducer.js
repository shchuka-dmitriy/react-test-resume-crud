import ACTION from '../actions/actionTypes';

const initialState = {
	isFetching: true,
    error: null,
    data: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.UPDATE_USER_REQUEST: {
            return {
                isFetching: true,
                error: null,
                data: null
            }
        }
        case ACTION.UPDATE_USER_SUCCESS: {
            return {
                isFetching: false,
                error: null,
                data: action.data
            }
        }
        case ACTION.UPDATE_USER_ERROR: {
            return {
                isFetching: false,
                error: action.error,
                data: null
            }
        }
        case ACTION.CLEAR_UPDATE_USER_STORE:{
            return initialState;
        }
        default:
            return state;
    }
}