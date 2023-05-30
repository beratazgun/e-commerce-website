import ResponsiveDesign from '../ResponsiveDesign'
import CategoryBox from './CategoryBox'
import { v4 as uuidv4 } from 'uuid'

async function getAllAddress() {
	const res = await fetch('http://localhost:3005/api/v1/category/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		cache: 'no-cache',
	})

	return res.json()
}

interface Category {
	_id: string
	categoryName: string
	categorySlug: string
	createdAt: string
	updatedAt: string
	__v: number
}

const Categories = async () => {
	const { result }: { result: Category[] } = await getAllAddress()

	const renderedCategories = result?.map((category) => {
		return <CategoryBox data={category} key={uuidv4()} />
	})

	return (
		<ResponsiveDesign>
			<div className="flex flex-row justify-center items-center gap-8 px-16 py-2 bg-[#FFFFFF]">
				{renderedCategories}
			</div>
		</ResponsiveDesign>
	)
}

export default Categories as unknown as () => JSX.Element
