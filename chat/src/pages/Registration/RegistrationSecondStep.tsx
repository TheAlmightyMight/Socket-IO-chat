import React from 'react'
import { TextField, useMediaQuery, useTheme } from '@mui/material'

import { useFormContext } from 'react-hook-form'

export const RegistrationSecondStep: React.FC = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
	const {
		register,
		formState: { errors, defaultValues, dirtyFields },
	} = useFormContext()

	console.log(errors, defaultValues, dirtyFields)
	return (
		<>
			<TextField
				autoComplete='false'
				sx={{ mb: '1rem', width: isMobile ? '260px' : '320px' }}
				type='password'
				label='password'
				variant='outlined'
				helperText={errors.password ? (errors.password.message as string) : ''}
				error={!!errors.password}
				{...register('password', {
					required: {
						value: true,
						message: 'This field is required',
					},
					validate: value => {
						if (
							!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
								value,
							)
						) {
							return 'Weak password'
						}
					},
				})}
			/>

			<TextField
				autoComplete='false'
				type='password'
				label='repeat password'
				variant='outlined'
				sx={{ mb: '2rem', width: isMobile ? '260px' : '320px' }}
				helperText={
					errors.password2 ? (errors.password2.message as string) : ''
				}
				error={!!errors.password2}
				{...register('password2', {
					required: {
						value: true,
						message: 'This field is required',
					},
					validate: (value, formValues) => {
						if (value !== formValues.password) {
							return "Passwords don't match"
						}
					},
				})}
			/>
		</>
	)
}
