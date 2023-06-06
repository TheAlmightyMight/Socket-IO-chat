import React from 'react'

import { Header } from './Header'

import { GlobalErrorBoundary } from './GlobalBoundary'
import { AuthGuard } from './AuthGuard'

interface Props {
	children: React.ReactElement
	withHeader?: boolean
}

export const WithLayout: React.FC<Props> = ({
	children,
	withHeader = true,
}) => {
	return (
		<GlobalErrorBoundary>
			<AuthGuard>
				{withHeader && <Header />}
				{children}
			</AuthGuard>
		</GlobalErrorBoundary>
	)
}
