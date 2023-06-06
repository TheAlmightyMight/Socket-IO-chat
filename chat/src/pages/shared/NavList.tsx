import React from 'react'

import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'

import { Link } from 'react-router-dom'

import { useTheme } from '@mui/material'

import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	useMediaQuery,
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'

interface Props {
	mobile: boolean
}

export const NavList: React.FC<Props> = ({ mobile }) => {
	const dispatch = useDispatch()
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'))

	const logoutUser = () => {
		console.log('log out')
		dispatch(logout())
	}

	return (
		<List
			sx={{
				width: isSmallScreen ? '220px' : '300px',
				height: mobile ? '100%' : 'calc(100svh - 168px)',
				background: mobile ? '' : theme.palette.primary.main,
				borderRadius: '8px',
			}}
			component='nav'
		>
			{[
				{
					name: 'Home',
					path: '/',
					icon: (
						<HomeIcon
							sx={{
								width: '50px',
								height: '50px',
								color: mobile
									? theme.palette.grey[400]
									: theme.palette.grey[300],
							}}
						/>
					),
				},
				{
					name: 'Profile',
					path: '/profile',
					icon: (
						<AccountBoxIcon
							sx={{
								width: '50px',
								height: '50px',
								color: mobile
									? theme.palette.grey[400]
									: theme.palette.grey[300],
							}}
						/>
					),
				},
				{
					name: 'Logout',
					path: '/login',
					icon: (
						<LogoutIcon
							sx={{
								width: '50px',
								height: '50px',
								color: mobile
									? theme.palette.grey[400]
									: theme.palette.grey[300],
							}}
						/>
					),
				},
			].map((el, i) => {
				return (
					<Link
						style={{
							display: 'block',
							textDecoration: 'none',
							color: 'inherit',
						}}
						to={el.path}
						key={i}
					>
						<ListItem
							onClick={i === 2 ? logoutUser : void 0}
							sx={{ display: 'flex' }}
							key={el.name}
						>
							<ListItemAvatar sx={{ alignSelf: 'center' }}>
								{el.icon}
							</ListItemAvatar>
							<ListItemText
								sx={{
									textAlign: 'center',
									color: mobile
										? theme.palette.grey[400]
										: theme.palette.grey[300],
								}}
								primaryTypographyProps={{ fontSize: '32px' }}
								primary={el.name}
							/>
						</ListItem>
					</Link>
				)
			})}
		</List>
	)
}
