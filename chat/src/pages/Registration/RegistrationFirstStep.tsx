import React from 'react'
import { TextField, useMediaQuery, useTheme } from '@mui/material'

import { useFormContext } from 'react-hook-form'

export const RegistrationFirstStep: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<>
			<TextField
				autoComplete='false'
				type='text'
				label='username'
				variant='outlined'
				sx={{ mb: '2rem', width: isMobile ? '260px' : '320px' }}
				helperText={errors.username ? (errors.username.message as string) : ''}
				error={!!errors.username}
				{...register('username', {
					required: {
						value: true,
						message: 'This field is required',
					},
					minLength: {
						value: 3,
						message: 'Name is too short',
					},
					maxLength: {
						value: 20,
						message: 'Name is too long',
					},
				})}
			/>

			<TextField
				sx={{ mb: '1rem', width: isMobile ? '260px' : '320px' }}
				autoComplete='false'
				type='text'
				label='email'
				variant='outlined'
				helperText={errors.email ? (errors.email.message as string) : ''}
				error={!!errors.email}
				{...register('email', {
					required: {
						value: true,
						message: 'This field is required',
					},
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
						message: 'Not allowed characters used',
					},
					minLength: {
						value: 3,
						message: 'Name is too short',
					},
					maxLength: {
						value: 30,
						message: 'Email is too long',
					},
				})}
			/>
		</>
	)
}
