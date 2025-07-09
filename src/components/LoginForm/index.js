import { Component } from "react";
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

import './index.css'
class LoginForm extends Component{
  state={
    username:'',
    password:'',
     showSubmitError: false,
    errorMsg: '',

  }
   onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }
  onInput=event=>{
      this.setState({password:event.target.value})
  }
  onUsername=event=>{
    this.setState({username:event.target.value})
  }
  submitform= async event=>{
    event.preventDefault()
    const {username,password}=this.state
    const userDetails={username,password}
    const url="https://fakestoreapi.com/auth/login"
    const options = {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
  },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options);
const text = await response.text(); // get raw response

try {
  const data = JSON.parse(text); // try parsing
  if (response.ok) {
    this.onSubmitSuccess(data.token || data.jwt_token);
  } else {
    this.onSubmitFailure(data.message || 'Login failed');
  }
} catch (error) {
  console.error("Invalid JSON:", text);
  this.onSubmitFailure(text || 'Unexpected error occurred');
}
console.log(JSON.stringify(userDetails));

   

  }
    renderPasswordField=()=>{
      const {password}=this.state
        return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onInput}
       
        />
      </>
    )
    }
     renderUsernameField = () => {
    const {username}=this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
         onChange={this.onUsername}
        />
      </>
    )
  }
    render(){
      const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" replace />

    }
        return(
            <div className="login-page-container">
                <img src="https://i.pinimg.com/736x/ae/7a/1a/ae7a1a88969e9c06437ec15ed2bd77dd.jpg" alt="login-page"
                className="login-img"/>
                <form onSubmit={this.submitform} className="form-container">
                <img src="https://i.pinimg.com/736x/d0/12/d8/d012d8e4913401c0b6d706c83d737b2e.jpg" className="webiste-logoo" alt="website-logo"/>
                 <div className="input-container">{this.renderUsernameField()}</div>
                 <div className="input-container ">{this.renderPasswordField()}</div>
                 <button type="submit" className="login-button">
            Login
          </button>
           {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                </form>
                </div>
        )
    }
}
export default LoginForm