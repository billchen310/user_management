import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import * as actionCreators from '../store/actionCreators';

const GroupListItem = (props) => {
    const { index, loginUser, group, current_group, changeGroupStatus, selectGroup, addGroup, updateGroup, deleteGroup} = props;
    const [title, setTitle] = useState(group.name);

    function isActive(){
        return group.id === current_group.id;
    }

    function isSaveBtnDisabled(){
        return title.length === 0;
    }

    function renderGroupNameElement(){
        if (group.status !== 'view'){
            return <input className="name_input" placeholder='group name' type="text" 
                            maxLength="12" value={title} onChange={(e) => setTitle(e.target.value)}/>;
        } else {
            return <span className="group_user_name_label">{group.name}</span>;
        }
    }

    function renderBtnsForSelectedGroup(){
        if (loginUser.type === 'administrator' && group.status === 'view' && group.type !== 'administrator' && group.id === current_group.id){
            return (
                <Fragment>
                    <div className="operation_container">
                        <Button variant="danger" size="sm" onClick={() => deleteGroup(group.id)}>Delete</Button>
                    </div>
                    <div className="operation_container">
                        <Button variant="warning" size="sm" onClick={() => changeGroupStatus(group.id, 'update')}>Update</Button>
                    </div>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    function renderSaveBtns(){
        if (loginUser.type === 'administrator' && group.type !== 'administrator' && group.id === current_group.id){
            if (group.status === 'new'){
                return (
                    <div className="operation_container">
                        <Button variant="warning" size="sm" disabled={isSaveBtnDisabled()} onClick={() => addGroup(title)}>Create</Button>
                    </div>
                );
            } else if (group.status === 'update'){
                return (
                    <div className="operation_container">
                        <Button variant="warning" size="sm" disabled={isSaveBtnDisabled()} onClick={() => updateGroup(group.id, title)}>Save</Button>
                    </div>
                );
            } 
        } 

        return null;
    }

    return (
        <ListGroup.Item action active={isActive()} href={'#href_group_' + index} onClick={() => selectGroup(group)}>
            {renderGroupNameElement()}
            {renderBtnsForSelectedGroup()}                
            {renderSaveBtns()}
        </ListGroup.Item>
    )
}

const mapState = (state) => ({
    current_group: state.get('home').current_group,
    loginUser: state.get('login').user
});

const mapDispatch = (dispatch) => ({
    selectGroup(group){
        dispatch(actionCreators.selectGroup(group));
    },
    changeGroupStatus(id, status){
        dispatch(actionCreators.setGroupStatus(id, status));
    },
    addGroup(name){
        dispatch(actionCreators.addGroup(name));
    },
    updateGroup(id, new_name){
        dispatch(actionCreators.updateGroup(id, new_name))
    },
    deleteGroup(id){
        dispatch(actionCreators.deleteGroup(id));
    }
})

export default connect(mapState, mapDispatch)(GroupListItem);