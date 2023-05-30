import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { CartItems } from './interface'
import { capitalize } from 'lodash'

interface RenderedCartProps {
	items: CartItems[]
}

const RenderedCart: React.FC<RenderedCartProps> = ({ items }) => {
	const render = items.map((item, key) => {
		return (
			<Link
				href={`/product/${item.brand}/${item.productSlug}`}
				className={`
				flex flex-row items-center gap-2 justify-between hover:bg-slate-100 max-h-[7rem] min-h-[7rem] max-w-[18rem] min-w-[18rem]
				${key === 0 ? 'rounded-t-xl hover:rounded-t-xl' : ''}`}
				key={uuidv4()}>
				<div className="flex flex-row items-center gap-2">
					<img
						src={item.images[0]}
						alt={item.name}
						className="max-w-[5rem] min-w-[5rem] max-h-[7rem] min-h-[7rem] rounded-md object-contain"
					/>
					<div className="flex flex-col">
						<span className="text-sm font-bold">
							{item.name.length > 50
								? `${item.name.substring(0, 50)}...`
								: capitalize(item.name)}
						</span>
						<span className="text-sm text-neutral-400">
							quantity: {item.quantity}
						</span>
						<span className="text-sm text-neutral-400">
							color: {item.color}
						</span>
						<span className="text-[#1F8A70] font-bold text-lg">
							{item.price.price} TL
						</span>
					</div>
				</div>
			</Link>
		)
	})

	return <div className="rounded-xl">{render}</div>
}

export default RenderedCart as unknown as ({
	items,
}: RenderedCartProps) => JSX.Element
