import React from 'react'
import getSession from '@/app/lib/getSession'
import { CartItems } from '@/app/components/Navbar/Cart/interface'
import Image from 'next/image'
import { capitalize } from 'lodash'
import Link from 'next/link'
import Button from '../components/Button'

async function getItemsOnCart() {
	const sesID = getSession()
	const res = await fetch('http://localhost:3005/api/v1/cart/get', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			cookie: `sesID=${sesID?.value}`,
		},
		credentials: 'include',
	})

	return res.json()
}

const page = async () => {
	const res = await getItemsOnCart()

	const render = res?.result?.items?.map((item: CartItems) => {
		return (
			<div className="border-[1px] rounded-xl">
				<div className="pl-6 py-2 bg-neutral-100 rounded-t-xl">
					<span className="text-lg">seller: </span>
					<Link href="" className="text-2xl">
						{item.storeName}
					</Link>
				</div>
				<div className="flex flex-row justify-between items-center gap-4 w-full">
					<Image
						src={item.images[0]}
						width={400}
						height={400}
						alt={''}
						priority
						className="pl-8 max-h-[12rem] min-h-[12rem] max-w-[12rem] min-w-[12rem] object-contain"
					/>

					<div className="w-full flex flex-row items-center justify-between">
						<div className="pr-8 max-w-[28rem] min-w-[28rem]">
							<p
								className="text-lg text-neutral-800"
								title={`${item.brand} ${item.name}`}>
								{item.brand.length + item.name.length > 55
									? `${capitalize(item.brand)} ${item.name.substring(
											0,
											50 - item.brand.length
									  )}...`
									: capitalize(item.brand) + '  ' + capitalize(item.name)}
							</p>
							<div className="text-sm text-neutral-700">
								Color: {capitalize(item.color)}
							</div>

							<div className="text-sm text-neutral-700">
								Quantity: {item.quantity}
							</div>

							<div className="text-sm text-neutral-700">
								Delivery Time: {item.deliveryTime}
								{item.deliveryTime > 1 ? ' days' : ' day'}
							</div>
						</div>
						<div className="pr-4">
							<p className="text-2xl font-bold text-[#1F8A70]">
								{item.price.price} TRY
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<div className="flex flex-row items-start justify-center pt-40 px-24 gap-8 pb-12">
			<div>
				<p className="text-3xl font-bold text-neutral-700">
					Cart <span>({res?.result?.itemsCount} items)</span>
				</p>
				<div className="flex flex-col gap-4 pt-4 max-w-[52rem] min-w-[52rem]">
					{render}
				</div>
			</div>
			<div className="flex flex-col gap-4 pt-12 min-w-[20rem] pb-12 ">
				<div className="border-[1px] rounded-xl text-sm px-12 py-4">
					<p className="text-xl font-bold text-neutral-800">Order Summary</p>
					<div className="pt-4 grid grid-cols-2 text-md">
						<span>Sub Total</span>
						<span>{res?.result?.summary?.totalPrice} TRY</span>
						<span>Shipping cost</span>
						<span>{res?.result?.summary?.totalCargoPrice} TRY</span>
					</div>
				</div>
				<Button label="Pay Now" style="w-full" />
			</div>
		</div>
	)
}

{
	/* label: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	isLoading?: boolean
	disable?: boolean
	actionLabel?: string
	style?: string
	icon?: IconType */
}

export default page
