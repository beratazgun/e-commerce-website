'use client'
import dynamic from 'next/dynamic'

const SigninModal = dynamic(() => import('./Modal/signinModal/SigninModal'))
const SignupModal = dynamic(() => import('./Modal/signupModal/SignupModal'))
const AddressModal = dynamic(() => import('./Modal/addressModal/AddressModal'))

const ModalsContainer = () => {
	return (
		<>
			<SigninModal />
			<SignupModal />
			<AddressModal />
		</>
	)
}

export default ModalsContainer
