import React from 'react';
import { connect } from 'react-redux'

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import './HomePage.css';

class HomePage extends React.Component {
    componentDidUpdate() {
        if(this.props.loggedOut === true) {
            this.props.history.push('/login')
            toaster.notify('Successfully logged out!', {
                duration: 1000
            })
        }
    }

    goToProfile() {
        this.props.history.push('/profile')
    }

    goToShop() {
        this.props.history.push('/shop')
    }

    goToSettings() {
        this.props.history.push('/settings')
    }

    render() {
        return (
            <div className="HomePage">
                <h1 className="HomePage-H1">Home Page</h1>
                <input type="button" onClick={ () => this.goToProfile() } value="Profile" />
                <input type="button" onClick={ () => this.goToShop() } value="Shop" />
                <input type="button" onClick={ () => this.goToSettings() } value="Settings" />
                <input type="button" onClick={ () => this.props.logoutUser() } value="Logout" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        loggedOut: state.loggedOut
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        logoutUser: () => {
            dispatch({
                type: 'LOGOUT_USER'
            })
        }
    })
}
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
