import React from 'react'

import { Routes, Route } from 'react-router'

import { WithLayout } from './pages/shared/WithLayout'
import { Loader } from './pages/shared/Loader'
import { Error } from './pages/shared/Error'

const Main = React.lazy(() => import('./pages/Main'))
const Login = React.lazy(() => import('./pages/Login'))
const Registration = React.lazy(() => import('./pages/Registration'))
const Profile = React.lazy(() => import('./pages/Profile'))

export const App: React.FC = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<React.Suspense fallback={<Loader />}>
						<WithLayout>
							<Main />
						</WithLayout>
					</React.Suspense>
				}
			/>

			<Route path='/profile'>
				<Route
					index
					element={
						<React.Suspense fallback={<Loader />}>
							<WithLayout>
								<Profile />
							</WithLayout>
						</React.Suspense>
					}
				/>
			</Route>

			<Route
				path='/login'
				element={
					<React.Suspense fallback={<Loader />}>
						<WithLayout withHeader={false}>
							<Login />
						</WithLayout>
					</React.Suspense>
				}
			/>

			<Route
				path='/registration'
				element={
					<React.Suspense fallback={<Loader />}>
						<WithLayout withHeader={false}>
							<Registration />
						</WithLayout>
					</React.Suspense>
				}
			/>

			<Route
				path='*'
				element={
					<React.Suspense fallback={<Loader />}>
						<Error
							shouldGoHome
							error={'There is no such page'}
						/>
					</React.Suspense>
				}
			/>
		</Routes>
	)
}
