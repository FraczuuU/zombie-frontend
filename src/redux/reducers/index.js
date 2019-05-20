const initialState = {
    user: {
        worth: '',
        money: '',
        email: '',
        createdAt: '',
        items: []
    },
    shop: [],
    currency: 'PLN',
    loggedIn: false,
    registered: false,
    loggedOut: false,
    soldItem: false,
    boughtItem: false,
    invalidToken: false,
    message: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case 'TOKEN_INVALID' : {
            return { ...state, invalidToken: true }
        }

        case 'LOGGED_IN' : {
            return { ...state, loggedIn: true, loggedOut: false }
        }

        case 'REGISTERED' : {
            return { ...state, registered: true }
        }

        case 'LOGGED_OUT' : {
            return { ...state, loggedOut: true, loggedIn: false }
        }

        case 'CHANGE_CURRENCY' : {
            return { ...state, currency: action.payload }
        }

        case 'SOLD_ITEM' : {
            return { ...state, soldItem: true }
        }

        case 'BOUGHT_ITEM' : {
            return { ...state, boughtItem: true }
        }

        case 'RESET_SOLD' : {
            return { ...state, soldItem: false }
        }

        case 'RESET_BOUGHT' : {
            return { ...state, boughtItem: false }
        }

        case 'RESET_REGISTERED' : {
            return { ...state, registered: false }
        }

        case 'SHOW_PROFILE' : {
            return { ...state,
                user: {
                    worth: action.payload.worth,
                    money: action.payload.user.money,
                    email: action.payload.user.email,
                    createdAt: action.payload.user.createdAt,
                    items: action.payload.user.items
                },
            }
        }

        case 'SHOW_SHOP' : {
            return { ...state,
                shop: action.payload.items,
                user: {
                    money: action.payload.money
                }
            }
        }

        case 'SHOW_MESSAGE' : {
            return { ...state,
                message: action.payload
            }
        }

        case 'RESET_MESSAGE' : {
            return { ...state, message: '' }
        }

        case 'CHANGED_EMAIL' : {
            return { ...state, message: action.payload }
        }

        case 'DELETED_USER' : {
            return { ...state, message: action.payload }
        }

        default: 
            return state
    }
}

export default reducer