import axios from 'axios'
import { registerUser, apiURL } from '../sagas/index'
import { call, put } from 'redux-saga/effects'

describe('Register User', () => {
    it('Successfully register user', done => {

        const action = {
            payload: {
                email: 'valid@email.com',
                password: '12345'
            }
        }

        const res = {
            data: {
                msg: 'registered'
            }
        }

        const generator = registerUser(action)

        expect(generator.next().value).toEqual(call([axios, axios.post], apiURL + '/register', action.payload))
        expect(generator.next(res).value).toEqual(put({ type: 'REGISTERED' }))

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

        const generator = registerUser(action)

        expect(generator.next().value).toEqual(call([axios, axios.post], apiURL + '/register', action.payload))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg }))

        done()
    })
})

