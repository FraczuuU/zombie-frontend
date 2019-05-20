import axios from 'axios'
import { sellItem, apiURL } from '../sagas/index'
import { call, put } from 'redux-saga/effects'
import { getToken } from '../services/auth'

describe('Sell Item', () => {
    it('Successfully sell an item', done => {

        const action = {
            payload: {
                id: 1
            }
        }

        const res = {
            data: {
                msg: 'sold'
            }
        }

        const generator = sellItem(action)

        expect(generator.next().value).toEqual(call([axios, axios.delete], apiURL + '/users/items?id=' + action.payload, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SOLD_ITEM' }))

        done()
    })
    it('Get an error', done => {

        const action = {
            payload: {
                id: 1
            }
        }

        const res = {
            data: {
                errors: [{
                    msg: 'error'
                }]
            }
        }

        const generator = sellItem(action)

        expect(generator.next().value).toEqual(call([axios, axios.delete], apiURL + '/users/items?id=' + action.payload, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg }))

        done()
    })
})

