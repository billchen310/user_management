import React, {Fragment} from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/' exact component={Login}></Route>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;