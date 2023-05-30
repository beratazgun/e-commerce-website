import { client } from '../services/redis/client'
import AsyncCatchError from '../utils/AsyncCatchError'
import { Request, Response, NextFunction } from 'express'
import { cart } from '../services/redis/keys'
import Product from '../models/product.model'
import cartId from '../utils/cartId'

interface CartItem {
	id: string
	quantity: number
	color: string
	name: string
	brand: string
	productSlug: string
	categoryName: string
	images: string[]
	freeCargo: boolean
	deliveryTime: number
	storeName: string
	price: {
		cargoPrice: number
		price: number
		totalPrice: number
		currency: string
	}
	createAt: Date
}

class CartController {
	addToCart = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			let updatedQuantity: number = 0
			let updateTotalPrice: number = 0
			const { userId } = req.session || ' '
			const {
				id,
				color,
				price,
				categoryName,
				name,
				quantity,
				brand,
				productSlug,
				storeName,
				images,
				freeCargo,
				deliveryTime,
			}: CartItem = req.body

			if (!userId) {
				return next(new Error('Please login to add to cart'))
			}

			const product = await Product.findById(id)

			if (!product) {
				return next(new Error('Product not found'))
			}

			const data = await client.hgetall(cart(userId))

			const isExist = Object.keys(data).find((key) => {
				return (
					JSON.parse(data[key]).color === color &&
					JSON.parse(data[key]).id === id
				)
			})

			if (isExist) {
				const existingItem = (await client.hget(
					cart(userId),
					isExist
				)) as string
				const existingQuantity = JSON.parse(existingItem).quantity

				updatedQuantity = existingQuantity + (quantity as number)
				updateTotalPrice = updatedQuantity * price.price + price.cargoPrice
			}

			await client.hset(
				cart(userId),
				isExist || cartId(),
				JSON.stringify({
					id,
					quantity: updatedQuantity || quantity,
					color,
					name,
					categoryName,
					images,
					brand,
					productSlug,
					deliveryTime,
					storeName,
					price: {
						cargoPrice: price.cargoPrice,
						price: price.price,
						totalPrice:
							updateTotalPrice ||
							price.price * quantity + (freeCargo ? 0 : price.cargoPrice),
						currency: price.currency,
					},
					createAt: new Date(Date.now()),
				})
			)

			res.status(200).json({
				message: 'successfully added to cart',
				isSuccess: true,
				status: 200,
			})
		}
	)

	getCart = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session || ' '

			if (!userId) {
				return next(new Error('Please login to add to cart'))
			}

			const cartItems = await client.hgetall(cart(userId))

			res.status(200).json({
				message: 'success',
				isSuccess: true,
				status: 200,
				result: {
					itemsCount: Object.values(cartItems).reduce(
						(acc, item) => acc + JSON.parse(item).quantity,
						0
					),
					items: Object.keys(cartItems).map((key) =>
						JSON.parse(cartItems[key])
					),
					summary: {
						totalPrice: Object.keys(cartItems).reduce(
							(acc, key) => acc + JSON.parse(cartItems[key]).price.totalPrice,
							0
						),
						totalCargoPrice: Object.keys(cartItems).reduce(
							(acc, key) => acc + JSON.parse(cartItems[key]).price.cargoPrice,
							0
						),
					},
				},
			})
		}
	)

	deleteFromCart = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session || ' '
			const { id, quantity } = req.body

			if (!userId) {
				return next(new Error('Please login to add to cart'))
			}

			const isExist = await client.hexists(cart(userId), id)
			2
			if (!isExist) {
				return next(new Error('Product not found'))
			}

			const existingItem = (await client.hget(cart(userId), id)) as string
			const existingQuantity = JSON.parse(existingItem).quantity

			if (existingQuantity > quantity) {
				await client.hset(
					cart(userId),
					id,
					JSON.stringify({
						...JSON.parse(existingItem),
						quantity: existingQuantity - Number(quantity),
					})
				)
			} else {
				await client.hdel(cart(userId), id)
			}

			res.status(200).json({ message: 'success', isSuccess: true, status: 200 })
		}
	)

	getItemCounts = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session || ' '

			if (!userId) {
				return next(new Error('Please login to add to cart'))
			}

			const cartItems = await client.hgetall(cart(userId))

			const itemsCount = Object.values(cartItems).reduce(
				(acc, item) => acc + JSON.parse(item).quantity,
				0
			)

			res.status(200).json({
				message: 'success',
				isSuccess: true,
				status: 200,
				result: itemsCount,
			})
		}
	)
}

export default CartController
