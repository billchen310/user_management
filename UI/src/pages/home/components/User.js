import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import CreateUserBtn from './CreateUserBtn';
import UserListItem from './UserListItem';
import ErrorMessage from '../../../common/ErrorMessage'

const User = (props) => {
    const {users, loginUser, current_group, server_error_user} = props;

    return (
        <div className="info_container">
            <h5 className="title"><strong>Users in {current_group.name}</strong></h5>
            {
                loginUser.type === 'administrator' ? 
                <CreateUserBtn /> :
                null
            }  
            {
                users.length > 0 ?
                <Fragment>
                    <div className="list_container">
                        <ListGroup>
                        {
                            users.map((user, index) => 
                                <UserListItem key={user.id} user={user} />
                            )
                        }
                        </ListGroup> 
                    </div>
                    <ErrorMessage text={server_error_user}/>
                </Fragment>
                :
                <ErrorMessage text='User does not exist.'/>
            }
        </div>
    )
}

const mapState = (state) => ({
    users: state.get('home').users,
    current_group: state.get('home').current_group,
    server_error_user: state.get('home').server_error_user,
    loginUser: state.get('login').user
});

export default connect(mapState, null)(User);