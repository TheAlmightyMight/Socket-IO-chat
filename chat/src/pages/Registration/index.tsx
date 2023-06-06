import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { startRegistrationRequest } from '../../redux/slices/userSlice'

import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { ArrowBack } from '@mui/icons-material'

import { FormQuestion } from '../shared/FormQuestion'
import { RegistrationFirstStep } from './RegistrationFirstStep'
import { RegistrationSecondStep } from './RegistrationSecondStep'

import { useForm, FormProvider } from 'react-hook-form'
import { useAppSelector } from '../../redux/store'

interface FormValues {
	email: string
	phone: string
	username: string
	password: string
}

const Registration: React.FC = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
	const loading = useAppSelector(state => state.userReducer.loading)

	const methods = useForm<FormValues>({
		defaultValues: {
			email: '',
			phone: '',
			username: '',
			password: '',
		},
		mode: 'all',
	})

	const [step, setStep] = useState(0)

	const currentStepForm = () => {
		if (step === 0) {
			return <RegistrationFirstStep />
		} else if (step === 1) {
			return <RegistrationSecondStep />
		}
	}

	const shouldGoNext = () => {
		if (
			(methods.formState.errors.username && methods.formState.errors.email) ||
			(methods.getValues().email === '' && methods.getValues().username === '')
		) {
			alert(
				'Cannot go to the next registration step without correcting the errors',
			)
		} else {
			setStep(1)
		}
	}

	const currentStepButtons = () => {
		if (step === 0) {
			return (
				<Button
					onClick={shouldGoNext}
					variant='contained'
					type='button'
					sx={{ width: '200px' }}
				>
					Next step
				</Button>
			)
		} else if (step === 1) {
			return (
				<Box>
					<LoadingButton
						onClick={() => setStep(0)}
						variant='contained'
						type='button'
						sx={{ width: '100px', mr: '20px' }}
						loading={loading}
					>
						<ArrowBack />
					</LoadingButton>

					<LoadingButton
						type='submit'
						variant='contained'
						sx={{ width: '100px' }}
						loading={loading}
					>
						Register
					</LoadingButton>
				</Box>
			)
		}
	}

	const submitHandler = (data: FormValues) => {
		dispatch(
			startRegistrationRequest({
				email: data.email,
				username: data.username,
				password: data.password,
			}),
		)
	}

	return (
		<FormProvider {...methods}>
			<Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
				<Box
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
					onSubmit={methods.handleSubmit(
						data => submitHandler(data),
						() => alert('Invalid registration data'),
					)}
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
								Registration
							</Typography>
						</Box>
						{currentStepForm()}
					</Box>
					<FormQuestion
						redirect='/login'
						question='Already have an account?'
					/>
					{currentStepButtons()}
				</Box>
			</Box>
		</FormProvider>
	)
}

export default Registration
