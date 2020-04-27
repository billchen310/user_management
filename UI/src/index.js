import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import LoadingSpinner from './utilities/LoadSpinner';

const wrapper = document.getElementById("root");

wrapper ? 
ReactDOM.render(
    <Fragment>
        <App />
        <LoadingSpinner area="whole"/>
    </Fragment>
    ,
    document.getElementById('root')
) : false;

module.hot.accept();
