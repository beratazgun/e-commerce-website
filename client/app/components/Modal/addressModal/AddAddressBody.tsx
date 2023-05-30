import Button from '../../Button'
import TextArea from '../../Inputs/TextArea'
import Input from '../../Inputs/Input'
import { FieldValues, useForm } from 'react-hook-form'
import { useAddressModal } from '@/app/hooks/useAddressModal'
import registerOptions from './registerOptions'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

async function addAddress(data: FieldValues) {
	const res = await fetch(`${process.env.API_URL}/api/v1/address/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(data),
	})

	return res.json()
}

const AddAddressBody = () => {
	const addressModal = useAddressModal()
	const router = useRouter()
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			firstName: 'trevor',
			lastName: 'abernathy',
			phone: '09278182983',
			city: 'istanbul',
			district: 'pendik',
			neighborhood: 'kaynarca',
			address: 'aydınlı yolu caddesi defne sokak 28/4',
			addressTitle: 'Home',
		},
		mode: 'all',
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: async () => {
			const res = await addAddress(getValues())

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
			<Button label="Save" isLoading={isLoading} onClick={() => mutate()} />
		</form>
	)
}

export default AddAddressBody
