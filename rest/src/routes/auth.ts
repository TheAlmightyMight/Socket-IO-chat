import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { readFileSync } from 'node:fs'
import { Router } from 'express'
import { userModel } from '../models/user'
import { IToken, RegistrationBody, LoginBody } from '../../types'
import { RegistrationError, LoginError, NoTokenError } from '../errors'

import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = Router()

export const cookieLifeTime = 60 * 60 * 24 * 7 // a week

const privateKey = readFileSync(
	path.resolve(__dirname, '../../keys/ECDSAprivate.pem'),
)

const publicKey = readFileSync(
	path.resolve(__dirname, '../../keys/ECDSApublic.pem'),
)

router.post('/token/extract', async (req, res) => {
	try {
		const { token } = req.cookies

		const { id } = jwt.verify(token, publicKey) as IToken

		if (id) {
			const user = await userModel.findById(id).exec()
			if (!user) {
				throw new Error('No user with provided id')
			}

			return res.json(user?.toJSON())
		}

		throw new Error('Invalid token')
	} catch (err) {
		console.log(err)
		return res.status(401).end()
	}
})

router.post('/token/invalidate', async (req, res, next) => {
	try {
		const { token } = req.cookies

		if (token) {
			res
				.status(204)
				.setHeader(
					'Set-Cookie',
					'token=; SameSite=Strict; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;',
				)
				.end()
		} else {
			throw new NoTokenError('No token was present', 400)
		}
	} catch (err) {
		next(err)
	}
})

router.post('/registration', async (req, res, next) => {
	try {
		const { username, email, password } = req.body as RegistrationBody

		const newUser = { password: '', email, username }

		const salt = await bcrypt.genSalt(8)

		if (password) {
			newUser.password = await bcrypt.hash(password, salt)
		}

		const user = await userModel.create(newUser)

		const token = jwt.sign({ id: user.id }, privateKey, {
			algorithm: 'ES256',
			expiresIn: cookieLifeTime,
		})

		res
			.status(200)
			.setHeader(
				'Set-Cookie',
				`token=${token}; SameSite=Strict; HttpOnly; MaxAge=${cookieLifeTime}; Path=/`,
			)
			.json(user?.toJSON())
	} catch (err) {
		console.error(err)
		next(new RegistrationError('Could not register a user', 400))
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body as LoginBody
		const user = await userModel.findOne({ email }).exec()

		if (user) {
			if (bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign({ id: user.id }, privateKey, {
					algorithm: 'ES256',
					expiresIn: cookieLifeTime,
				})

				res
					.status(200)
					.setHeader(
						'Set-Cookie',
						`token=${token}; SameSite=Strict; HttpOnly; MaxAge=${cookieLifeTime}; Path=/`,
					)
					.json(user?.toJSON())
			} else {
				throw new LoginError('Wrong password', 401)
			}
		} else {
			throw new LoginError('No such user registered', 401)
		}
	} catch (err) {
		next(err)
	}
})

export default router
