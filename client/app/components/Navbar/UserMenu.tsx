'use client'
import { RiMenu2Line } from '@react-icons/all-files/ri/RiMenu2Line'
import { IoLogIn } from '@react-icons/all-files/io5/IoLogIn'
import { GoPackage } from '@react-icons/all-files/go/GoPackage'
import { FaRegAddressBook } from '@react-icons/all-files/fa/FaRegAddressBook'
import { CgProfile } from '@react-icons/all-files/cg/CgProfile'
import { MdRateReview } from '@react-icons/all-files/md/MdRateReview'
import Image from 'next/image'
import { capitalize } from 'lodash'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSigninModal } from '@/app/hooks/useSigninModal'
import { useSignupModal } from '@/app/hooks/useSignupModal'
import MenuContainer from './MenuContainer'

interface UserMenuProps {
	currentUser: any
}

async function signout() {
	const res = await fetch('http://localhost:3005/api/v1/auth/customer/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	})

	return res.json()
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)
	const router = useRouter()
	const signinModal = useSigninModal()
	const signupModal = useSignupModal()

	const handleSignout = async () => {
		const res = await signout()

		if (res.isSuccess) {
			router.refresh()
		}
	}

	return (
		<>
			<div
				className="relative"
				onMouseEnter={() => {
					setIsOpenUserMenu(true)
				}}
				onMouseLeave={() => {
					setIsOpenUserMenu(false)
				}}>
				<div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md translate duration-300 ">
					<div
						className="flex flex-row items-center  gap-3"
						onClick={() => {
							router.push('/account/orders')
						}}>
						<RiMenu2Line className="text-xl" />
						<span className="font-medium">
							{currentUser ? 'Account' : 'Sign in'}
						</span>
						<div className="hidden md:block translate">
							<Image
								src="/placeholder.jpg"
								alt="placeholder"
								style={{ objectFit: 'contain', borderRadius: '50%' }}
								height={30}
								width={30}
							/>
						</div>
					</div>
					{isOpenUserMenu && (
						<div className="absolute rounded-xl shadow-md w-[60vw] md:w-[12rem] bg-white left-0 overflow-hidden top-10 text-sm">
							<div className="flex flex-col cursor-pointer">
								{currentUser ? (
									<div>
										<div className="flex flex-row items-center gap-3 p-4">
											{currentUser ? (
												<span className="font-medium text-lg cursor-default ">
													{`${capitalize(currentUser.firstName)} 
                          ${capitalize(currentUser.lastName)}`}
												</span>
											) : null}
										</div>
										<MenuContainer
											label="Profile"
											onClick={() => {}}
											icon={CgProfile}
											href="/account/profile"
										/>
										<MenuContainer
											label="Address"
											onClick={() => {}}
											icon={FaRegAddressBook}
											href="/account/address"
										/>
										<MenuContainer
											label="Orders"
											onClick={() => {}}
											icon={GoPackage}
											href="/account/orders"
										/>
										<MenuContainer
											label="Reviews"
											onClick={() => {}}
											icon={MdRateReview}
											href="/account/reviews"
										/>
										<MenuContainer
											label="Sign out"
											onClick={() => handleSignout()}
											icon={IoLogIn}
										/>
									</div>
								) : (
									<div>
										<MenuContainer label="Sign up" onClick={signupModal.open} />
										<MenuContainer label="Sign in" onClick={signinModal.open} />
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default UserMenu
