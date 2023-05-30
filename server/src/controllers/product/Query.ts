// I know the code is not clean but I will fix it later

import Category from '../../models/category.model'
import Product from '../../models/product.model'
import createHttpError from 'http-errors'
import mongoose, { Document, Model } from 'mongoose'
import { CategorySchemaFields } from '../../models/category.model'
import { ProductSchemFields } from '../../models/product.model'
import { SellerSchemaFields } from '../../models/seller.model'

interface DataSchema
	extends Document<
		ProductSchemFields,
		CategorySchemaFields,
		SellerSchemaFields
	> {}

interface paginateObj {
	limit: number
	skip: number
	page: number
	nextPage: number
	prevPage: number
	length: number
	totalLength: number
	totalPages: number
	currentPage: number
	hasNextPage: boolean
	hasPrevPage: boolean
}

export default class Query {
	queryObj: any
	sortObj: any
	paginateObj: paginateObj = {
		limit: 0,
		skip: 0,
		page: 0,
		nextPage: 0,
		prevPage: 0,
		hasNextPage: false,
		hasPrevPage: false,
		currentPage: 0,
		length: 0,
		totalLength: 0,
		totalPages: 0,
	}

	constructor(public query: any) {
		this.queryObj = {}
		this.sortObj = {}
		this.paginateObj = {
			limit: 0,
			skip: 0,
			page: 0,
			currentPage: 0,
			nextPage: 0,
			prevPage: 0,
			hasNextPage: false,
			hasPrevPage: false,
			length: 0,
			totalLength: 0,
			totalPages: 0,
		}
	}

	topAndBottomValueCalc(str: any) {
		const data = str.split('-')
		return {
			bottom: parseInt(data[0]),
			top: parseInt(data[1]),
		}
	}

	filter() {
		const topAndBottomLimits = ['price', 'rating']
		const productDetails = ['guarantyTime', 'brand', 'freeCargo']
		const additionalOptions = ['colors', 'guarantyType', 'installmentOptions']

		Object.keys(this.query).forEach((key) => {
			if (topAndBottomLimits.includes(key)) {
				const { bottom, top } = this.topAndBottomValueCalc(this.query[key])
				this.queryObj[key] = {
					$gte: bottom,
					$lte: top,
				}
			}

			if (productDetails.includes(key)) {
				this.queryObj[key] = this.query[key]
			}

			if (additionalOptions.includes(key)) {
				this.queryObj[key] = {
					$in: [this.query[key]],
				}
			}
		})

		return this
	}

	sort() {
		const fields: {
			[key: string]: { [key: string]: number }
		} = {
			priceByAscending: { price: 1 },
			priceByDescending: { price: -1 },
			mostRecent: { createdAt: -1 },
			mostPopular: { numberOfRatings: -1 },
			mostRated: { averageRating: -1 },
			mostCommented: { numberOfComments: -1 },
			mostViewed: { viewCount: -1 },
		}

		this.sortObj = fields[this.query.sort]

		return this
	}

	paginate() {
		const page = this.query?.page * 1 || 1
		const limit = this.query?.limit * 1 || 100
		const skip = (page - 1) * limit

		this.paginateObj.limit = limit
		this.paginateObj.skip = skip
		this.paginateObj.page = page
		this.paginateObj.currentPage = page
		this.paginateObj.nextPage = page ? page + 1 : 0
		this.paginateObj.prevPage = page === 1 ? 1 : page - 1
		this.paginateObj.hasPrevPage = page > 1

		return this
	}

	async result() {
		const modifiedQuery = this.filter().sort().paginate()

		if (this.query.category) {
			const categoryId = await Category.findOne({
				categorySlug: this.query.category,
			})

			this.queryObj.categoryId = categoryId?._id.toString()
		}

		const data = await Product.find(modifiedQuery.queryObj)
			.sort(modifiedQuery.sortObj)
			.skip(modifiedQuery.paginateObj.skip)
			.limit(modifiedQuery.paginateObj.limit)

		this.paginateObj.length = data.length
		this.paginateObj.totalLength = await Product.countDocuments(
			modifiedQuery.queryObj
		)
		this.paginateObj.totalPages = Math.ceil(
			this.paginateObj.totalLength / this.paginateObj.limit
		)
		this.paginateObj.hasNextPage =
			this.paginateObj.totalPages > this.paginateObj.page

		return {
			docs: data,
			...this.paginateObj,
		}
	}
}
