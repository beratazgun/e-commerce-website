'use client'
import { capitalize } from 'lodash'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '@mui/material/Rating'

interface CardProps {
	data: any
	key: string
}

const Card: React.FC<CardProps> = ({ data, key }) => {
	return (
		<div
			key={key}
			className="flex flex-col justify-between items-start max-h-[25rem] min-h-[25rem] min-w-[16rem] max-w-[16rem]  cursor-pointer hover:shadow-lg  rounded-xl">
			<Link
				href={`/product/${data.brand}/${data.productSlug}`}
				className="flex flex-col justify-between">
				<div className="relative max-h-[16rem] min-h-[16rem] w-full">
					<button className="absolute right-3 top-3 group bg-white rounded-full p-1">
						<AiOutlineHeart className="text-2xl group-hover:fill-[#1F8A70]" />
					</button>
					<Image
						src={data.images[0]}
						alt={data.name}
						style={{ objectFit: 'contain' }}
						width={200}
						height={200}
						priority
						className="flex flex-col justify-center items-center object-contain bg-slate-100 rounded-t-2xl min-w-[16rem]  max-h-[16rem] min-h-[16rem]"
					/>
				</div>
				<div className="flex flex-col justify-between max-h-[9rem] min-h-[9rem] w-full">
					<div className="pl-1">
						<div className="px-1 py-1">
							<p title={capitalize(data.brand) + ' ' + capitalize(data.name)}>
								<span className="font-bold text-neutral-700">
									{capitalize(data.brand)}
								</span>
								<span className="font-medium text-neutral-600 pl-1">
									{data.name.length > 55
										? `${data.name.substring(0, 55)}...`
										: capitalize(data.name)}
								</span>
							</p>
						</div>
						<div className="flex flex-row justify-start items-center gap-2 pl-1">
							<Rating
								name="read-only"
								readOnly
								size="small"
								value={data.averageRating}
							/>
							<p className="text-sm">{data.numberOfRatings}</p>
						</div>
					</div>
					<div className="font-medium text-2xl pl-3 pb-2 self-start ">
						{data.price} TL
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Card
