import { CustomError } from '../middleware/errorHandler'

export class BaseError extends Error implements CustomError {
	public status: number

	constructor(message: string, status: number) {
		super(message)

		this.status = status
		this.name = this.constructor.name
	}
}
