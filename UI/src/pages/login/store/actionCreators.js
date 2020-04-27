import * as constants from './constants';
import AuthService from '../../../services/AuthService';
import GroupService from '../../../services/GroupService';
import UserService from '../../../services/UserService';
import {setGroups, selectUser} from '../../home/store/actionCreators';

const setLoginData = (user) => ({
    type: constants.USER_LOGIN,
    payload: user
});

const setLoginError = (error) => ({
    type: constants.USER_LOGIN_FAIL,
    payload: {error}
})

const setLogout = () => ({
    type: constants.USER_LOGOUT
})

export const login = (username, password) => {
    return (dispatch) => {
        AuthService.login(username, password).then((res) => {
            if (res.success){
                let user = res.user;
                dispatch(setLoginData({user}));
                GroupService.getAll().then((res) => {
                    let groups = res.map((group) => ({...group, status: 'view'}));
                    let current_group = groups.find((x) => x.id === user.group_id);
                    UserService.getUserByGroup(current_group.id).then((res) => {
                        let users = res.map((user) => ({...user, status: 'view'}));
                        dispatch(setGroups(groups, current_group, users));
                        dispatch(selectUser(user.id));
                    });
                })
            } else {
                dispatch(setLoginError(res.message));
            }  
        });
    };
}

export const logout = () => {
    return (dispatch) => {
        dispatch(setLogout());
    };
}