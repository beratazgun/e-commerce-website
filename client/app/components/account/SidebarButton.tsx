import React from 'react'
import { IconType } from '@react-icons/all-files'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarButtonProps {
	icon: IconType
	label: string
	action?: () => void
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
	icon: Icon,
	label,
	action,
}) => {
	const pathname = usePathname()

	return (
		<Link
			href={`/account/${label.toLowerCase()} `}
			className={`flex flex-row gap-4 items-center hover:bg-[#1F8A70]/80 hover:text-white hover:translate-x-3 duration-500  w-auto px-3 py-2 rounded-3xl
      ${
				pathname === `/account/${label.toLowerCase()}`
					? 'bg-[#1F8A70]/90 text-white translate-x-3 '
					: ''
			}}
      `}>
			<Icon className="text-xl" />
			<span className="text-md">{label}</span>
		</Link>
	)
}

export default SidebarButton
