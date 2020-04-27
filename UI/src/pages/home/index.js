import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../common/Header';
import Group from './components/Group';
import User from './components/User';


const Home = (props) => {
    const { isLogin } = props;
    return (
        isLogin ? 
        <Fragment>
            <Header />
            <div className="home_container">
                <div className="group_user_container">
                    <Group />
                    <User />
                </div>
            </div>
        </Fragment>
         :
        <Redirect to='/'/>
    );
};

const mapState = (state) => ({
    isLogin: state.get('login').isUserLogin
});

export default connect(mapState, null)(Home);

