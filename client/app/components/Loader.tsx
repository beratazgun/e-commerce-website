import React from 'react'
import { ImSpinner9 } from '@react-icons/all-files/Im/ImSpinner9'

const Loader = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<ImSpinner9 className="animate-spin text-5xl" />
		</div>
	)
}

export default Loader
