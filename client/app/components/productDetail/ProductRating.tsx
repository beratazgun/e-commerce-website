'use client'
import React from 'react'
import Rating from '@mui/material/Rating'

interface ProductRatingProps {
	averageRating: number
	numberOfRatings: number
}

const ProductRating: React.FC<ProductRatingProps> = ({
	numberOfRatings,
	averageRating,
}) => {
	return (
		<div className="flex flex-row justify-start items-center gap-2 mt-2 text-neutral-600 pb-2">
			<Rating
				name="read-only"
				readOnly
				size="medium"
				value={averageRating}
				defaultValue={0}
			/>
			<p className="text-md font-medium">{numberOfRatings} ratings</p>
		</div>
	)
}

export default ProductRating
