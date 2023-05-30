import './globals.css'
import { Nunito } from 'next/font/google'
import ReactQueryProvider from './providers/ReactQueryProvider'
import ToasterProvider from './providers/ToasterProvider'
import ModalsContainer from './components/ModalsContainer'
import getSession from './lib/getSession'
import Navbar from './components/Navbar/Navbar'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
	title: 'ByteBazaar',
	description: 'Next generation e-commerce platform',
}

async function getCurrentUser(sesID: string) {
	const res = await fetch(
		'http://localhost:3005/api/v1/auth/customer/account/me',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `sesID=${sesID}`,
			},
			credentials: 'include',
		}
	)

	return await res.json()
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const sesID = getSession()
	let currentUser = null

	if (sesID) {
		const user = await getCurrentUser(sesID.value)
		currentUser = user.result
	}

	return (
		<html lang="en">
			<body className={nunito.className}>
				<ReactQueryProvider>
					<ToasterProvider />
					<Navbar currentUser={currentUser} />
					<ModalsContainer />
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	)
}
