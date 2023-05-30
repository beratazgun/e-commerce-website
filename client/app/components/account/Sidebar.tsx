'use client'
import { IoLogIn } from '@react-icons/all-files/io5/IoLogIn'
import { GoPackage } from '@react-icons/all-files/go/GoPackage'
import { FaRegAddressBook } from '@react-icons/all-files/fa/FaRegAddressBook'
import { CgProfile } from '@react-icons/all-files/cg/CgProfile'
import { MdRateReview } from '@react-icons/all-files/md/MdRateReview'
import { HiCreditCard } from '@react-icons/all-files/hi/HiCreditCard'
import SidebarButton from './SidebarButton'

const Sidebar = () => {
	return (
		<div className="max-w-[15rem] min-w-[15rem] px-4 py-6 rounded-xl flex flex-col gap-2">
			<SidebarButton icon={GoPackage} label="Orders" />
			<SidebarButton icon={FaRegAddressBook} label="Address" />
			<SidebarButton icon={MdRateReview} label="Reviews" />
			<SidebarButton icon={HiCreditCard} label="Payment" />
			<SidebarButton icon={CgProfile} label="Profile" />
		</div>
	)
}

export default Sidebar
