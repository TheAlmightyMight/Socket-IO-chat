//@ts-nocheck
import { call, put, takeEvery } from 'redux-saga/effects'
import {
	login,
	startLoginRequest,
	setLoading,
	setError,
	setIsError,
	setHasLoggedBefore,
} from '../slices/userSlice'

export function* watchLogin() {
	yield takeEvery(startLoginRequest.type, loginUser)
}

function* loginUser(action) {
	yield put(setLoading(true))

	const { error, ...user } = yield call(async () => {
		try {
			const res = await fetch('http://localhost:5000/auth/login', {
				credentials: 'include',
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({ ...action.payload }),
			})

			if (res.status !== 200) {
				return { error: 'Wrong credentials' }
			}

			return res.json()
		} catch (err) {
			if (err instanceof Error) {
				return { error: err }
			}
		}
	})

	if (error) {
		localStorage.setItem('loggedIn', 'false')
		yield put(setLoading(false))
		yield put(setError(error))
		yield put(setIsError(true))
	} else {
		localStorage.setItem('loggedIn', 'true')
		yield put(setLoading(false))
		yield put(login(user))
		yield put(setHasLoggedBefore(true))
	}
}
