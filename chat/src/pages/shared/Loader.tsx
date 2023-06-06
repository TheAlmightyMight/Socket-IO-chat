import React from 'react'

import { createPortal } from 'react-dom'

interface Props {
	shouldPortal?: boolean
}

export const Loader: React.FC<Props> = ({ shouldPortal = true }) => {
	if (shouldPortal) {
		return createPortal(
			<div className='lds-default'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>,
			document.getElementById('root')!,
		)
	}

	return (
		<div className='lds-default'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
