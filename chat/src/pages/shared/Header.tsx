import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/store'

import { socket } from '../../socket'

import {
	AppBar,
	Box,
	SwipeableDrawer,
	IconButton,
	Toolbar,
	Typography,
	Avatar,
	useMediaQuery,
	useTheme,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'

import { NavList } from './NavList'
import { useNavigate } from 'react-router'

//TODO: display user's name on the right and logo on the left

export const Header: React.FC = () => {
	const theme = useTheme()
	const online = useAppSelector(state => state.messageReducer.online)
	const avatarUrl = useAppSelector(state => state.userReducer.avatar)
	const navigate = useNavigate()

	const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
	const isBetweenMobileAndTablet = useMediaQuery(
		theme.breakpoints.between('xs', 'md'),
	)

	const [open, setOpen] = useState(false)

	const openDrawer = () => {
		setOpen(true)
	}

	const closeDrawer = () => {
		setOpen(false)
	}

	useEffect(() => {
		socket.emit('chat:member-joined')
	}, [])

	return (
		<Box sx={{ padding: '0.5rem' }}>
			<AppBar
				position='static'
				sx={{
					height: '64px',
					maxWidth: '1200px',
					margin: 'auto',
					borderRadius: '8px',
				}}
			>
				<Toolbar sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
					{isBetweenMobileAndTablet ? (
						<IconButton onClick={openDrawer}>
							<MenuIcon
								sx={{
									width: isBetweenMobileAndTablet ? '32px' : '48px',
									height: isBetweenMobileAndTablet ? '32px' : '48px',
								}}
							/>
						</IconButton>
					) : null}
					<Typography
						sx={{ fontSize: !isMobile ? '1.4em' : '1.15em', ml: '0.5rem' }}
					>
						Active users: {online}
					</Typography>
					{!isBetweenMobileAndTablet && !isMobile && (
						<IconButton
							sx={{
								ml: 'auto',
								cursor: 'pointer',
							}}
							onClick={() => {
								navigate('/')
							}}
						>
							<HomeIcon
								sx={{
									width: '50px',
									height: '50px',
									color: theme.palette.grey[400],
								}}
							/>
						</IconButton>
					)}

					<IconButton
						sx={{ ml: isBetweenMobileAndTablet || isMobile ? 'auto' : '' }}
						onClick={() => {
							navigate('/profile')
						}}
					>
						<Avatar
							alt='Avatar'
							src={avatarUrl}
							sx={{ cursor: 'pointer' }}
						/>
					</IconButton>
				</Toolbar>

				<SwipeableDrawer
					anchor='left'
					open={open}
					onClose={closeDrawer}
					onOpen={openDrawer}
				>
					<NavList mobile />
				</SwipeableDrawer>
			</AppBar>
		</Box>
	)
}
