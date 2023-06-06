import jwt from 'jsonwebtoken'
import path from 'path'
import multer from 'multer'

import { rm } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { Router } from 'express'
import { userModel } from '../models/user'
import { IToken } from '../../types'
import { randomUUID } from 'node:crypto'
import { extension } from 'mime-types'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const publicKey = readFileSync(
	path.resolve(__dirname, '../../keys/ECDSApublic.pem'),
)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/'))
	},
	filename: function (req, file, cb) {
		cb(null, randomUUID() + '.' + extension(file.mimetype))
	},
})

const upload = multer({ storage })

const router = Router()

router.use(async (req, res, next) => {
	try {
		const { token } = req.cookies
		if (token) {
			const verified = jwt.verify(token, publicKey) as IToken
			if (verified) {
				next()
			} else {
				console.log('not verified')
				res.status(401).end()
			}
		} else {
			console.log('no token')
			res.status(401).end()
		}
	} catch (err) {
		console.log(err)
		res.status(401).end()
	}
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
router.put('/avatar', upload.single('file'), async (req, res, next) => {
	try {
		const { id } = req.query as { id: string | undefined }

		if (!id) {
			return res.status(400).json({ error: 'No parameters included' })
		}

		if (!req.file) {
			return res.status(400).json({ error: 'No avatar file' })
		}

		console.log(req.file)
		const avatarPath = `http://localhost:5000/${req.file.filename}`

		const user = await userModel
			.findByIdAndUpdate(id, {
				avatar: avatarPath,
			})
			.exec()

		if (!user) {
			return res.status(400).json({ error: 'User not found' })
		}

		if (user.avatar) {
			const segments = user.avatar.split(/(\/)|(\\)/)
			await rm(
				path.resolve(
					__dirname,
					'../../public/',
					segments[segments.length - 1] as string,
				),
			)
		}

		res.status(200).json({ avatar: avatarPath })
	} catch (err) {
		next(err)
	}
})

export default router
