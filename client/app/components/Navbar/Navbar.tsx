import UserMenu from './UserMenu'
import CartContainer from './Cart/CartContainer'
import Logo from './Logo'
import Search from './Search'
import Categories from './Categories'
import ResponsiveDesign from '../ResponsiveDesign'

interface NavbarProps {
	currentUser?: any
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
	return (
		<div className="fixed z-10">
			<ResponsiveDesign>
				<div className="px-16 py-6 flex flex-row justify-between items-center bg-[#FFFFFF]">
					<Logo />
					<Search />
					<div className="flex flex-row justify-center items-center gap-4">
						<CartContainer isLoggedIn={currentUser ? true : false} />
						<UserMenu currentUser={currentUser} />
					</div>
				</div>
				<Categories />
			</ResponsiveDesign>
		</div>
	)
}

export default Navbar
