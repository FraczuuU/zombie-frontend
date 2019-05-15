import React from 'react';
import { connect } from 'react-redux'

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import './Shop.css';

class Shop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            currency: this.props.currency
        }
    }

    componentWillMount() {
        const { getShop } = this.props
        getShop(this.props.currency)
        this.setState({
            loaded: true
        })
    }

    componentDidUpdate(prevState) {
        const { getShop, resetBought, resetMessage } = this.props
        if(this.props.boughtItem) {
            getShop(this.props.currency)
            toaster.notify('Successfully bought an item!', {
                duration: 1000
            })
            resetBought()
        }

        if(this.props.message) {
            toaster.notify(this.props.message, {
                duration: 1000
            })
            resetMessage()
        }

        if(prevState.currency !== this.props.currency) {
            getShop(this.props.currency)
        }

    }

    render() {
        if (!this.state.loaded) return null
        return (
            <div className="Shop">
                <p className="Shop-Items-P">Items:</p>

                <ul className="Shop-List">
                    { (this.props.shop) ? this.props.shop.map((item) => 
                    <div key={ item.id } className="Shop-Item">
                        <li>
                            <span>{ item.name }</span>
                            <span>{ Math.round(item.price) + ' ' + this.props.currency }</span>
                        </li>
                        <input type="button" className="Item-Buy" onClick={ () => this.props.buyItem(item.id) } value="Buy" />
                    </div>
                    ) : null }
                </ul>

                <p className="Shop-Money">Money: { Math.round(this.props.user.money) + ' ' + this.props.currency }</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        boughtItem: state.boughtItem,
        shop: state.shop,
        message: state.message
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        getShop: (currency) => {
            dispatch({
                type: 'GET_SHOP',
                payload: currency
            })
        },

        buyItem: (id) => {
            dispatch({
                type: 'BUY_ITEM',
                payload: id
            })
        },

        resetBought: () => {
            dispatch({
                type: 'RESET_BOUGHT'
            })
        },

        resetMessage: () => {
            dispatch({
                type: 'RESET_MESSAGE'
            })
        } 
    })
}
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
