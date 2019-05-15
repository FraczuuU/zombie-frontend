import axios from 'axios'
import decode from 'jwt-decode'

import { apiURL } from '../sagas/index'

export const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
        return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const getTokenData = () => {
    let data = decode(getToken());
    return data;
}   

export const loggedIn =  async () => {
    try {
        const token = getToken()
        const response = await axios.post(apiURL + '/auth', { token: token })
        if(response.data.msg) return true
        else return false
    } catch(err) {
        return false
    }

}
