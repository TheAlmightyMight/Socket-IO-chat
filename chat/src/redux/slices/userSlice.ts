import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'

interface User {
	email?: string
	password: string
}

interface RegisterUser {
	email: string
	password: string
	username: string
}

interface State {
	username: string
	email: string
	avatar: string
	loading: boolean
	isError: boolean
	isLoggedIn: boolean
	error: null | Error | string
	hasLoggedBefore: boolean
	id: string
}

const initialState: State = {
	username: '',
	email: '',
	avatar: '',
	loading: false,
	isError: false,
	isLoggedIn: false,
	error: null,
	hasLoggedBefore: false,
	id: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => ({
			...state,
			...action.payload,
			isLoggedIn: true,
		}),
		logout: () => ({ ...initialState, hasLoggedBefore: true }),
		changeUserInfo: (state, action: PayloadAction<typeof initialState>) =>
			action.payload,
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setIsError(state, action: PayloadAction<boolean>) {
			state.isError = action.payload
		},
		setError(state, action: PayloadAction<Error | null | string>) {
			state.error = action.payload
		},
		setHasLoggedBefore: (state, action: PayloadAction<boolean>) => {
			state.hasLoggedBefore = action.payload
		},
	},
})

export const startLoginRequest = createAction<string | User>(
	'login/loginRequested',
)

export const startRegistrationRequest = createAction<string | RegisterUser>(
	'login/registrationRequested',
)

export const startReauthRequest = createAction('login/reauth')

export const {
	changeUserInfo,
	login,
	logout,
	setIsError,
	setLoading,
	setError,
	setHasLoggedBefore,
} = userSlice.actions
