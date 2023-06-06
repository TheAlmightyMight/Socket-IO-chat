import { BaseError } from './BaseError'

export class RegistrationError extends BaseError {
	constructor(message: string, status: number) {
		super(message, status)

		this.status = status
		this.message = message
	}
}
