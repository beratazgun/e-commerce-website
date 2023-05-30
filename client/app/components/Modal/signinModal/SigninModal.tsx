import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import registerOptions from './registerOptions'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSigninModal } from '@/app/hooks/useSigninModal'
import { useSignupModal } from '@/app/hooks/useSignupModal'
import Button from '../../Button'
import Heading from '../../Heading'
import Input from '../../Inputs/Input'

const Modal = dynamic(() => import('../Modal'))

async function signin(data: FieldValues) {
	const res = await fetch(
		`${process.env.API_URL}/api/v1/auth/customer/signin`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		}
	)

	return res.json()
}

const SigninModal = () => {
	const router = useRouter()
	const signinModal = useSigninModal()
	const signupModal = useSignupModal()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			// email: 'laisha_leffler67@yahoo.com',
			// password: 'Password123_',
			email: '',
			password: '',
		},
		mode: 'all',
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const res = await signin(getValues())

			if (res.isSuccess) {
				toast.success(res.message)
				signinModal.close()
				router.refresh()
			} else if (res.isSuccess === false) {
				toast.error(res.message)
			}
		},
	})

	const onToggle = useCallback(() => {
		signinModal.close()
		signupModal.open()
	}, [signinModal, signupModal])

	const body = (
		<form
			className="flex flex-col gap-6"
			onSubmit={handleSubmit((data) => data)}>
			<Heading
				title="Welcome to Bytebazaar 🎉"
				subtitle="Sign in to your account!"
			/>
			<Input
				id="email"
				type="text"
				label="Email Address"
				register={register}
				registerOptions={registerOptions.email}
				errors={errors}
			/>
			<Input
				id="password"
				type="password"
				label="Password"
				register={register}
				registerOptions={registerOptions.password}
				errors={errors}
			/>
			<Button label="Sign İn" isLoading={isLoading} onClick={() => mutate()} />
		</form>
	)

	const footer = (
		<div className="flex flex-row justify-between items-center">
			<div>
				<span className="text-neutral-500">Don't have an account? </span>
				<button
					onClick={onToggle}
					className="text-[#1F8A70] cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-2">
					Sign up
				</button>
			</div>
			<div>
				<span className="text-neutral-500">I forgot my password </span>
				<span className="text-[#1F8A70] cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-2">
					Reset Password
				</span>
			</div>
		</div>
	)

	return (
		<div>
			<Modal
				title="Sign İn"
				body={body}
				footer={footer}
				isOpen={signinModal.isOpen}
				closeModal={signinModal.close}
			/>
		</div>
	)
}

export default SigninModal
