import { BaseError } from './BaseError'

export class LoginError extends BaseError {
	constructor(message: string, status: number) {
		super(message, status)

		this.status = status
		this.message = message
	}
}
