import PageClient from './PageClient'
import getSession from '@/app/lib/getSession'
import RenderAddress from '@/app/components/account/address/RenderAddress'

async function getMyAddress() {
	const sesID = getSession()
	const res = await fetch(
		`${process.env.API_URL}/api/v1/address/get-all-address`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				cookie: `sesID=${sesID?.value}`,
			},
			credentials: 'include',
		}
	)

	return res.json()
}

const page = async () => {
	const addresses = await getMyAddress()
	return (
		<PageClient addresses={addresses}>
			<div className="pt-4 pb-4">
				<RenderAddress addresses={addresses} />
			</div>
		</PageClient>
	)
}

export default page
