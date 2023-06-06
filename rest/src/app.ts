import express from 'express'
import morgan from 'morgan'
import cookie from 'cookie-parser'
import cors from 'cors'

import AuthRouter from './routes/auth'
import UserRouter from './routes/user'

import { connect } from 'mongoose'

const dbUrl =
	process.env.NODE_ENV === 'development'
		? 'mongodb://127.0.0.1:27017'
		: 'mongodb://mongo:27017'

console.log(dbUrl)

connect(dbUrl as string, {}).then(
	() => console.log('Connected'),
	err => console.error('Failed', err),
)

const app = express()
const port = 5000

app.use(express.json())
app.use(cookie())
app.use(
	cors({
		methods: ['POST', 'GET', 'PUT'],
		origin: ['http://localhost:3000', 'http://localhost:3001'],
		credentials: true,
	}),
)
app.use(morgan(':method :url :remote-addr :status')) // \n:req[Cookie]
app.use(express.static('public'))

app.use('/auth', AuthRouter)
app.use('/user', UserRouter)

app.listen(port, () =>
	console.log(`Example app listening on http://localhost:${port}`),
)
