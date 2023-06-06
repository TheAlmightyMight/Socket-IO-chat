import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { userSlice } from './slices/userSlice'
import { messageSlice } from './slices/messageSlice'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: {
		userReducer: userSlice.reducer,
		messageReducer: messageSlice.reducer,
	},
	middleware: md => md().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
