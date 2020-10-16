import React from 'react';
import './App.css';
import Login from './Components/auth/Login'
import SignUp from './Components/auth/SignUp'
import Paperbase from './Components/Paperbase'
import { connect } from 'react-redux';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


const App = (props) => {

  return (
    <div className="parent">
      <BrowserRouter>

        <Switch>

          <Route exact path="/" component={() => {
            if(localStorage.getItem('auth_key')){
              return <Redirect to="/home" />
            }else{
              return <Redirect to="/login" />
            }
          }} />

          <Route path="/login" component={() => {
            return <Login />
          }} />

          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={() => {
            if(localStorage.getItem('auth_key')){
              return <Paperbase/>
            }else{
              return <Redirect to="/login" />
            }
          }} />

          <Route path="/logout" component={() => {
            localStorage.clear()
            props.setClassList([])
            props.set_isLoggedIn(false)
            return <Redirect to="/login" />
          }} />

          <Route>
            <Redirect to="/" />
          </Route>

        </Switch>

      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
    password: state.password,
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_isLoggedIn: (value) => {dispatch({type: 'isLoggedIn', value: value})},
    setClassList: (list) => {dispatch({type: 'GET_CLASS', classList: list})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);