import React from 'react'

interface ResponsiveDesignProps {
	children: React.ReactNode
}

const ResponsiveDesign: React.FC<ResponsiveDesignProps> = ({ children }) => {
	return (
		<div className="2xl:w-[1440px] xl:w-[1440px] md:w-[1440px] sm:w-[1440px] w-full ">
			{children}
		</div>
	)
}

export default ResponsiveDesign
