import * as constants from './constants';

const defaultState = {
    groups: [],
    users: [],
    current_group: {id: -1},
    current_user_id: -1,
    server_error_group: '',
    server_error_user: ''
};

const reducer = (state = defaultState, action) => {
    switch (action.type){
        case constants.APPEND_GROUP:
            let existing_group_ids = state.groups.map((group) => group.id);
            let new_group_id = Math.max(...existing_group_ids) + 1;
            let empty_group = {
                id: new_group_id,
                name: '',
                type: 'user',
                status: 'new'
            }
            return Object.assign({}, state, {
                current_group: empty_group, 
                groups: [...state.groups, empty_group],
                server_error_group: '',
                server_error_user: ''
            });
        case constants.SET_GROUP_STATUS:
            return Object.assign({}, state, {
                groups : state.groups.map((item) => {
                    if(item.id === action.payload.id) {
                        return {
                            ...item, 
                            status: action.payload.status 
                        }
                    }
                    return item;
                }), 
                current_group: {
                    ...state.current_group,
                    status: action.payload.status
                },
                server_error_group: '',
                server_error_user: ''
            })
        case constants.SET_USER_STATUS:
            return Object.assign({}, state, {
                users : state.users.map((item) => {
                    if(item.id === action.payload.id) {
                        return {
                        ...item, 
                        status: action.payload.status 
                        }
                    }
                    return item;
                }), 
                server_error_group: '',
                server_error_user: ''
            });
        case constants.SELECT_GROUP:
            return Object.assign({}, state, {
                current_group: action.payload.group,
                users: action.payload.users,
                current_user_id: action.payload.users.length > 0 ? action.payload.users[0].id : -1
            });
        case constants.SET_GROUPS:
            if (action.payload.users){
                return Object.assign({}, state, {
                    groups: action.payload.groups,
                    current_group: action.payload.current_group,
                    users: action.payload.users,
                    current_user_id: action.payload.users.length > 0 ? action.payload.users[0].id : -1,
                    server_error_group: '',
                    server_error_user: ''
                });
            } else {
                return Object.assign({}, state, {
                    groups: action.payload.groups,
                    current_group: action.payload.current_group,
                    server_error_group: '',
                    server_error_user: ''
                });
            }
        case constants.SELECT_USER:
            return Object.assign({}, state, {
                current_user_id: action.payload.id
            });
        case constants.APPEND_USER:
            let empty_user = {
                id: action.payload.new_user_id,
                username: '',
                group_id: action.payload.group_id,
                status: 'new'
            }
            return Object.assign({}, state, {
                users: [...state.users, empty_user],
                current_user_id: action.payload.new_user_id,
                server_error_group: '',
                server_error_user: ''
            });
        case constants.SET_USERS:
            return Object.assign({}, state, {
                users: action.payload.users,
                current_user_id: action.payload.current_user_id,
                server_error_group: '',
                server_error_user: ''
            });
        case constants.SET_SERVER_ERROR_GROUP:
            return Object.assign({}, state, {
                server_error_group: action.payload.error
            });
        case constants.SET_SERVER_ERROR_USER:
            return Object.assign({}, state, {
                server_error_user: action.payload.error
            });
        default:
            return state;
    }
}

export default reducer;