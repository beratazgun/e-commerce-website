'use client'
import React from 'react'
import SidebarLayout from '../SidebarLayout'
import { SiAddthis } from '@react-icons/all-files/si/SiAddthis'
import { useAddressModal } from '@/app/hooks/useAddressModal'

interface PageClientProps {
	addresses: any
	children?: React.ReactNode
}

const PageClient: React.FC<PageClientProps> = ({ addresses, children }) => {
	const addressModal = useAddressModal()

	return (
		<SidebarLayout>
			<div className="pt-4 px-6 ">
				<div className="flex flex-row justify-between items-center border-[1px] px-6 py-4 rounded-xl ">
					<span className="text-2xl font-bold text-neutral-600 ">
						Address my information
					</span>
					<button
						className="flex flex-row gap-2 items-center justify-center hover:underline-offset-4 hover:-translate-y-1 duration-500"
						onClick={() => {
							addressModal.mode = 'add'
							addressModal.open()
						}}>
						<SiAddthis className="text-2xl text-[#1F8A70]" />
						<span>Add address</span>
					</button>
				</div>
				{children}
			</div>
		</SidebarLayout>
	)
}

export default PageClient
