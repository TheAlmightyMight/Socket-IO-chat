import React from 'react'

import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'

import { startReauthRequest } from '../../redux/slices/userSlice'

import { Navigate, useLocation } from 'react-router'

import { Loader } from './Loader'
import { Error } from './Error'

interface Props {
	children: React.ReactNode[]
}
export const AuthGuard: React.FC<Props> = ({ children }) => {
	const dispatch = useDispatch()
	const location = useLocation()

	const isLoggedIn = useAppSelector(state => state.userReducer.isLoggedIn)
	const isAuthenticating = useAppSelector(state => state.userReducer.loading)
	const isError = useAppSelector(state => state.userReducer.isError)
	const error = useAppSelector(state => state.userReducer.error)
	const hasLoggedBefore = useAppSelector(
		state => state.userReducer.hasLoggedBefore,
	)

	if (isError && error) {
		return <Error error={error} />
	}

	if (isAuthenticating) {
		return <Loader />
	}

	if (!isLoggedIn) {
		if (!hasLoggedBefore) {
			dispatch(startReauthRequest())
		}
		if (
			location.pathname !== '/login' &&
			location.pathname !== '/registration'
		) {
			return <Navigate to='/login' />
		}
	}

	if (isLoggedIn && location.pathname === '/login') {
		return <Navigate to='/' />
	}

	if (isLoggedIn && location.pathname === '/registration') {
		return <Navigate to='/' />
	}

	return <>{children}</>
}
