import React from 'react'

import { Box, useMediaQuery } from '@mui/material'

import { Chat } from './Chat'
import { SideBar } from './SideBar'
import { Controls } from './Controls'

const Main: React.FC = () => {
	const shouldSideBarBeVisible = useMediaQuery('(min-width: 900px)')
	return (
		<Box
			sx={{
				maxWidth: '1200px',
				margin: 'auto',
				padding: '0.5rem 0.5rem 0 0.5rem',
			}}
		>
			<Box sx={{ display: 'flex', pl: '0.5rem' }}>
				<Chat />
				{shouldSideBarBeVisible && <SideBar />}
			</Box>

			<Controls />
		</Box>
	)
}

export default Main
