import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Card from '@/app/components/Card'
import CategorySidebar from '@/app/components/productList/CategorySidebar'

interface Response {
	result: {
		docs: Product[]
		limit: number
		skip: number
		page: number
		currentPage: number
		nextPage: number
		prevPage: number
		hasNextPage: boolean
		hasPrevPage: boolean
		length: number
		totalLength: number
		totalPages: number
	}
}

interface Product {
	productSlug: string
	name: string
	brand: string
	price: number
	description: string
	quantityOfStock: number
	categoryId: string
	sellerId: string
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
	costOfCargo: number
	installmentOptions: string[]
	deliveryTime: number
	viewCount: number
	createdAt: Date
	updatedAt: Date
}

async function getProductsForCategory(categoryName: string) {
	const res = await fetch(
		`http://localhost:3005/api/v1/product/all?category=${categoryName}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	)
	return res.json()
}

interface Params {
	params: {
		slug: string
	}
}

const page = async ({ params }: Params) => {
	const { result }: Response = await getProductsForCategory(params.slug)

	const renderedProducts = result?.docs?.map((product: Product) => {
		return <Card data={product} key={uuidv4()} />
	})

	return (
		<div className="flex flex-row justify-center items-start gap-8 pt-40 px-24">
			<CategorySidebar />
			{result.totalLength === 0 ? (
				<h1 className="w-full text-center text-xl">There is no products</h1>
			) : (
				<div className="grid grid-cols-4 gap-x-16">{renderedProducts}</div>
			)}
		</div>
	)
}

export default page as unknown as ({ params: { slug } }: Params) => JSX.Element
