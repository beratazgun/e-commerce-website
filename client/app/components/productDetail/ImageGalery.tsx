// 'use client'
import Image from 'next/image'
import { useState } from 'react'
import { v5 as uuidv5 } from 'uuid'

interface ImageGaleryProps {
	images: string[]
}

const ImageGalery: React.FC<ImageGaleryProps> = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(0)

	const handleImageClick = (index: number) => {
		setCurrentImage(index)
	}

	const renderedSmallImages = images.map((image, index) => {
		return (
			<button
				key={uuidv5(image, uuidv5.URL)}
				onMouseOver={() => handleImageClick(index)}
				className={`p-2 rounded-xl bg-[#F1F6F9] flex justify-center items-center hover:ring-offset-6 hover:ring-2 hover:ring-[#1F8A70]  duration-300
					${index === currentImage ? 'ring-offset-6 ring-2 ring-[#1F8A70]' : ''}
					`}>
				<Image
					src={images[index]}
					alt=""
					priority
					className="max-h-[6rem] min-h-[6rem] max-w-[6rem] min-w-[6rem] object-contain"
					height={500}
					width={500}
				/>
			</button>
		)
	})

	if (!images) {
		return null
	}

	return (
		<div className="flex flex-row gap-2">
			<div className="flex flex-col gap-4">{renderedSmallImages}</div>
			<div className="rounded-xl max-h-[30rem] min-h-[30rem] max-w-[30rem] min-w-[30rem] bg-slate-100 flex justify-center items-center">
				<Image
					src={images[currentImage]}
					alt=""
					height={500}
					width={500}
					className="object-contain	max-h-[30rem] min-h-[30rem] max-w-[30rem] min-w-[30rem] p-6"
				/>
			</div>
		</div>
	)
}

export default ImageGalery
