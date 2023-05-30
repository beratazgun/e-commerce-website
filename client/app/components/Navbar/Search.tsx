'use client'
import React from 'react'
import { BiSearch } from '@react-icons/all-files/bi/BiSearch'

const Search = () => {
	return (
		<div className="flex flex-row items-center relative shadow-md rounded-full hover:shadow-xl duration-300  ">
			<input
				className="outline-none border-[1px] px-4 py-3 md:w-[28rem] rounded-full"
				type="text"
				placeholder="Search ByteBazaar"
			/>
			<div className="absolute right-2 p-2 bg-[#1F8A70] rounded-full  text-white cursor-pointer">
				<BiSearch size={18} />
			</div>
		</div>
	)
}

export default Search
