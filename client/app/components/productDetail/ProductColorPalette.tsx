'use client'
import { v5 as uuidv5 } from 'uuid'
import { useState } from 'react'

interface ProductColorPaletteProps {
	colors: string[]
	handleSetColor?: (color: string) => void
}

const ProductColorPalette: React.FC<ProductColorPaletteProps> = ({
	colors,
	handleSetColor,
}) => {
	const [selectedColor, setSelectedColor] = useState<string>(colors[0])

	const handleClickColor = (color: string) => {
		setSelectedColor(color)

		if (handleSetColor) {
			handleSetColor(color)
		}
	}

	const renderedColors = colors.map((color) => {
		return (
			<button
				key={uuidv5(color, uuidv5.URL)}
				onClick={() => handleClickColor(color)}
				className={`flex flex-col items-center justify-center gap-1 bg-slate-100 p-2 rounded-2xl duration-150 hover:ring-offset-6 hover:ring-2 hover:ring-[#1F8A70] ${
					selectedColor === color ? 'ring-offset-6 ring-[#1F8A70] ring-2' : null
				}`}>
				<span>{color}</span>
				<div
					className="rounded-full w-10 h-10 hover:shadow-lg focus:shadow-lg duration-300 pt-4"
					style={{ backgroundColor: color }}
				/>
			</button>
		)
	})

	if (!colors) {
		return null
	}

	return <div className="flex flex-row gap-4">{renderedColors}</div>
}

export default ProductColorPalette
