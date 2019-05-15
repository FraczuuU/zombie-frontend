import React from 'react';
import { connect } from 'react-redux'

import Profile from '../components/Profile'

import './ProfilePage.css';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            auth: false,
            loaded: false,
        }
    }

    goBackButton() {
        this.props.history.push('/')
    }

    currencyChange(e) {
        const option = e.target.value
        const { changeCurrency } = this.props
        changeCurrency(option)
    }

    render() {
        return (
            <div className="ProfilePage">
                <select className="Currency-Select" defaultValue={ this.props.currency } onChange={ (e) => this.currencyChange(e) }>
                    <option value={ 'PLN' }>PLN</option>
                    <option value={ 'EUR' }>EUR</option>
                    <option value={ 'USD' }>USD</option>
                </select>
                <Profile currency={ this.props.currency } />
                <input type="button" className="Profile-Button" onClick={ () => this.goBackButton() } value="Go back" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        currency: state.currency
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        changeCurrency: (currency) => {
            dispatch({
                type: 'CHANGE_CURRENCY',
                payload: currency
            })
        }
    })
}
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
