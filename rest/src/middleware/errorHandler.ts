import type { ErrorRequestHandler } from 'express'

export interface CustomError extends Error {
	status: number
}

export const globalErrorHandler: ErrorRequestHandler = (
	err: CustomError,
	_,
	res,
) => {
	console.log(err.stack)
	console.log(err.name)
	console.log(err.message)
	res
		.status(err.status ? 500 : err.status)
		.json({ error: err.message, name: err.name })
}
