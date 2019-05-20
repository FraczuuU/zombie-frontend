import axios from 'axios'
import { deleteUser, apiURL } from '../sagas/index'
import { call, put } from 'redux-saga/effects'
import { getToken } from '../services/auth'

describe('Delete User', () => {
    it('Successfully delete user', done => {
        const res = {
            data: {
                msg: 'success'
            }
        }

        const generator = deleteUser()

        expect(generator.next().value).toEqual(call([axios, axios.delete], apiURL + '/users/', {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'DELETED_USER', payload: res.data.msg }))

        done()
    })
    it('Get an error', done => {
        const res = {
            data: {
                errors: [{
                    msg: 'error'
                }]
            }
        }

        const generator = deleteUser()

        expect(generator.next().value).toEqual(call([axios, axios.delete], apiURL + '/users/', {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg }))

        done()
    })
})

