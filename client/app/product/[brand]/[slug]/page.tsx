import dynamic from 'next/dynamic'

const PageClient = dynamic(() => import('./PageClient'))

interface IParams {
	brand: string
	slug: string
}

async function getProductDetail(params: IParams) {
	const res = await fetch(
		`http://localhost:3005/api/v1/product/get-one/${params.slug}`,
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

const page = async ({ params }: { params: IParams }) => {
	const { result } = await getProductDetail(params)

	return (
		<>
			<PageClient data={result} />
		</>
	)
}

export default page
