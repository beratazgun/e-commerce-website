import React from 'react'
import { addressInterface } from './interface'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ImSpinner9 } from '@react-icons/all-files/Im/ImSpinner9'
import { useAddressModal } from '@/app/hooks/useAddressModal'

interface EditAddressButtonProps {
	address: addressInterface
}

async function updateAddress(id: string) {
	const res = await fetch(`${process.env.API_URL}/api/v1/address/update`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},

		credentials: 'include',
	})
	return await res.json()
}

const EditAddressButton: React.FC<EditAddressButtonProps> = ({ address }) => {
	const addressModal = useAddressModal()
	const router = useRouter()
	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: async (id: string) => {
			const res = await updateAddress(id)

			if (res.isSuccess) {
				toast.success(res.message)
				router.refresh()
			} else {
				toast.error(res.message)
			}
		},
	})

	if (isLoading && !isSuccess) {
		return (
			<div className="flex flex-row items-center justify-between gap-1">
				<ImSpinner9 className="animate-spin text-md" />
				<p className="text-sm text-neutral-600">Deleting</p>
			</div>
		)
	}
	return (
		<button
			className="text-sm bg-[#1F8A70]/90 text-white px-4 py-1 rounded-full hover:-translate-y-1 duration-300 "
			onClick={() => {
				addressModal.mode = 'update'
				addressModal.existAddress = address
				addressModal.open()
			}}>
			Edit
		</button>
	)
}

export default EditAddressButton
