import React, { useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from './store/actionCreators';
import ErrorMessage from '../../common/ErrorMessage'
import Header from '../../common/Header';

const Login = (props) => {
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);
    const { isLogin, login, error } = props;

    function handleSubmit(e){
      login(usernameEl, passwordEl);
      e.preventDefault();
    }

    return (
      isLogin ? 
      <Redirect to='/home'/> :
      <Fragment>
        <Header />
        <div className="login_container">
          <form onSubmit={handleSubmit}>
            <input className="login_input" placeholder='user name' type="text" ref={usernameEl}></input>
            <input className="login_input" placeholder='password' type="password" ref={passwordEl}></input>
            <button type="submit" className="login_submit_btn" value ="Submit">Login</button>
          </form>
          <ErrorMessage text={error}/>
        </div>
      </Fragment>
    );
}

const mapState = (state) => ({
    isLogin: state.get('login').isUserLogin,
    error: state.get('login').error
});

const mapDispatch = (dispatch) => ({
  login(usernameEl, passwordEl){
      dispatch(actionCreators.login(usernameEl.current.value, passwordEl.current.value));
  }
})

export default connect(mapState, mapDispatch)(Login);