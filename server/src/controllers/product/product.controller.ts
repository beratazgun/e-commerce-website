import { Request, Response, NextFunction } from 'express'
import AsyncCatchError from '../../utils/AsyncCatchError'
import Product from '../../models/product.model'
import Store from '../../models/store.model'
import Category from '../../models/category.model'
import createHttpError from 'http-errors'
import slugify from 'slugify'
import { toString, pick } from 'lodash'
import Query from './Query'

const generateSlug = (str: string) => {
	return slugify(str, {
		lower: true,
		replacement: '-',
	})
}

export default class ProductController {
	createProduct = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session

			const category = await Category.findOne({
				categorySlug: generateSlug(req.body.category),
			})

			if (!category) {
				return next(createHttpError.BadRequest('This category does not exist.'))
			}

			const product = await Product.create({
				...req.body,
				sellerId: userId,
				categoryId: category?._id,
				productSlug: generateSlug(`${req.body.brand} ${req.body.name}`),
			})

			res.status(201).json({
				status: 'success',
				data: product,
			})
		}
	)

	getAllProducts = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const query = new Query(req.query)
			const result = await query.result()

			// console.log(req)

			res.status(200).json({
				status: 'success',
				result,
			})
		}
	)

	getProduct = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { slug } = req.params

			const product = await Product.findOne({ productSlug: slug })
			const store = await Store.find({ sellerId: product?.sellerId })

			if (!product) {
				return next(createHttpError.NotFound('This product does not exist.'))
			}

			res.status(200).json({
				status: 'success',
				result: {
					product,
					store,
				},
			})
		}
	)

	deleteProduct = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session
			const { slug } = req.params

			const product = await Product.findOne({ productSlug: slug })

			if (!product) {
				return next(createHttpError.NotFound('This product does not exist.'))
			}

			if (toString(product.sellerId) !== userId) {
				return next(
					createHttpError.Unauthorized(
						'You are not authorized to delete this product.'
					)
				)
			}

			await product.deleteOne({ productSlug: slug })

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				message: 'Product deleted successfully.',
			})
		}
	)

	updateProduct = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { slug } = req.params
			const allowedFields = pick(req.body, Object.keys(Product.schema.obj))

			await Product.findOneAndUpdate({ productSlug: slug }, allowedFields, {
				new: true,
			})

			res.status(200).json({
				status: 'success',
				isSuccess: true,
				message: 'Product updated successfully.',
			})
		}
	)
}
