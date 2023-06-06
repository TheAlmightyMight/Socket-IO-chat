import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router'

interface Props {
	error: Error | string
	shouldGoHome?: boolean
}
export const Error: React.FC<Props> = ({ error, shouldGoHome }) => {
	const errorName = typeof error === 'string' ? error : error.name
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				display: 'grid',
				placeContent: 'center',
				placeItems: 'center',
				height: '100%',
				textAlign: 'center',
			}}
		>
			<Typography>
				There has been an error: {errorName}. Try again please.
			</Typography>

			<Button
				sx={{ height: '40px', width: '120px', mt: '2rem' }}
				variant='contained'
				onClick={() =>
					shouldGoHome ? navigate('/') : window.location.reload()
				}
			>
				Reload
			</Button>
		</Box>
	)
}
