import React from 'react'
import { connect } from 'react-redux'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import './ForgotPasswordPage.css';

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }
  }

  onChangeEmail(e) {
    let newEmail = e.target.value
    this.setState({
      email: newEmail
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
  }

  goBackButton() {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="ForgotPasswordPage">
        <h1 className="ForgotPasswordPage-H1">Reset Password</h1>
        <form className="ForgotPasswordPage-Form">
          <input type="text" onChange={ (e) => this.onChangeEmail(e) } value={ this.state.email } placeholder="E-mail" />
          <input type="button" onClick={ () => this.props.sendResetEmail(this.state.email) } value="Send e-mail" />
        </form>
        <input type="button" className="ForgotPasswordPage-Button" onClick={ () => this.goBackButton() } value="Go back" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    message: state.message
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    sendResetEmail: (email) => {
      dispatch({
        type: 'SEND_RESET_EMAIL',
        payload: { email: email }
      })
    },

    resetMessage: () => {
        dispatch({
            type: 'RESET_MESSAGE'
        })
    }
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
