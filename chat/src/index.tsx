import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import { App } from './App'
import './index.css'

const theme = createTheme({
	typography: { fontFamily: 'Nunito, sans-serif' },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

localStorage.debug = '*'

root.render(
	<>
		<CssBaseline />
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</>,
)
