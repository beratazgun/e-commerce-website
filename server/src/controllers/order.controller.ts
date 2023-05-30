import { Request, Response, NextFunction } from 'express'
import Order from '../models/order.model'
import AsyncCatchError from '../utils/AsyncCatchError'
import generateOrderId from '../utils/generateOrderId'

export default class OrderController {
	createOrder = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session

			const order = await Order.create({
				customerId: userId,
				orderId: generateOrderId(),
				...req.body,
			})

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				message: 'Order created successfully.',
			})
		}
	)

	cancelOrder = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { id } = req.params

			await Order.findByIdAndUpdate(id, {
				isCanceled: true,
			})

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				message: 'Order canceled successfully.',
			})
		}
	)

	getMyOrders = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session

			const orders = await Order.find({ customerId: userId, isCanceled: false })

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				result: orders,
			})
		}
	)
}
