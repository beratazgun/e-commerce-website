'use client'
import { IconType } from '@react-icons/all-files'
import Link from 'next/link'

interface MenuContainerProps {
	onClick: () => void
	label: string
	icon?: IconType
	href?: string
}

const MenuContainer: React.FC<MenuContainerProps> = ({
	onClick,
	label,
	icon: Icon,
	href,
}) => {
	return (
		<Link
			href={href || ''}
			className="px-4 py-3 hover:bg-neutral-100 transition font-semibold flex flex-row items-center gap-2"
			onClick={onClick}>
			{Icon && <Icon className="inline-block mr-2 text-xl" />}
			{label}
		</Link>
	)
}

export default MenuContainer
