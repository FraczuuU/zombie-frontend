import axios from 'axios'
import { changeEmail, apiURL } from '../sagas/index'
import { call, put } from 'redux-saga/effects'
import { getToken } from '../services/auth'

describe('Change Email', () => {
    it('Successfully change email', done => {

        const action = {
            payload: 'email@mail.com'
        }

        const res = {
            data: {
                msg: 'success'
            }
        }

        const generator = changeEmail(action)

        expect(generator.next().value).toEqual(call([axios, axios.patch], apiURL + '/users/', { email: action.payload }, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'CHANGED_EMAIL', payload: res.data.msg }))

        done()
    })
    it('Get an error', done => {

        const action = {
            payload: 'email@mail.com'
        }

        const res = {
            data: {
                errors: [{
                    msg: 'error'
                }]
            }
        }

        const generator = changeEmail(action)

        expect(generator.next().value).toEqual(call([axios, axios.patch], apiURL + '/users/', { email: action.payload }, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg }))

        done()
    })
})

