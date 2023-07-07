import path from 'node:path'

import { Server } from 'socket.io'

import * as jwt from 'jsonwebtoken'
import fs from 'node:fs'

interface Author {
	username: string
	avatar: string
}

interface Message {
	content: string
	author: Author
	date: string
}

const io = new Server({
	cors: {
		origin: ['http://localhost:3000'],
		credentials: true,
	},
})

const messages: Message[] = []

import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const publicKey = fs.readFileSync(
	path.resolve(__dirname, '../keys/ECDSApublic.pem'),
)

//undo

io.use((socket, next) => {
	if (socket.handshake.headers.cookie) {
		try {
			jwt.verify(
				socket.handshake.headers.cookie.replace(/token=/, ''),
				publicKey,
			)

			next()
		} catch (err) {
			console.log(err)
			if (err) return next(new Error('Authentication error'))
		}
	} else {
		next(new Error('Authentication error'))
	}
})

io.on('connection', socket => {
	socket.on('chat:new-message-send', (m: Message, callback) => {
		if (messages.length > 500) {
			callback('not okay')
		} else {
			socket.broadcast.emit('chat:new-message-receive', m)
			messages.push(m)
			callback('okay')
		}
	})

	socket.on('chat:member-joined', () => {
		console.log(io.sockets.sockets.size, 'joined')
		socket.broadcast.emit('chat:member-joined')
	})

	socket.on('chat:members-count', (_, callback) => {
		console.log(io.sockets.sockets.size, 'members')
		callback(io.sockets.sockets.size)
	})

	socket.on('chat:get-messages', (_, callback) => {
		console.log(`Sending ${messages}`)
		callback(messages)
	})

	socket.on('error', err => {
		console.error(err)

		socket.disconnect()
	})

	socket.on('disconnect', () => {
		console.log(io.sockets.sockets.size, 'left')
		socket.broadcast.emit('chat:member-left')
	})
})

io.listen(8080)
