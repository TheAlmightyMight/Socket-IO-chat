export interface Author {
	username: string
	avatar: string
}

export interface Message {
	content: string
	author: Author
	date: string
}

export interface IToken {
	iat: number
	exp: number
	id: string
	phone: string
	email: string
	username: string
	avatar: string
}

const authors = [
	{ username: 'John Doe', avatar: '' },
	{ username: 'Jane Doe', avatar: '' },
	{ username: 'Bob Smith', avatar: '' },
	{ username: 'Alice Johnson', avatar: '' },
]

export const messages = [
	{
		content: 'Hello, how are you?',
		author: authors[0],
		date: new Date('2022-05-01T12:00:00').toLocaleString('ru'),
	},
	{
		content: 'I am doing well, thank you. How about you?',
		author: authors[1],
		date: new Date('2022-05-01T12:05:00').toLocaleString('ru'),
	},
	{
		content: 'I am good too. What are you up to today?',
		author: authors[0],
		date: new Date('2022-05-01T12:10:00').toLocaleString('ru'),
	},
	{
		content: 'Just catching up on some work. What about you?',
		author: authors[1],
		date: new Date('2022-05-01T12:15:00').toLocaleString('ru'),
	},
	{
		content: "Same here. I've got a lot of work to do as well.",
		author: authors[0],
		date: new Date('2022-05-01T12:20:00').toLocaleString('ru'),
	},
	{
		content: 'Well, we better get to it then!',
		author: authors[1],
		date: new Date('2022-05-01T12:25:00').toLocaleString('ru'),
	},
	{
		content: 'Absolutely. Good luck with your work!',
		author: authors[0],
		date: new Date('2022-05-01T12:30:00').toLocaleString('ru'),
	},
	{
		content: 'Thanks, you too!',
		author: authors[1],
		date: new Date('2022-05-01T12:35:00').toLocaleString('ru'),
	},
	{
		content:
			"Hey, did you hear about the new project we're starting next week?",
		author: authors[2],
		date: new Date('2022-05-02T09:00:00').toLocaleString('ru'),
	},
	{
		content: "No, I haven't. What's it about?",
		author: authors[3],
		date: new Date('2022-05-02T09:05:00').toLocaleString('ru'),
	},
]
