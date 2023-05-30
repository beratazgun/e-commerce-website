import React from 'react'
import dynamic from 'next/dynamic'
import { FieldValues, useForm } from 'react-hook-form'
import { useAddressModal } from '@/app/hooks/useAddressModal'
import AddAddressBody from './AddAddressBody'
import UpdateAddressBody from './UpdateAddressBody'

const Modal = dynamic(() => import('../Modal'))

const AddressModal = () => {
	const addressModal = useAddressModal()

	const body =
		addressModal.mode === 'add' ? <AddAddressBody /> : <UpdateAddressBody />

	return (
		<Modal
			title={
				addressModal.mode === 'add'
					? 'Add your address information'
					: 'Edit your address information'
			}
			body={body}
			isOpen={addressModal.isOpen}
			closeModal={addressModal.close}
		/>
	)
}

export default AddressModal
