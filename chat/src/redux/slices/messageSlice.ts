import { messages, Message } from './../../constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
	messages: Message[]
	error: boolean
	loading: boolean
	online: number
}

const initialState: State = {
	messages: messages,
	error: false,
	loading: false,
	online: 0,
}

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		getAllMessages(state, action: PayloadAction<Message[]>) {
			state.messages.push(...action.payload)
		},
		getNewMessage(state, action: PayloadAction<Message>) {
			state.messages.push(action.payload)
		},
		sendMessage(state, action: PayloadAction<Message>) {
			state.messages.push(action.payload)
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setError(state, action: PayloadAction<boolean>) {
			state.error = action.payload
		},
		addOnline(state) {
			state.online += 1
		},
		deleteOnline(state) {
			state.online -= 1
		},
		setOnline(state, action: PayloadAction<number>) {
			state.online = action.payload
		},
	},
})

export const {
	sendMessage,
	getNewMessage,
	setError,
	setLoading,
	getAllMessages,
	addOnline,
	deleteOnline,
	setOnline,
} = messageSlice.actions
