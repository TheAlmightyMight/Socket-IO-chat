import React, { useState } from 'react'

import { useAppSelector } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { sendMessage, setError } from '../../redux/slices/messageSlice'

import { socket } from '../../socket'

import { Box, TextField, Button } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'

// TODO: current user name

export const Controls: React.FC = () => {
	const dispatch = useDispatch()
	const [message, setMessage] = useState('')
	const user = useAppSelector(state => state.userReducer)

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('yay')

		if (!message.length) {
			return
		}

		const msg = {
			content: message,
			date: new Date().toLocaleString('ru'),
			author: { username: user.username, avatar: user.avatar },
		}
		socket.emit('chat:new-message-send', msg, (res: string) => {
			if (res === 'okay') {
				dispatch(sendMessage(msg))
			} else {
				dispatch(setError(true))
			}
		})
		setMessage('')
	}

	const changeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setMessage(e.target.value!)
	}

	return (
		<Box
			sx={{
				padding: '0.5rem',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
			}}
			component='form'
			onSubmit={submitHandler}
		>
			<TextField
				value={message}
				onChange={e => changeHandler(e)}
				autoComplete='off'
				sx={{ width: '100%' }}
				type='text'
				placeholder='Message...'
			/>

			<Button
				type='submit'
				variant='contained'
				sx={{ height: '56px', width: '56px', marginInline: '1rem 0' }}
			>
				<SendIcon />
			</Button>
		</Box>
	)
}
