import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actionCreators from '../store/actionCreators';

const CreateUserBtn = (props) => {
    const {current_group, appendUser} = props;
    return (
        <div className="new_group_user_btn_container">
            <Button variant="primary" onClick={() => appendUser(current_group.id)}>Create</Button>
        </div>
    );
}

const mapState = (state) => ({
    current_group: state.get('home').current_group
});

const mapDispatch = (dispatch) => ({
    appendUser(group_id){
        dispatch(actionCreators.appendNewUser(group_id));
    }
});

export default connect(mapState, mapDispatch)(CreateUserBtn);