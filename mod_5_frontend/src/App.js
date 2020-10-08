import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header'
import BookContainer from './Components/BookContainer'
import BookForm from './Components/BookForm'

import Login from './Components/auth/Login'
import SignUp from './Components/auth/SignUp'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// import staticBooks from './books'

class App extends Component {

  state = {
    isLoggedIn: false
  }

  componentDidMount(){
    if(localStorage.getItem('auth_key')){
      this.setState({ isLoggedIn: true })
    }
  }

  handleBookSubmit = (newBook) => {
    this.setState({ books: [...this.state.books, newBook], addingBook: false })
  }

  handleLogin = () => {
    if(localStorage.getItem('auth_key')){
      this.setState({ isLoggedIn: true })
    }
  }

  render(){
    return (
      <div className="parent">
        <BrowserRouter>

          <Header isLoggedIn={this.state.isLoggedIn} />

          <Switch>

            <Route exact path="/" component={() => {
              if(localStorage.getItem('auth_key')){
                return <BookContainer />
              }else{
                return <Redirect to="/login" />
              }
            }} />

            <Route exact path="/newbook">
              <BookForm handleBookSubmit={this.handleBookSubmit} />
            </Route>

            <Route path="/login" component={() => {
              return <Login handleLogin={this.handleLogin} />
            }} />

            <Route path="/signup" component={SignUp} />

            <Route path="/logout" component={() => {
              localStorage.clear()
              this.setState({ isLoggedIn: false })
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
}

export default App;