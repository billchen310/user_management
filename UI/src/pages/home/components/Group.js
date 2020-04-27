import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import CreateGroupBtn from './CreateGroupBtn';
import GroupListItem from './GroupListItem';
import ErrorMessage from '../../../common/ErrorMessage';

const Group = (props) => {
    const {groups, server_error_group, loginUser} = props;
    return (
        <div className="info_container">
            <h5 className="title"><strong>Group</strong></h5>
            {
                loginUser.type === 'administrator' ? 
                <CreateGroupBtn /> :
                null
            }    
            <div className="list_container">
                <ListGroup defaultActiveKey="#href0">
                {
                    groups.map((group, index) => 
                        <GroupListItem key={group.id} index={index} group={group} />
                    )
                }
                </ListGroup> 
            </div>
            <ErrorMessage text={server_error_group}/>
        </div>
    )
}

const mapState = (state) => ({
    groups:state.get('home').groups,
    server_error_group: state.get('home').server_error_group,
    loginUser: state.get('login').user
});

export default connect(mapState, null)(Group);