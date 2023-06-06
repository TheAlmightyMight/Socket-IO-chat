import { Box } from '@mui/material'
import React from 'react'

import { NavList } from '../shared/NavList'

interface Props {}
export const SideBar: React.FC<Props> = () => {
	return (
		<Box sx={{ flex: '3 1 280px', marginInline: '0.5rem' }}>
			<NavList mobile={false} />
		</Box>
	)
}
