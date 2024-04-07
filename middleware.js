import {NextResponse} from 'next/server'
import {getToken} from 'next-auth/jwt'
import {PUBLIC_ROUTES} from "@/lib/constants";

export async function middleware(request) {
  const token = await getToken({req: request})
  if (!token && !PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (token && PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/board', request.url))
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
}
