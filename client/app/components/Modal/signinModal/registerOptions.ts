const registerOptions = {
	email: {
		pattern: {
			value: /\S+@\S+\.\S+/,
			message: 'Please enter a valid email address.',
		},
		required: 'You should enter your email',
	},

	password: {
		required: 'You should enter your password',
	},
}

export default registerOptions
