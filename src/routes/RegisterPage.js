import React from 'react'
import { connect } from 'react-redux'

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import * as validator from 'email-validator';

import './RegisterPage.css';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  onChangeEmail(e) {
    let newEmail = e.target.value
    this.setState({
      email: newEmail
    })
  }

  onChangePassword(e) {
    let newPassword = e.target.value
    this.setState({
      password: newPassword
    })
  }

  onChangeConfirmPassword(e) {
    let newConfirmPassword = e.target.value
    this.setState({
      confirmPassword: newConfirmPassword
    })
  }

  componentDidUpdate() {
    const { resetMessage, resetRegistered } = this.props

    if(this.props.message) {
        toaster.notify(this.props.message, {
            duration: 1000
        })
        resetMessage()
    }

    if(this.props.registered === true) {
      this.props.history.push('/login')
      toaster.notify('Successfully registered! You can login now!', {
        duration: 1000
      })
      resetRegistered()
    }
  }

  goToLogin() {
    this.props.history.push('/login')
  }

  registerUserButton() {
    const { registerUser } = this.props

    if(!validator.validate(this.state.email)) {
      return toaster.notify("You have to enter valid e-mail!", {
        duration: 1000
      })
    } else if(this.state.password.length < 5) {
      return toaster.notify("Password has to be at least 5 characters long!", {
        duration: 1000
      })
    } else if(this.state.password !== this.state.confirmPassword) {
      return toaster.notify("Passwords don't match!", {
        duration: 1000
      })
    } else {
      registerUser(this.state.email, this.state.password)
    } 
  }

  render() {
    return (
      <div className="RegisterPage">
        <h1 className="RegisterPage-H1">Register Page</h1>
        <form className="RegisterPage-Form">
          <input type="text" onChange={ (e) => this.onChangeEmail(e) } value={ this.state.email } placeholder="E-mail" />
          <input type="password" onChange={ (e) => this.onChangePassword(e) } value={ this.state.password } placeholder="Password" />
          <input type="password" onChange={ (e) => this.onChangeConfirmPassword(e) } value={ this.state.confirmPassword } placeholder="Confirm password" />
          <input type="button" onClick={ () => this.registerUserButton() } value="Register" />
        </form>
        <p className="login-link" onClick={ () => this.goToLogin() }>I already have an account</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    registered: state.registered,
    message: state.message
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    registerUser: (email, password) => {
      dispatch({
        type: 'REGISTER_USER',
        payload: { email: email, password: password }
      })
    },

    resetMessage: () => {
        dispatch({
            type: 'RESET_MESSAGE'
        })
    },

    resetRegistered: () => {
      dispatch({
          type: 'RESET_REGISTERED'
      })
  }
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
