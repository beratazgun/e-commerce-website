import React from 'react'
import Sidebar from '../components/account/Sidebar'

interface SidebarLayoutProps {
	children: React.ReactNode
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
	return (
		<div className="pt-40 px-24 flex flex-row gap-4 pb-12">
			<div>
				<Sidebar />
			</div>
			<div className="w-full rounded-xl">{children}</div>
		</div>
	)
}

export default SidebarLayout
