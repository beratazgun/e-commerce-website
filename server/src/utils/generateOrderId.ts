import crypto from 'crypto'

const generateOrderId = () => {
	let orderId: string = ''
	for (let i = 0; i < 2; i++) {
		orderId += crypto.randomInt(100000000).toString()
	}

	return orderId
}

export default generateOrderId
