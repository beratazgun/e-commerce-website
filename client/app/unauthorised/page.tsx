'use client'
import React from 'react'
import { useSigninModal } from '../hooks/useSigninModal'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
	const router = useRouter()

	useEffect(() => {
		setTimeout(() => {
			router.push('/')
		}, 1000)
	}, [])

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<p className="text-2xl">You are not authorised to view this page</p>
			<p className="text-2xl">Redirecting homepage...</p>
		</div>
	)
}

export default page
