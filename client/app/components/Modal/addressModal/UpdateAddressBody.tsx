import Button from '../../Button'
import TextArea from '../../Inputs/TextArea'
import Input from '../../Inputs/Input'
import { FieldValues, useForm } from 'react-hook-form'
import { useAddressModal } from '@/app/hooks/useAddressModal'
import registerOptions from './registerOptions'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

async function updateAddress(id: string, body: FieldValues) {
	const res = await fetch(`${process.env.API_URL}/api/v1/address/update`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ addressId: id, ...body }),
		credentials: 'include',
	})
	return await res.json()
}

const UpdateAddressBody = () => {
	const router = useRouter()
	const addressModal = useAddressModal()
	const { existAddress } = addressModal

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			firstName: existAddress.firstName,
			lastName: existAddress.lastName,
			phone: existAddress.phone,
			city: existAddress.city,
			district: existAddress.district,
			neighborhood: existAddress.neighborhood,
			address: existAddress.address,
			addressTitle: existAddress.addressTitle,
		},
		mode: 'all',
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const res = await updateAddress(existAddress._id as string, getValues())

			if (res.isSuccess) {
				toast.success('Address added successfully')
				addressModal.close()
				router.refresh()
			}
		},
	})

	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={handleSubmit((data) => data)}>
			<div className="flex flex-row gap-4">
				<Input
					id="firstName"
					type="text"
					label="First Name"
					register={register}
					registerOptions={registerOptions.firstName}
					errors={errors}
				/>
				<Input
					id="lastName"
					type="text"
					label="Last Name"
					register={register}
					registerOptions={registerOptions.lastName}
					errors={errors}
				/>
			</div>
			<div className="flex flex-row gap-4">
				<Input
					id="phone"
					type="text"
					label="Phone"
					register={register}
					registerOptions={registerOptions.phone}
					errors={errors}
				/>
				<Input
					id="city"
					type="text"
					label="City"
					register={register}
					registerOptions={registerOptions.city}
					errors={errors}
				/>
			</div>
			<div className="flex flex-row gap-4">
				<Input
					id="district"
					type="text"
					label="District"
					register={register}
					registerOptions={registerOptions.phone}
					errors={errors}
				/>
				<Input
					id="neighborhood"
					type="text"
					label="Neighborhood"
					register={register}
					registerOptions={registerOptions.city}
					errors={errors}
				/>
			</div>
			<TextArea
				id="address"
				label="Address"
				errors={errors}
				register={register}
				registerOptions={registerOptions.address}
			/>
			<Input
				id="addressTitle"
				type="text"
				label="Address Title"
				register={register}
				registerOptions={registerOptions.addressTitle}
				errors={errors}
			/>
			<Button label="Update" isLoading={isLoading} onClick={() => mutate()} />
		</form>
	)
}

export default UpdateAddressBody
