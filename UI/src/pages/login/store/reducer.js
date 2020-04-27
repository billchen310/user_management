import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = {
    isUserLogin: false,
    user: {},
    error: ''
};

const reducer = (state = defaultState, action) => {
    switch (action.type){
        case constants.USER_LOGIN:
            return Object.assign({}, state, {
                isUserLogin: true,
                user : action.payload.user,
                error: ''
            })
        case constants.USER_LOGIN_FAIL:
            return Object.assign({}, state, {
                isUserLogin: false,
                user : {},
                error: action.payload.error
            })
        case constants.USER_LOGOUT:
            return Object.assign({}, state, {
                isUserLogin: false,
                user : {},
                error: ''
            })
        default:
            return state;
    }
}

export default reducer;