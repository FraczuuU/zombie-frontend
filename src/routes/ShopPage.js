import React from 'react';
import { connect } from 'react-redux'

import Shop from '../components/Shop'

import './ShopPage.css';

class ShopPage extends React.Component {
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
            <div className="ShopPage">
                <select className="Currency-Select" defaultValue={ this.props.currency } onChange={ (e) => this.currencyChange(e) }>
                    <option value={ 'PLN' }>PLN</option>
                    <option value={ 'EUR' }>EUR</option>
                    <option value={ 'USD' }>USD</option>
                </select>
                <Shop currency={ this.props.currency } />
                <input type="button" className="Shop-Button" onClick={ () => this.goBackButton() } value="Go back" />
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
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
