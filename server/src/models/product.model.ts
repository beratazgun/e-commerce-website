import { Schema, model, Document } from 'mongoose'

export interface ProductSchemFields extends Document {
	productSlug: string
	name: string
	brand: string
	price: number
	description: string
	quantityOfStock: number
	categoryId: Schema.Types.ObjectId
	sellerId: Schema.Types.ObjectId
	images: string[]
	weight: string
	dimensions: {
		width: number
		height: number
		depth: number
		summary: string
	}
	guarantyTime: number | null
	guarantyType: string | null
	colors: string[]
	numberOfComments: number
	numberOfRatings: number
	averageRating: number
	cargoPrice: number
	freeCargo: boolean
	saleCount: number
	installmentOptions: string[]
	deliveryTime: number
	viewCount: number
	createdAt: Date
	updatedAt: Date
}

const ProductSchema = new Schema<ProductSchemFields>(
	{
		productSlug: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		brand: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			maxlength: 1000,
		},
		quantityOfStock: {
			type: Number,
			required: true,
			min: 0,
		},
		categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		sellerId: {
			type: Schema.Types.ObjectId,
			ref: 'Seller',
			required: true,
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		weight: {
			type: String,
			required: true,
			min: 0,
		},
		dimensions: {
			width: {
				type: Number,
				required: true,
				min: 0,
			},
			height: {
				type: Number,
				required: true,
				min: 0,
			},
			depth: {
				type: Number,
				required: true,
				min: 0,
			},
			summary: {
				type: String,
				required: true,
			},
		},
		guarantyTime: {
			type: Number,
			required: true,
			min: 0,
		},
		guarantyType: {
			type: String,
			required: true,
			enum: ['importer', 'manufacturer', 'none'],
		},
		colors: [
			{
				type: String,
				required: true,
			},
		],
		numberOfComments: {
			type: Number,
			min: 0,
			default: 0,
		},
		numberOfRatings: {
			type: Number,
			min: 0,
			default: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		cargoPrice: {
			type: Number,
			min: 0,
			default: 0,
		},
		freeCargo: {
			type: Boolean,
			default: false,
		},
		installmentOptions: [
			{
				type: String,
				enum: ['none', '3', '6', '9', '12'],
			},
		],
		deliveryTime: {
			type: Number,
			required: true,
			min: 0,
		},
		viewCount: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		saleCount: {
			type: Number,
			min: 0,
			default: 0,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
)

ProductSchema.pre<ProductSchemFields>(/^find/, function (next) {
	this.populate({
		path: 'categoryId',
		select: 'categoryName categorySlug',
	})

	next()
})

const Product = model<ProductSchemFields>('Product', ProductSchema)

export default Product
