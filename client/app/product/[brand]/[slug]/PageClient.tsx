'use client'
import { capitalize } from 'lodash'
import { RiShoppingBagLine } from '@react-icons/all-files/ri/RiShoppingBagLine'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import ImageGalery from '@/app/components/productDetail/ImageGalery'
import ProductRating from '@/app/components/productDetail/ProductRating'
import ProductColorPalette from '@/app/components/productDetail/ProductColorPalette'
import SetQuantityOfProduct from '@/app/components/productDetail/SetQuantityOfProduct'
import Button from '@/app/components/Button'
import { useRouter } from 'next/navigation'
import { useSigninModal } from '@/app/hooks/useSigninModal'

interface pageClientProps {
	data: any
}

async function AddToCart(orderData: any) {
	const res = await fetch('http://localhost:3005/api/v1/cart/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(orderData),
		credentials: 'include',
	})

	return await res.json()
}

const PageClient: React.FC<pageClientProps> = ({ data }) => {
	const [color, setColor] = useState<string>(data.product.colors[0])
	const [quantity, setQuantity] = useState<number>(1)
	const router = useRouter()
	const signinModal = useSigninModal()
	const handleSetColor = (color: string) => {
		setColor(color)
	}

	const handleSetQuantity = (quantity: number) => {
		setQuantity(quantity)
	}

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationKey: ['addToCart'],
		mutationFn: async () => {
			await AddToCart({
				id: data.product._id,
				color,
				quantity,
				categoryName: data.product.categoryId.categoryName,
				name: data.product.name,
				brand: data.product.brand,
				productSlug: data.product.productSlug,
				images: data.product.images,
				deliveryTime: data.product.deliveryTime,
				storeName: data.store[0].storeName,
				price: {
					cargoPrice: data.product.cargoPrice,
					price: data.product.price,
					currency: 'TRY',
					totalPrice: data.product.price * quantity + data.product.cargoPrice,
				},
			}).then((res) => {
				if (res.isSuccess) {
					toast.success(res.message, {
						icon: '👏',
						duration: 1000,
					})
					router.refresh()
				} else if (res.isSuccess === false) {
					toast.error(res.message)
					signinModal.open()
				}
			})
		},
	})

	return (
		<div className="pt-40 px-24 flex flex-row justify-center items-start gap-24">
			<div>
				<ImageGalery images={data.product.images} />
			</div>
			<div className="pt-4">
				<h1 className="text-3xl text-neutral-800 font-bold">
					{capitalize(data.product.brand)} {capitalize(data.product.name)}
				</h1>
				<div>
					<div className="flex flex-row items-center justify-start text-xl text-neutral-600 font-bold gap-2">
						<span>seller: </span>
						<a
							href={`/store/${data.store[0].storeName}`}
							className="cursor pointer">
							{data.store[0].storeName}
						</a>
					</div>
				</div>
				<ProductRating
					averageRating={data.product.averageRating}
					numberOfRatings={data.product.numberOfRatings}
				/>
				<hr />
				<p className="text-4xl text-neutral-600 font-bold pt-4 mt-2">
					{data.product.price} ₺
				</p>
				<div className="pt-2 pb-4">
					<p className="text-2xl text-neutral-600 font-bold pb-2">
						Choose a color
					</p>
					<ProductColorPalette
						colors={data.product.colors}
						handleSetColor={handleSetColor}
					/>
				</div>
				<hr />
				<SetQuantityOfProduct handleSetQuantity={handleSetQuantity} />
				<div className="w-full flex flex-row justify-center items-center gap-4">
					<Button
						label="Add to cart"
						icon={RiShoppingBagLine}
						style="w-full"
						onClick={() => mutate()}
						isLoading={isLoading}
						actionLabel="Adding to cart"
					/>
					<button className="border-[1px]  px-2 py-2 rounded-xl group hover:bg-[#1F8A70] duration-300">
						<AiOutlineHeart className="text-4xl group-hover:fill-white" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default PageClient
