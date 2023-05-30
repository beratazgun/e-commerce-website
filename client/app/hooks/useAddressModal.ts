import { create } from 'zustand'
import { addressInterface } from '../components/account/address/interface'

type AddressModalState = {
	isOpen: boolean
	mode?: string
	existAddress: addressInterface
	open: () => void
	close: () => void
}

export const useAddressModal = create<AddressModalState>((set) => ({
	isOpen: false,
	mode: '',
	existAddress: {
		_id: '',
		addressTitle: '',
		firstName: '',
		lastName: '',
		phone: '',
		city: '',
		street: '',
		district: '',
		neighborhood: '',
		address: '',
		sellerId: '',
		customerId: '',
	},

	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}))
