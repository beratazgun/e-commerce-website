'use client'
import { capitalize } from 'lodash'

import { v4 as uuidv4, v4 } from 'uuid'
import DelAddressButton from './DelAddressButton'
import React, { useState } from 'react'
import EditAddressButton from './EditAddressButton'
import { addressInterface } from './interface'

interface RenderAddressProps {
	addresses: {
		result: addressInterface[]
	}
}

const RenderAddress: React.FC<RenderAddressProps> = ({ addresses }) => {
	const render = addresses?.result?.map((address: any, key: number) => {
		return (
			<div
				className="max-w-[18rem] min-w-[18rem] max-h-[15rem] min-h-[15rem] border-[1px] rounded-xl font-bold flex flex-col justify-between"
				key={uuidv4()}>
				<div>
					<p className="text-lg bg-[#F1F6F9] text-[#27374D]  px-4 py-1 rounded-t-xl ">
						{capitalize(address.addressTitle)}
					</p>
					<div className="px-4 pt-1 text-sm text-neutral-800">
						<p>
							{capitalize(address.firstName)} {capitalize(address.lastName)}
						</p>
						<p>{capitalize(address.city)}</p>
						<p>{capitalize(address.district)}</p>
						<p>{capitalize(address.neighborhood)} neighborhood</p>
						<p title={address.address}>
							{address.address.length >= 28
								? address.address.slice(0, 28) + '...'
								: capitalize(address.address)}
						</p>
						<p>{address.phone}</p>
					</div>
				</div>
				<div className="flex flex-row justify-between items-center px-4 pb-4">
					<DelAddressButton address={address} />
					<EditAddressButton address={address} />
				</div>
			</div>
		)
	})

	return (
		<div>
			{addresses?.result?.length === 0 ? (
				<p className="text-2xl font-bold text-center w-full text-neutral-600">
					You have no address
				</p>
			) : (
				<div className="grid grid-cols-3 justify-center gap-x-10 gap-y-6">
					{render}
				</div>
			)}
		</div>
	)
}

export default RenderAddress
