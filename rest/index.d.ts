declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production'
			CONNECTION_STRING: string
			PORT?: string
		}
	}
}
