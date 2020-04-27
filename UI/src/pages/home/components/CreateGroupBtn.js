import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actionCreators from '../store/actionCreators';

const CreateGroupBtn = (props) => {
    const {appendGroup} = props;
    return (
        <div className="new_group_user_btn_container">
            <Button variant="primary" onClick={() => appendGroup()}>Create</Button>
        </div>
    );
}

const mapDispatch = (dispatch) => ({
    appendGroup(){
        dispatch(actionCreators.appendGroup());
    }
});

export default connect(null, mapDispatch)(CreateGroupBtn);