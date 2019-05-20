import { logoutUser } from '../sagas/index'
import { put } from 'redux-saga/effects'

describe('Logout User', () => {
    it('Successfully remove token', done => {

        const generator = logoutUser()

        expect(generator.next().value).toEqual(put({ type: 'LOGGED_OUT' }) )

        done()
    })
})

