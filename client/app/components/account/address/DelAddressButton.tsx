import React from 'react'
import { RiDeleteBinLine } from '@react-icons/all-files/ri/RiDeleteBinLine'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ImSpinner9 } from '@react-icons/all-files/Im/ImSpinner9'
import { addressInterface } from './interface'

interface DelAddressButtonProps {
	address: addressInterface
}

async function deleteAddress(id: string) {
	const res = await fetch(`${process.env.API_URL}/api/v1/address/delete`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ addressId: id }),
		credentials: 'include',
	})
	return await res.json()
}

const DelAddressButton: React.FC<DelAddressButtonProps> = ({ address }) => {
	const router = useRouter()

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: async (id: string) => {
			const res = await deleteAddress(id)

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
			className="text-sm text-neutral-600 flex flex-row items-center justify-between gap-1 group"
			onClick={() => {
				mutate(address._id)
			}}>
			<RiDeleteBinLine className="text-lg group-hover:text-[#1F8A70] duration-300" />
			<span className="group-hover:text-[#1F8A70] duration-300">Delete</span>
		</button>
	)
}

export default DelAddressButton
