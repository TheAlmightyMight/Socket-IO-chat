import React from 'react'

import { useAppSelector } from '../../redux/store'

import { Box, useTheme } from '@mui/material'

import { Message } from './Message'
import { Error } from '../shared/Error'
import { Loader } from '../shared/Loader'

interface Props {}
export const Chat: React.FC<Props> = () => {
	const theme = useTheme()
	const error = useAppSelector(state => state.messageReducer.error)
	const loading = useAppSelector(state => state.messageReducer.loading)
	const messages = useAppSelector(state => state.messageReducer.messages)

	if (error) {
		return (
			<Box
				sx={{
					width: '100%',
					height: 'calc(100svh - 168px)',
					flex: '1 2 876px',
					background: theme.palette.error.light,
					borderRadius: '8px',
					padding: '1rem',
					backgroundPosition: 'center',
				}}
			>
				<Error error='Error either loading or sending chat messages' />
			</Box>
		)
	}

	if (loading) {
		return (
			<Box
				sx={{
					width: '100%',
					height: 'calc(100svh - 168px)',
					flex: '1 2 876px',
					background: theme.palette.primary.light,
					borderRadius: '8px',
					padding: '1rem',
					position: 'relative',
				}}
			>
				<Loader shouldPortal={false} />
			</Box>
		)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				height: 'calc(100svh - 168px)',
				flex: '1 2 876px',
				background: theme.palette.primary.main,
				borderRadius: '8px',
				overflowY: 'scroll',
				scrollbarWidth: '40px',
				scrollbarColor: 'green',
				'&::-webkit-scrollbar': {
					display: 'block',
				},
				'&::-webkit-scrollbar-button': {
					display: 'none',
				},
				'&::-webkit-scrollbar-thumb': {
					width: '20px',
					background: theme.palette.grey.A700,
				},
			}}
		>
			{messages.map((el, i) => {
				return (
					<Message
						author={el.author}
						content={el.content}
						date={el.date}
						key={i}
					/>
				)
			})}
		</Box>
	)
}
