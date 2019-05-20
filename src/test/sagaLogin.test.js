import axios from 'axios'
import MockAdapter from "axios-mock-adapter"
import { loginUser, apiURL } from '../sagas/index'
import { all, call, put, takeLatest } from 'redux-saga/effects'

describe('Login User', () => {
    it('Successfully login user', done => {

        const action = {
            payload: {
                email: 'valid@email.com',
                password: '12345'
            }
        }

        const res = {
            data: {
                token: 'token'
            }
        }

        const generator = loginUser(action)

        expect(generator.next().value).toEqual(call([axios, axios.post], apiURL + '/login', action.payload))
        expect(generator.next(res).value).toEqual(put({ type: 'LOGGED_IN' }))

        done()
    })
    it('Get an error', done => {

        const action = {
            payload: {
                email: 'invalid@email.com',
                password: '12345'
            }
        }

        const res = {
            data: {
                errors: [{
                    msg: 'error'
                }]
            }
        }

        const generator = loginUser(action)

        expect(generator.next().value).toEqual(call([axios, axios.post], apiURL + '/login', action.payload))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg }))

        done()
    })
})

