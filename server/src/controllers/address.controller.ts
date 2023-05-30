import { Request, Response, NextFunction } from 'express'
import AsyncCatchError from '../utils/AsyncCatchError'
import Address from '../models/address.model'
import mongoose, { Schema } from 'mongoose'
import createHttpError from 'http-errors'
import { pick, map } from 'lodash'

export default class AddressController {
	createAddress = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId, role } = req.session
			const userRole = role === 'seller' ? 'sellerId' : 'customerId'
			const modelName = role === 'seller' ? 'Seller' : 'Customer'

			const address = await Address.create({ ...req.body, [userRole]: userId })

			await mongoose.model(modelName).findByIdAndUpdate(
				userId,
				{
					$push: {
						address: address._id,
					},
				},
				{ new: true }
			)

			res.status(201).json({
				status: 'success',
				isSuccess: true,
				message: 'Address created successfully.',
			})
		}
	)

	deleteAddress = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { addressId } = req.body
			const { userId, role } = req.session
			const modelName = role === 'seller' ? 'Seller' : 'Customer'

			const user = await mongoose.model(modelName).findById(userId)

			if (!user.address.includes(addressId)) {
				return next(
					createHttpError.BadRequest('This address does not belong to you.')
				)
			}

			await Address.findByIdAndDelete(addressId)

			await mongoose.model(modelName).findByIdAndUpdate(
				userId,
				{
					$pull: {
						address: addressId,
					},
				},
				{ new: true } // return the updated document
			)

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				message: 'Address deleted successfully.',
			})
		}
	)

	getAllAddress = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId, role } = req.session
			const modelName = role === 'seller' ? 'Seller' : 'Customer'

			const myAddresses = await mongoose
				.model(modelName)
				.findById(userId)
				.populate({
					path: 'address',
					select: '-__v',
				})

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				numberOfAddress: myAddresses.address.length,
				result: myAddresses.address,
			})
		}
	)

	getAddressById = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const address = await Address.findById(req.headers.addressid)

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				result: address,
			})
		}
	)

	updateAddress = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { addressId } = req.body
			const { userId, role } = req.session
			const modelName = role === 'seller' ? 'Seller' : 'Customer'

			const allowedFields = pick(req.body, Object.keys(Address.schema.obj))

			const model = await mongoose.model(modelName).findById(userId)

			const addressIds = map(model.address, (el: Schema.Types.ObjectId) =>
				el.toString()
			)

			if (!addressIds.includes(addressId)) {
				return next(
					createHttpError.BadRequest('This address does not belong to you.')
				)
			}

			await Address.findByIdAndUpdate(addressId, allowedFields)

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				message: 'Address updated successfully.',
			})
		}
	)
}
