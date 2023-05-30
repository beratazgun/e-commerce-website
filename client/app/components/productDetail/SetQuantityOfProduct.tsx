'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface SetQuantityOfProductProps {
	handleSetQuantity: (quantity: number) => void
}

const SetQuantityOfProduct: React.FC<SetQuantityOfProductProps> = ({
	handleSetQuantity,
}) => {
	const [quantity, setQuantity] = useState(1)

	const increaseQuantity = () => {
		if (quantity < 10) {
			setQuantity(quantity + 1)
			handleSetQuantity(quantity + 1)
		} else {
			toast.error('You can only order up to 10 products', {
				position: 'bottom-center',
			})
		}
	}

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
			handleSetQuantity(quantity - 1)
		} else {
			toast.error("You can't order less than 1 product", {
				position: 'bottom-center',
			})
		}
	}

	return (
		<div className="flex flex-row items-center gap-2 pb-3 pt-4">
			<button
				onClick={decreaseQuantity}
				className="bg-[#F2F2F2] text-2xl text-neutral-600 font-bold w-10 h-10 rounded-xl hover:ring-offset-6 hover:ring-2 hover:ring-[#1F8A70] duration-150">
				-
			</button>
			<input
				className="bg-[#F2F2F2] text-2xl text-neutral-600 font-bold w-12 h-12 rounded-xl text-center outline-none focus:ring-offset-6 focus:ring-2 focus:ring-[#1F8A70]"
				type="text"
				onChange={(e) => setQuantity(parseInt(e.target.value))}
				value={quantity}
			/>
			<button
				onClick={increaseQuantity}
				className="bg-[#F2F2F2] text-2xl text-neutral-600 font-bold w-10 h-10 rounded-xl hover:ring-offset-6 hover:ring-2 hover:ring-[#1F8A70] duration-150">
				+
			</button>
		</div>
	)
}

export default SetQuantityOfProduct
