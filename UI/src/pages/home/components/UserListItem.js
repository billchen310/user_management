import React, {Fragment, useState, useEffecct, useEffect} from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import * as actionCreators from '../store/actionCreators';

const UserListItem = (props) => {
    const { user, loginUser, groups, current_group, current_user_id, changeUserStatus, selectUser, addUser, updateUser, deleteUser} = props;
    const [title, setTitle] = useState(user.username);
    const [targetGroup, setTargetGroup] = useState(current_group.id);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(false);
        setIsActive(user.id === current_user_id);
    });

    function selectGroup(e) {
        setTargetGroup(e.target.value);
    }

    function isSaveBtnDisabled(){
        return title.length === 0;
    }

    function renderUserNameElement(){
        if (user.status !== 'view'){
            return <input className="name_input" placeholder='user name' type="text" 
                            maxLength="16" value={title} onChange={(e) => setTitle(e.target.value)}/>;
        } else {
            return <span className="group_user_name_label">{user.username}</span>;
        }
    }

    function renderGroupOptionsList(){
        return (
            user.status === 'update'?
            <select className="group_select" value={targetGroup} onChange={selectGroup}>
            {
                groups.map((group, index) =>
                    <option key={group.id} value={group.id}>{group.name}</option>
                )
            }
            </select>
            : null
        )
    }

    function renderBtnsForSelectedUser(){
        if (loginUser.type === 'administrator' && user.status === 'view' && loginUser.id !== user.id && current_user_id === user.id){
            return (
                <Fragment>
                    <div className="operation_container">
                        <Button variant="danger" size="sm" onClick={() => deleteUser(user.id, user.group_id)}>Delete</Button>
                    </div>
                    <div className="operation_container">
                        <Button variant="warning" size="sm" onClick={() => changeUserStatus(user.id, 'update')}>Update</Button>
                    </div>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    function renderSaveBtns(){
        if (loginUser.type === 'administrator' && loginUser.id !== user.id){
            if (user.status === 'new'){
                return (
                    <div className="operation_container">
                        <Button variant="warning" size="sm" disabled={isSaveBtnDisabled()} onClick={() => addUser(user.id, title, current_group.id)}>Create</Button>
                    </div>
                );
            } else if (user.status === 'update'){
                return (
                    <div className="operation_container">
                        <Button variant="warning" size="sm" disabled={isSaveBtnDisabled()} onClick={() => updateUser(user.id, title, targetGroup)}>Save</Button>
                    </div>
                );
            } 
        } 

        return null;
    }

    return (
        <ListGroup.Item action active={isActive} href={'#href_user_' + user.id} onClick={() => selectUser(user.id)}>
            {renderUserNameElement()}
            {renderGroupOptionsList()}
            {renderBtnsForSelectedUser()}                
            {renderSaveBtns()}
        </ListGroup.Item>
    )
}

const mapState = (state) => ({
    groups: state.get('home').groups,
    current_group: state.get('home').current_group,
    current_user_id: state.get('home').current_user_id,
    loginUser: state.get('login').user
});

const mapDispatch = (dispatch) => ({
    selectUser(id){
        dispatch(actionCreators.selectUser(id));
    },
    changeUserStatus(id, status){
        dispatch(actionCreators.setUserStatus(id, status));
    },
    addUser(id, name, group_id){
        dispatch(actionCreators.addUser(id, name, group_id));
    },
    updateUser(id, new_name, group_id){
        dispatch(actionCreators.updateUser(id, new_name, group_id))
    },
    deleteUser(id, group_id){
        dispatch(actionCreators.deleteUser(id, group_id));
    }
})

export default connect(mapState, mapDispatch)(UserListItem);