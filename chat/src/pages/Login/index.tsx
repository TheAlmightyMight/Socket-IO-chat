import React from 'react'

import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/store'

import { useNavigate } from 'react-router'

import { useForm } from 'react-hook-form'

import { startLoginRequest } from '../../redux/slices/userSlice'

import {
	Box,
	TextField,
	Typography,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { FormQuestion } from '../shared/FormQuestion'

const Login: React.FC = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'all',
	})

	const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
	const loading = useAppSelector(state => state.userReducer.loading)
	const navigate = useNavigate()

	return (
		<Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
			<Box
				onSubmit={handleSubmit(
					({ password, email }) => {
						dispatch(startLoginRequest({ password, email }))
						navigate('/')
					},
					() => alert('Wrong credentials'),
				)}
				sx={{
					width: isMobile ? '280px' : '400px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					background: theme.palette.grey.A200,
					borderRadius: '20px',
					padding: isMobile ? ' 2rem 1rem' : '2rem',
				}}
				component='form'
			>
				<Box
					sx={{
						border: 0,
						padding: 0,
						margin: 0,
						minWidth: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
					component='fieldset'
				>
					<Box
						textAlign='center'
						sx={{ border: 0, padding: 0, margin: '0 0 3rem 0', minWidth: 0 }}
						component='legend'
					>
						<Typography
							variant='h4'
							component='h2'
						>
							Sign in
						</Typography>
					</Box>
					<TextField
						autoComplete='false'
						type='email'
						label='email'
						variant='outlined'
						sx={{ mb: '2rem', width: isMobile ? '260px' : '320px' }}
						error={!!errors.email}
						{...register('email', { required: true })}
					/>
					<TextField
						sx={{ mb: '1rem', width: isMobile ? '260px' : '320px' }}
						type='password'
						label='password'
						variant='outlined'
						error={!!errors.password}
						{...register('password', { required: true })}
					/>
				</Box>
				<FormQuestion
					redirect='/registration'
					question="Don't have an account yet?"
				/>
				<LoadingButton
					type='submit'
					variant='contained'
					loading={loading}
					sx={{ width: '200px' }}
				>
					Login
				</LoadingButton>
			</Box>
		</Box>
	)
}

export default Login
