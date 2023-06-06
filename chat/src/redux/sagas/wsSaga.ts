//@ts-nocheck
import { eventChannel } from 'redux-saga'
import { call, take, put } from 'redux-saga/effects'
import {
	getNewMessage,
	getAllMessages,
	setError,
	setLoading,
	addOnline,
	deleteOnline,
	setOnline,
} from '../slices/messageSlice'

import { Message } from '../../constants'
import { socket } from '../../socket'

function initWebsocket() {
	return eventChannel(emitter => {
		try {
			emitter(setLoading(true))

			socket.emit('chat:get-messages', '', (res: Message[]) => {
				emitter(getAllMessages(res))
				emitter(setLoading(false))
			})

			socket.emit('chat:members-count', '', (res: number) => {
				emitter(setOnline(res))
			})

			socket.on('chat:new-message-receive', m => {
				emitter(getNewMessage(m))
			})

			socket.on('chat:member-joined', m => {
				emitter(addOnline())
			})

			socket.on('chat:member-left', m => {
				emitter(deleteOnline())
			})

			socket.on('error', () => {
				emitter(setError(true))
			})

			socket.on('')

			return () => {
				socket.close()
			}
		} catch (err) {
			emitter(setError(true))
			emitter(setLoading(false))
		}
	})
}

export function* wsSaga() {
	const channel = yield call(initWebsocket)
	while (true) {
		const action = yield take(channel)
		yield put(action)
	}
}
