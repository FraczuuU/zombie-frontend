import axios from 'axios'
import { buyItem, apiURL } from '../sagas/index'
import { call, put } from 'redux-saga/effects'
import { getToken } from '../services/auth'

describe('Buy Item', () => {
    it('Successfully buy an item', done => {

        const action = {
            payload: 1
        }

        const res = {
            data: {
                msg: 'bought'
            }
        }

        const generator = buyItem(action)

        expect(generator.next().value).toEqual(call([axios, axios.post], apiURL + '/users/items', { id: action.payload }, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'BOUGHT_ITEM' }))

        done()
    })
    it('Get an error', done => {

        const action = {
            payload: 1
        }

        const res = {
            data: {
                errors: [{
                    msg: 'error'
                }]
            }
        }

        const generator = buyItem(action)

        expect(generator.next().value).toEqual(call([axios, axios.post], apiURL + '/users/items', { id: action.payload }, {
            'headers': {
                'Authorization': 'Bearer ' + getToken()
        }}))
        expect(generator.next(res).value).toEqual(put({ type: 'SHOW_MESSAGE', payload: res.data.errors[0].msg }))

        done()
    })
})

