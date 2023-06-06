import { model, Schema } from 'mongoose'

interface IUser {
	username: string
	email: string
	password: string
	avatar: string
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: false,
		default: '',
	},
	password: {
		type: String,
		required: true,
	},
})

userSchema.set('toJSON', {
	transform: function (doc, ret) {
		const id = ret._id
		delete ret._id
		delete ret.__v
		delete ret.password
		ret.id = id
		return ret
	},
})

export const userModel = model('users', userSchema)
