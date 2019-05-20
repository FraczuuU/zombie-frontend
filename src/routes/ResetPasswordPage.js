import React from 'react'
import { connect } from 'react-redux'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import './ResetPasswordPage.css';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: '',
      password: '',
      confirmPassword: '',
      invalidToken: ''
    }
  }

  componentDidMount = async () => {
    const { match: { params }, checkToken } = this.props
    this.setState({ token: params.token })
    checkToken(params.token)
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
    const { resetMessage } = this.props

    if(this.props.invalidToken) {
        toaster.notify(this.props.invalidToken, {
          duration: 1000
        })
        this.props.history.push('/')
    }
    

    if(this.props.message) {
        toaster.notify(this.props.message, {
            duration: 1000
        })
        resetMessage()
    }
  }

  goBackButton() {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="ResetPasswordPage">
        <h1 className="ResetPasswordPage-H1">Reset Password</h1>
        <form className="ResetPasswordPage-Form">
          <input type="password" onChange={ (e) => this.onChangePassword(e) } value={ this.state.password } placeholder="Password" />
          <input type="password" onChange={ (e) => this.onChangeConfirmPassword(e) } value={ this.state.confirmPassword } placeholder="Confirm Password" />
          <input type="button" onClick={ () => this.props.resetPassword(this.state.token, this.state.password, this.state.confirmPassword) } value="Reset Password" />
        </form>
        <input type="button" className="ResetPasswordPage-Button" onClick={ () => this.goBackButton() } value="Go back" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    message: state.message,
    invalidToken: state.invalidToken
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    resetPassword: (token, password, confirmPassword) => {
      dispatch({
        type: 'RESET_PASSWORD',
        payload: { token: token, password: password, confirmPassword: confirmPassword }
      })
    },

    checkToken: (token) => {
      dispatch({
        type: 'CHECK_RESET_TOKEN',
        payload: { token: token }
      })
    },

    resetMessage: () => {
        dispatch({
            type: 'RESET_MESSAGE'
        })
    }
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
