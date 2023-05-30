'use client'
import dynamic from 'next/dynamic'
import { useSigninModal } from '@/app/hooks/useSigninModal'
import { useSignupModal } from '@/app/hooks/useSignupModal'
import { isEmpty } from 'lodash'
import { useCallback } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import registerOptions from './registerOptions'
import Button from '../../Button'
import Heading from '../../Heading'
import Input from '../../Inputs/Input'

const Modal = dynamic(() => import('../Modal'))

async function signup(data: FieldValues) {
	const res = await fetch(
		`${process.env.API_URL}/api/v1/auth/customer/signup`,
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

const SignupModal = () => {
	const signinModal = useSigninModal()
	const signupModal = useSignupModal()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
		mode: 'all',
	})

	const onToggle = useCallback(() => {
		signinModal.open()
		signupModal.close()
	}, [signinModal, signupModal])

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const res = await signup(getValues())

			if (res.isSuccess) {
				toast.success(res.message, {
					duration: 2000,
				})
				setTimeout(() => {
					signupModal.close()
				}, 500)
				setTimeout(() => {
					signinModal.open()
				}, 1000)
			}
			if (!res.isSuccess) {
				toast.error(res.message.email, {
					duration: 2000,
				})
			}
		},
	})

	const body = (
		<form
			className="flex flex-col gap-6"
			onSubmit={handleSubmit((data) => data)}>
			<Heading title="Get started" subtitle="Create your account now!" />
			<Input
				type="text"
				label="First Name"
				register={register}
				registerOptions={registerOptions.firstName}
				errors={errors}
				id="firstName"
			/>

			<Input
				type="text"
				label="Last Name"
				register={register}
				id="lastName"
				registerOptions={registerOptions.lastName}
				errors={errors}
			/>

			<Input
				type="text"
				label="Email Address"
				register={register}
				id="email"
				registerOptions={registerOptions.email}
				errors={errors}
			/>

			<Input
				type="password"
				label="Password"
				register={register}
				id="password"
				registerOptions={registerOptions.password}
				errors={errors}
			/>

			<Input
				type="password"
				label="Password Confirm"
				register={register}
				id="passwordConfirm"
				registerOptions={registerOptions.passwordConfirm}
				errors={errors}
			/>

			<Button
				label="Sign Up"
				onClick={() => mutate()}
				isLoading={isLoading}
				disable={isEmpty(errors) ? false : true}
			/>
		</form>
	)

	const footer = (
		<div>
			<span className="text-neutral-500">You already have an account? </span>
			<button
				onClick={onToggle}
				className="text-[#1F8A70] cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-2">
				Sign in
			</button>
		</div>
	)
	return (
		<div>
			<Modal
				title="Sign Up"
				body={body}
				footer={footer}
				isOpen={signupModal.isOpen}
				closeModal={signupModal.close}
			/>
		</div>
	)
}

export default SignupModal
