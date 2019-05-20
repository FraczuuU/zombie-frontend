import React from 'react'
import { connect } from 'react-redux'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
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

  componentDidUpdate() {
    const { resetMessage } = this.props

    if(this.props.message) {
        toaster.notify(this.props.message, {
            duration: 1000
        })
        resetMessage()
    }

    if(this.props.loggedIn === true) {
      this.props.history.push('/')
      toaster.notify('Successfully logged in!', {
        duration: 1000
      })
    }
  }

  goToRegister() {
    this.props.history.push('/register')
  }

  goToForgotPassword() {
    this.props.history.push('/forgot-password')
  }

  render() {
    return (
      <div className="LoginPage">
        <h1 className="LoginPage-H1">Login Page</h1>
        <form className="LoginPage-Form">
          <input type="text" onChange={ (e) => this.onChangeEmail(e) } value={ this.state.email } placeholder="E-mail" />
          <input type="password" onChange={ (e) => this.onChangePassword(e) } value={ this.state.password } placeholder="Password" />
          <input type="button" onClick={ () => this.props.loginUser(this.state.email, this.state.password) } value="Login" />
        </form>
        <p className="forgotPassword-link" onClick={ () => this.goToForgotPassword() }>Forgot password</p>
        <p className="register-link" onClick={ () => this.goToRegister() }>Create new account</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    loggedIn: state.loggedIn,
    message: state.message
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginUser: (email, password) => {
      dispatch({
        type: 'LOGIN_USER',
        payload: { email: email, password: password }
      })
    },

    resetMessage: () => {
        dispatch({
            type: 'RESET_MESSAGE'
        })
    }
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
