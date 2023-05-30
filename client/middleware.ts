import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	if (request.cookies.get('sesID') === undefined) {
		const url = request.nextUrl.clone()
		url.pathname = '/unauthorised'
		return NextResponse.redirect(url)
	}
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/account/profile',
		'/account/orders',
		'/account/payments',
		'/account/address',
		'/account/reviews',
	],
}
