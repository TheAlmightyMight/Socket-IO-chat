//@ts-nocheck
import { call, put, takeEvery } from 'redux-saga/effects'
import {
	setLoading,
	setIsError,
	login,
	setError,
	startRegistrationRequest,
	setHasLoggedBefore,
} from '../slices/userSlice'

export function* watchRegistration() {
	yield takeEvery(startRegistrationRequest.type, registerUser)
}

function* registerUser(action) {
	yield put(setLoading(true))

	const { error, ...user } = yield call(async () => {
		try {
			const res = await fetch('http://localhost:5000/auth/registration', {
				method: 'POST',
				credentials: 'include',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({ ...action.payload }),
			})
			return await res.json()
		} catch (err) {
			return { error: err }
		}
	})

	if (error) {
		yield put(setLoading(false))
		yield put(setError(error))
		yield put(setIsError(true))
	} else {
		localStorage.setItem('loggedIn', 'true')
		yield put(login(user))
		yield put(setHasLoggedBefore(true))
		yield put(setLoading(false))
	}
}
