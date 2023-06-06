export interface IToken {
	iat: number
	exp: number
	id: string
	phone: string
	email: string
	username: string
	avatar: string
}

export interface LoginBody {
	email?: string
	phone?: string
	password: string
}

export interface RegistrationBody {
	email: string
	phone: string
	password: string
	username: string
}
