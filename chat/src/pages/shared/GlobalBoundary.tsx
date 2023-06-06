import React from 'react'

import { Error } from './Error'

export class GlobalErrorBoundary extends React.Component<
	{
		children: React.ReactElement
	},
	{ hasError: boolean; error: null | Error }
> {
	constructor(props: { children: React.ReactElement }) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error(error)
		console.info(errorInfo)
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error }
	}

	render() {
		return (
			<>
				{this.state.hasError ? (
					<Error error={this.state.error as Error} />
				) : (
					this.props.children
				)}
			</>
		)
	}
}
