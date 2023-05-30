export interface CartItems {
	id: string
	name: string
	brand: string
	productSlug: string
	quantity: number
	images: string[]
	categoryName: string
	createAt: Date
	storeName: string
	deliveryTime: number
	color: string
	price: {
		price: number
		currency: string
		totalPrice: number
		cargoPrice: number
	}
}
