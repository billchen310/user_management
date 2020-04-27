import * as constants from './constants';
import GroupService from '../../../services/GroupService';
import UserService from '../../../services/UserService';

const setCurrentGroupAndUsers = (group, users) => ({
    type: constants.SELECT_GROUP,
    payload: {group, users}
});

export const setGroups = (groups, current_group, users) => ({
    type: constants.SET_GROUPS,
    payload: {groups, current_group, users}
});

export const appendGroup = () => ({
    type: constants.APPEND_GROUP
});

const appendUser = (new_user_id, group_id) => ({
    type: constants.APPEND_USER,
    payload: {new_user_id, group_id}
});

const setUsers = (users, current_user_id) => ({
    type: constants.SET_USERS,
    payload: {users, current_user_id}
});

const setServerError = (type, error) => ({
    type: type === 'group' ? constants.SET_SERVER_ERROR_GROUP : constants.SET_SERVER_ERROR_USER,
    payload: {error}
});

export const selectUser = (id) => ({
    type: constants.SELECT_USER,
    payload: {id}
})

export const setGroupStatus = (id, status) => ({
    type: constants.SET_GROUP_STATUS,
    payload: {id, status}
})

export const setUserStatus = (id, status) => ({
    type: constants.SET_USER_STATUS,
    payload: {id, status}
})

export const selectGroup = (group) => {
    return (dispatch) => {
        UserService.getUserByGroup(group.id).then((res) => {
            let users = res.map((user) => ({...user, status: 'view'}));
            dispatch(setCurrentGroupAndUsers(group, users));
        })
    };
}

export const addGroup = (name) => {
    return (dispatch) => {
        GroupService.createGroup(name).then((res) => {
            if (res.success){
                let groups = res.groups.map((group) => ({...group, status: 'view'}));
                let new_group = {...res.new_group, status: 'view'};
                let users = [];
                dispatch(setGroups(groups, new_group, users));
            } else {
                dispatch(setServerError('group', res.message))
            }
        })
    }
}

export const updateGroup = (id, new_name) => {
    return (dispatch) => {
        GroupService.updateGroup(id, new_name).then((res) => {
            if (res.success){
                let groups = res.groups.map((group) => ({...group, status: 'view'}));
                let updated_group = {...res.updated_group, status: 'view'};
                dispatch(setGroups(groups, updated_group));
            } else {
                dispatch(setServerError('group', res.message));
            }
        });
    }
}

export const deleteGroup = (id) => {
    return (dispatch) => {
        GroupService.deleteGroup(id).then((res) => {
            let groups = res.groups.map((group) => ({...group, status: 'view'}));
            let current_group = groups.find((x) => x.id === 1);
            UserService.getUserByGroup(current_group.id).then((res) => {
                let users = res.map((user) => ({...user, status: 'view'}));
                dispatch(setGroups(groups, current_group, users));
            })
        });
    }
}

export const appendNewUser = (group_id) => {
    return (dispatch) => {
        UserService.getNewUserId().then((res) => {
            let new_id = res.new_id;
            dispatch(appendUser(new_id, group_id));
        });
    }
}

export const addUser = (id, name, group_id) => {
    return (dispatch) => {
        UserService.createUser(id, name, group_id).then((res) => {
            if (res.success){
                let users = res.users.map((user) => ({...user, status: 'view'}));
                dispatch(setUsers(users, id));
            } else {
                dispatch(setServerError('user', res.message));
            }     
        })
    }
}

export const updateUser = (id, new_name, group_id) => {
    return (dispatch) => {
        UserService.updateUser(id, new_name, group_id).then((res) => {
            if (res.success){
                let users = res.users.map((user) => ({...user, status: 'view'}));
                let isChangedGroup = users.find((x) => x.id === id);
                dispatch(setUsers(users, isChangedGroup ? -1 : id));
            } else {
                dispatch(setServerError('user', res.message));
            }
        });
    }
}

export const deleteUser = (id, group_id) => {
    return (dispatch) => {
        UserService.deleteUser(id, group_id).then((res) => {
            let users = res.users.map((user) => ({...user, status: 'view'}));
            dispatch(setUsers(users, users.length > 0 ? users[0].id : -1));
        });
    }
}

