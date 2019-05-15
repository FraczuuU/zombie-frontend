import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { getToken, setToken, removeToken } from '../services/auth' 

export const apiURL = 'http://52.15.143.180:3000'

function* loginUser(action) {
    if(action.payload !== undefined) {
        try {
            const res = yield call([axios, axios.post], apiURL + '/login', action.payload)
            if(res.data.token) {
                setToken(res.data.token)
                yield put({ type: 'LOGGED_IN' })
            } else
                yield put({ type: 'SHOW_MESSAGE', payload: 'Invalid username or password!' })
            
        } catch(err) {
            console.log('An error occured, try again later!')
        }
    }
}

function* registerUser(action) {
    if(action.payload !== undefined) {
        try {
            const res = yield call([axios, axios.post], apiURL + '/register', action.payload)
            if(res.data.msg) {
                yield put({ type: 'REGISTERED' })
            } else
                yield put({ type: 'SHOW_MESSAGE', payload: 'This e-mail is already in use!' })
        } catch(err) {
            console.log('An error occured, try again later!')
        }
    }
}

function* logoutUser() {
    removeToken('token') 
    yield put({ type: 'LOGGED_OUT' })      
}


function* getProfile(action) {
        const res = yield call([axios, axios.get], apiURL + '/users/profile?currency=' + action.payload, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }})
        const user = res.data.user
        const worth = res.data.worth
        if(user) {
            yield put({ type: 'SHOW_PROFILE', payload: { user, worth } })
        } else
            console.log('Error while getting items!')
}

function* getShop(action) {
    const res = yield call([axios, axios.get], apiURL + '/users/items/shop?currency=' + action.payload, {
        'headers': {
            'Authorization': 'Bearer ' + getToken()
    }})
    const items = res.data.items
    const money = res.data.money
    if(items) {
        yield put({ type: 'SHOW_SHOP', payload: { items, money } })
    } else
        console.log('Error while getting items!')
}

function* sellItem(action) {
    const res = yield call([axios, axios.delete], apiURL + '/users/items?id=' + action.payload, {
        'headers': {
            'Authorization': 'Bearer ' + getToken()
    }})
    if(res.data.msg) {
        yield put({ type: 'SOLD_ITEM' })
    } else if(res.data.errors[0].msg) {
        yield put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg })
    } else
        console.log('Error while getting items!')
}

function* buyItem(action) {
    const res = yield call([axios, axios.post], apiURL + '/users/items', { id: action.payload }, {
        'headers': {
            'Authorization': 'Bearer ' + getToken()
    }})
    if(res.data.msg) {
        yield put({ type: 'BOUGHT_ITEM' })
    } else if(res.data.errors[0].msg) {
        yield put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg })
    } else
        console.log('Error while getting items!')
}

function* changeEmail(action) {
    const res = yield call([axios, axios.patch], apiURL + '/users/', { email: action.payload }, {
        'headers': {
            'Authorization': 'Bearer ' + getToken()
    }})
    if(res.data.msg) {
        yield put({ type: 'CHANGED_EMAIL', payload: res.data.msg })
    } else if(res.data.errors[0].msg) {
        yield put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg })
    } else
        console.log('Error while changing e-mail!')
}


function* deleteUser(action) {
    const res = yield call([axios, axios.delete], apiURL + '/users/', {
        'headers': {
            'Authorization': 'Bearer ' + getToken()
    }})
    if(res.data.msg) {
        yield put({ type: 'DELETED_USER', payload: res.data.msg })
    } else if(res.data.errors[0].msg) {
        yield put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg })
    } else
        console.log('Error while deleting account!')
}

export function* loginUserWatcher() {
    yield takeLatest('LOGIN_USER', loginUser)
}

export function* registerUserWatcher() {
    yield takeLatest('REGISTER_USER', registerUser)
}

export function* logoutUserWatcher() {
    yield takeLatest('LOGOUT_USER', logoutUser)
}

export function* getProfileWatcher() {
    yield takeLatest('GET_PROFILE', getProfile)
}

export function* getShopWatcher() {
    yield takeLatest('GET_SHOP', getShop)
}

export function* sellItemWatcher() {
    yield takeLatest('SELL_ITEM', sellItem)
}

export function* buyItemWatcher() {
    yield takeLatest('BUY_ITEM', buyItem)
}

export function* changeEmailWatcher() {
    yield takeLatest('CHANGE_EMAIL', changeEmail)
}

export function* deleteUserWatcher() {
    yield takeLatest('DELETE_USER', deleteUser)
}

export function* rootSaga() {
    yield all([
        loginUserWatcher(),
        registerUserWatcher(),
        logoutUserWatcher(),
        getProfileWatcher(),
        sellItemWatcher(),
        getShopWatcher(),
        buyItemWatcher(),
        changeEmailWatcher(),
        deleteUserWatcher()
    ])
}