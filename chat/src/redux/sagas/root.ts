//@ts-nocheck
import { fork, all, takeEvery, select, call } from 'redux-saga/effects'

import { logout } from '../slices/userSlice'

import { wsSaga } from './wsSaga'
import { watchLogin } from './loginSaga'
import { watchRegistration } from '../sagas/registrationSaga'
import { watchReauth } from './reauthSaga'

function* watchAndLog() {
	yield takeEvery('*', function* logger(action) {
		const state = yield select()

		console.log('action', action)
		console.log('state after', state)
	})
}

function* watchLogout() {
	yield takeEvery(logout.type, function* (action) {
		localStorage.setItem('loggedIn', 'false')
		yield call(async () => {
			await fetch('http://localhost:5000/auth/token/invalidate', {
				method: 'POST',
				credentials: 'include',
			})
		})
	})
}

export default function* rootSaga() {
	yield all([
		fork(watchReauth),
		fork(wsSaga),
		fork(watchAndLog),
		fork(watchLogin),
		fork(watchRegistration),
		fork(watchLogout),
	])
}
