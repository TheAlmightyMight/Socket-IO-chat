import { call, put, takeEvery } from 'redux-saga/effects'
import {
	startReauthRequest,
	setLoading,
	setError,
	setIsError,
	login,
	setHasLoggedBefore,
} from '../slices/userSlice'

export function* watchReauth() {
	yield takeEvery(startReauthRequest.type, reauth)
}

export function* reauth() {
	if (localStorage.getItem('loggedIn') === 'true') {
		yield put(setLoading(true))
		const { error, ...rest } = yield call(async () => {
			try {
				const res = await fetch('http://localhost:5000/auth/token/extract', {
					method: 'POST',
					credentials: 'include',
				})

				if (!res.ok) {
					return { error: 'No token' }
				}

				return await res.json()
			} catch (err) {
				return { error: err }
			}
		})

		if (error) {
			if (error !== 'No token') {
				localStorage.setItem('loggedIn', 'false')
				yield put(setError('Not authorized'))
				yield put(setIsError(true))
			} else {
				localStorage.setItem('loggedIn', 'false')
				yield put(setError(error))
				yield put(setIsError(true))
			}
		}

		if ('username' in rest) {
			yield put(login(rest))
			yield put(setHasLoggedBefore(true))
		}
		yield put(setLoading(false))
	}
}
