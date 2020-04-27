import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import * as loginActionCreators from '../pages/login/store/actionCreators';

const Header = (props) => {
    const { user, logout, isLogin } = props;
    return (
        isLogin ?
        <div className="header_home">
            <div className="left_container"></div>
            <div className="middle_container">User Management</div>
            <div className="user_name_area">
                <div className="user_name_icon"><FaUserAlt /></div>
                <div className="user_name_label">{user.username}</div>
            </div>
            <div className="logout_btn_container">
                <Button variant="info" className="logout_btn" onClick={logout}>Logout</Button>
            </div>
        </div> :
        <div className="header_login">User Management</div>
    )
};

const mapState = (state) => ({
    user: state.get('login').user,
    isLogin: state.get('login').isUserLogin
});

const mapDispatch = (dispatch) => ({
    logout(){
        dispatch(loginActionCreators.logout());
    }
})

export default connect(mapState, mapDispatch)(Header);