import axios from 'axios'
import { getProfile, apiURL } from '../sagas/index'
import { call, put } from 'redux-saga/effects'
import { getToken } from '../services/auth' 


describe('Get Profile', () => {
    it('Successfully get profile', done => {

        const action = {
            payload: 'EUR'
        }

        const res = {
            data: {
                user: 'user',
                worth: 100
            }
        }

        const generator = getProfile(action)

        expect(generator.next().value).toEqual(call([axios, axios.get], apiURL + '/users/profile?currency=' + action.payload, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_PROFILE', payload: res.data }))

        done()
    })
    it('Get an error', done => {

        const action = {
            payload: 'EUR'
        }

        const res = {
            data: {
                errors: [{
                    msg: 'error'
                }]
            }
        }

        const generator = getProfile(action)

        expect(generator.next().value).toEqual(call([axios, axios.get], apiURL + '/users/profile?currency=' + action.payload, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: 'error' }))

        done()
    })
})

