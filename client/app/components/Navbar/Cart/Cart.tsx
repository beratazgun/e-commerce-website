'use client'
import { RiShoppingBagLine } from '@react-icons/all-files/ri/RiShoppingBagLine'
import { useState } from 'react'
import RenderedCart from './RenderedCart'
import { CartItems } from './interface'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CartProps {
	isLoggedIn: boolean
	itemsCount: number
	items: CartItems[]
}

const Cart: React.FC<CartProps> = ({ isLoggedIn, itemsCount, items }) => {
	const [isOpenCart, setIsOpenCart] = useState(false)
	const router = useRouter()

	return (
		<>
			<div
				className="relative "
				onMouseEnter={() => {
					setIsOpenCart(true)
				}}
				onMouseLeave={() => {
					setIsOpenCart(false)
				}}
				onClick={() => {
					router.push('/cart')
				}}>
				<div className=" border-neutral-200 py-1 px-3  rounded-full flex flex-row items-center gap-2 cursor-pointer hover:shadow-md translate duration-300 border-[1px] ">
					<RiShoppingBagLine className="text-2xl" />
					<div className="bg-[#1F8A70] px-3 py-1 flex items-center justify-center rounded-full">
						<span className="text-white">
							{itemsCount > 0 && isLoggedIn ? itemsCount : 0}
						</span>
					</div>
				</div>
				{isOpenCart && (
					<div className="absolute rounded-xl shadow-lg right-0 top-10 text-sm bg-[#FFFFFF] z-20">
						{itemsCount > 0 && isLoggedIn ? (
							<div>
								<p className="text-2xl pl-2 py-2 font-bold text-neutral-600">
									My Cart ({itemsCount} item)
								</p>
								<div className="max-h-[25rem] overflow-y-auto">
									<RenderedCart items={items} />
								</div>
								<div className="flex flex-row gap-2 justify-between items-center py-3 px-2">
									<Link
										href="/cart"
										className="border-[#1F8A70] border-2 text-lg text-[#1F8A70] rounded-md px-6 py-1 hover:shadow-xl duration-300">
										Go to cart
									</Link>
									<button className="bg-[#1F8A70] border-2 text-lg border-[#1F8A70] text-white rounded-md px-6 py-1 hover:shadow-xl duration-300">
										Complete
									</button>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center h-[10rem] max-w-[16rem] min-w-[16rem]">
								<span className="text-xl font-bold">Cart is empty</span>
								<span className="text-md text-neutral-500">
									Add some items to cart
								</span>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	)
}

export default Cart
