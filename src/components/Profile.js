import React from 'react';
import { connect } from 'react-redux'

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            currency: this.props.currency
        }
    }

    componentWillMount() {
        const { getProfile } = this.props
        getProfile(this.props.currency)
        this.setState({
            loaded: true
        })
    }

    componentDidUpdate(prevState) {
        const { getProfile, resetSold, resetMessage } = this.props
        if(this.props.soldItem) {
            getProfile(this.props.currency)
            toaster.notify('Successfully sold an item!', {
                duration: 1000
            })
            resetSold()
        }

        if(this.props.message) {
            toaster.notify(this.props.message, {
                duration: 1000
            })
            resetMessage()
        }

        if(prevState.currency !== this.props.currency) {
            getProfile(this.props.currency)
        }

    }

    render() {
        if (!this.state.loaded) return null
        return (
            <div className="Profile">
                <h3 className="Profile-Email">E-mail: { this.props.user.email }</h3>
                <span className="Profile-CreatedAt">Created: { (this.props.user.createdAt) ? this.props.user.createdAt.slice(0, 10) : null }</span>

                <p className="Profile-Items-P">Items:</p>

                <ul className="Profile-List">
                    { (this.props.user.items) ? this.props.user.items.map((item) => 
                    <div key={ item.id } className="Profile-Item">
                        <li>
                            <span>{ item.name }</span>
                            <span>{ Math.round(item.price) + ' ' + this.props.currency }</span>
                        </li>
                        <input type="button" className="Item-Sell" onClick={ () => this.props.sellItem(item.id) } value="Sell" />
                    </div>
                    ) : null }
                </ul>

                <p className="Profile-Worth">Worth: { Math.round(this.props.user.worth) + ' ' + this.props.currency }</p>
                <p className="Profile-Money">Money: { Math.round(this.props.user.money) + ' ' + this.props.currency }</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        soldItem: state.soldItem,
        message: state.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        getProfile: (currency) => {
            dispatch({
                type: 'GET_PROFILE',
                payload: currency
            })
        },

        sellItem: (id) => {
            dispatch({
                type: 'SELL_ITEM',
                payload: id
            })
        },

        resetSold: () => {
            dispatch({
                type: 'RESET_SOLD'
            })
        },

        resetMessage: () => {
            dispatch({
                type: 'RESET_MESSAGE'
            })
        } 
    })
}
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
