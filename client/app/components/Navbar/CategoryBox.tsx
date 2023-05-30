import Link from 'next/link'
import { capitalize } from 'lodash'
interface CategoryBoxProps {
	data: {
		_id: string
		categoryName: string
		categorySlug: string
		createdAt: string
		updatedAt: string
		__v: number
	}
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ data }) => {
	return (
		<Link
			href={`/category/${data.categorySlug}`}
			className="flex flex-col items-center justify-center z-10 gap-2 border-b-2 border-transparent hover:border-neutral-600 hover:text-neutral-600 px-3 py-1 hover:border-b-2  cursor-pointer">
			{capitalize(data.categoryName)}
		</Link>
	)
}

export default CategoryBox
