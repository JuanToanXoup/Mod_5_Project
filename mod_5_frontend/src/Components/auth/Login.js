import React from 'react';
import {
  withRouter
} from 'react-router';

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('http://localhost:3001/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
    .then(token => {
      localStorage.setItem('auth_key',token['auth_key'])
      this.props.handleLogin()
      this.props.history.push('/')
    })
  }

  render(){
    return (
      <span className={'form-outer'}>
        <h2> Login </h2>
        <form className={'add-book'} onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} onChange={this.handleInputChange} name='username' placeholder="Username"  />
          <input type="password" value={this.state.password} onChange={this.handleInputChange} name='password' placeholder="Password"  />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </span>
    )
  }
}

export default withRouter(Login);