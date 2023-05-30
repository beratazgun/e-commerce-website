import { v4 as uuidv4 } from 'uuid'
import Card from './components/Card'
import Brands from './components/Brands'

interface ResponseInterface {
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

async function getProducts() {
	const res = await fetch('http://localhost:3005/api/v1/product/all?limit=8', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		cache: 'no-cache',
	})

	return res.json()
}

export default async function Home() {
	const { result }: ResponseInterface = await getProducts()

	const renderedProducts = result?.docs?.map((product: Product) => {
		return <Card data={product} key={uuidv4()} />
	})

	return (
		<main>
			<div className="flex flex-col gap-4 pt-48 pb-12">
				<div className="px-28">
					<Brands />
					<div>
						<h1 className="font-bold text-2xl pb-8">For you</h1>
						<div className="grid grid-cols-4 justify-between justify-items-center auto-cols-min	z-0 gap-x-22 gap-y-8">
							{renderedProducts}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
