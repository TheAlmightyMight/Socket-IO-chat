import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Typography, Box } from '@mui/material'

interface Props {
	question: string
	redirect: string
}
export const FormQuestion: React.FC<Props> = ({ question, redirect }) => {
	const navigate = useNavigate()

	const clickHandler = () => {
		navigate(redirect)
	}

	return (
		<Box
			onClick={clickHandler}
			sx={{
				m: '1rem 0 2rem 0',
				'&:hover': {
					cursor: 'pointer',
				},
			}}
		>
			<Typography
				variant='subtitle2'
				component='span'
			>
				{question}
			</Typography>
		</Box>
	)
}
