import React from 'react'

import { Author } from '../../constants'
import { Box, Typography, useTheme, Avatar } from '@mui/material'

interface Props {
	author: Author
	content: string
	date: string
}

// TODO: an indicator that the message is from the current user
export const Message: React.FC<Props> = ({ author, content, date }) => {
	const theme = useTheme()
	console.log(author.avatar)
	return (
		<Box
			sx={{
				background: theme.palette.primary.dark,
				width: '100%',
				margin: '0.5rem',
				padding: '0.5rem',
				borderRadius: '8px',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
				<Avatar
					alt='Avatar'
					src={author.avatar}
					sx={{ width: '32px', height: '32px', marginRight: '0.5rem' }}
				/>

				<Typography color={theme.palette.grey[300]}>
					{author.username}
				</Typography>

				<Typography
					sx={{ ml: 'auto' }}
					color={theme.palette.grey[300]}
				>
					{date}
				</Typography>
			</Box>

			<Typography sx={{ color: theme.palette.grey[300], marginTop: '1rem' }}>
				{content}
			</Typography>
		</Box>
	)
}
