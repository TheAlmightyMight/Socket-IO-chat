import React, { useState } from 'react'

import { useAppSelector } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { changeUserInfo } from '../../redux/slices/userSlice'

import { LoadingButton } from '@mui/lab'

import { Box, Avatar, Typography, Stack, Badge, useTheme } from '@mui/material'

import UploadIcon from '@mui/icons-material/Upload'

const Profile: React.FC = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const user = useAppSelector(state => state.userReducer)
	const [loading, setLoading] = useState(false)
	const uploadNewAvatar = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.addEventListener('change', async e => {
			setLoading(true)

			const target = e.target as HTMLInputElement
			const files = target.files

			if (!files || !files[0]) {
				return
			}

			const data = new FormData()
			data.append('file', new Blob([files[0]], { type: files[0].type }))

			const res = await fetch(
				`http://localhost:5000/user/avatar?id=${user.id}`,
				{
					method: 'PUT',
					credentials: 'include',
					body: data,
				},
			)

			if (!res.ok) {
				alert('Could not set a new avatar')
			}

			const { avatar } = await res.json()

			console.log(avatar)

			dispatch(changeUserInfo({ ...user, avatar: avatar }))

			setLoading(false)
		})
		input.click()
	}
	return (
		<Box
			sx={{
				maxWidth: '1200px',
				margin: 'auto',
				padding: '0.5rem',
				pt: '2rem',
				height: 'fit-content',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Badge
					overlap='circular'
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					badgeContent={
						<LoadingButton
							onClick={() => {
								uploadNewAvatar()
							}}
							loading={loading}
						>
							<UploadIcon
								sx={{
									width: '60px',
									height: '60px',
									color: theme.palette.grey[700],
								}}
							/>
						</LoadingButton>
					}
				>
					<Avatar
						sx={{ width: '150px', height: '150px' }}
						alt='Your avatar'
						src={user.avatar}
					/>
				</Badge>

				<Stack
					sx={{ justifyContent: 'center', alignItems: 'center', mt: '2rem' }}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant='h3'>{user.username}</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant='h5'>{user.email}</Typography>
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}

export default Profile
