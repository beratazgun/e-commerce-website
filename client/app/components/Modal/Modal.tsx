'use client'
import React, { useState } from 'react'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useCallback } from 'react'
import { useEffect } from 'react'

interface PropModal {
	isOpen: boolean
	title: string
	body: React.ReactElement
	footer?: React.ReactElement
	closeModal: () => void
}

const Modal: React.FC<PropModal> = ({
	title,
	body,
	footer,
	isOpen,
	closeModal,
}) => {
	const [showModal, setShowModal] = useState(isOpen)

	useEffect(() => {
		setShowModal(isOpen)
	}, [isOpen])

	const handleClick = useCallback(() => {
		setShowModal(false)
		setTimeout(() => {
			closeModal()
		}, 400)
	}, [closeModal])

	if (!isOpen) {
		return null
	}

	return (
		<div className="flex justify-center items-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-600/50">
			<div className="relative my-6 mx-auto w-[36rem] xl:h-5/6 2xl:h-fit">
				<div
					className={` translate duration-300 h-full
						${showModal ? 'translate-y-0' : 'translate-y-full'}
						${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
					<div className=" translate h-full  border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="relative flex items-center justify-center  p-6 rounded-t border-b-[1px]">
							<button
								className=" p-1 border-0 hover:opacity-70 hover:bg-slate-100 rounded-full transition absolute left-9"
								onClick={handleClick}>
								<IoMdClose size={24} />
							</button>
							<div className="text-2xl font-semibold ">{title}</div>
						</div>
						<div className="relative p-6 flex-auto overflow-y-auto">{body}</div>
						<div className="p-6 border-t ">{footer}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
