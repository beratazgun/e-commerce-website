import getSession from '@/app/lib/getSession'
import Cart from './Cart'

interface CartContainerProps {
	isLoggedIn: boolean
}

async function getItemsOnCart() {
	const sesID = getSession()
	const res = await fetch('http://localhost:3005/api/v1/cart/get', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			cookie: `sesID=${sesID?.value}`,
		},
		credentials: 'include',
	})

	return res.json()
}

const CartContainer = async ({ isLoggedIn }: CartContainerProps) => {
	let res = null
	if (isLoggedIn) {
		res = await getItemsOnCart()
	}

	return (
		<>
			<Cart
				isLoggedIn={isLoggedIn}
				itemsCount={res?.result.itemsCount ? res.result.itemsCount : 0}
				items={res?.result.items ? res.result.items : []}
			/>
		</>
	)
}

export default CartContainer as unknown as ({
	isLoggedIn,
}: CartContainerProps) => JSX.Element
