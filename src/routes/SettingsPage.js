import React from 'react';
import { connect } from 'react-redux'

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import { removeToken } from '../services/auth'

import './SettingsPage.css';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            confirm: false,
        }

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
        this.props.history.push('/')
    }

    onChangeEmail(e) {
        let newEmail = e.target.value
        this.setState({
            email: newEmail
        })
    }

    deleteAccount() {
        const { deleteUser } = this.props
        deleteUser()
        this.setState({
            email: ''
        })
        removeToken()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="SettingsPage">
                <h1 className="SettingsPage-H1">Settings Page</h1>
                <input type="text" onChange={ (e) => this.onChangeEmail(e) } placeholder="E-mail" value={ this.state.email } />
                <input type="button" onClick={ () => this.props.changeEmail(this.state.email) } value="Change E-mail" />
                { (this.state.confirm) 
                ? <input type="button" onClick={ () => this.deleteAccount() } value="Are you sure?" />
                : <input type="button" onClick={ this.setState({ confirm: true }) } value="Delete account" /> }
                <input type="button" onClick={ () => this.goBackButton() } value="Go back" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        message: state.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        changeEmail: (email) => {
            dispatch({
                type: 'CHANGE_EMAIL',
                payload: email
            })
        },

        deleteUser: () => {
            dispatch({
                type: 'DELETE_USER'
            })
        },

        resetMessage: () => {
            dispatch({
                type: 'RESET_MESSAGE'
            })
        }
    })
}
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
