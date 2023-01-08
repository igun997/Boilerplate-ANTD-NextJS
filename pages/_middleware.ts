import { NextRequest, NextResponse } from 'next/server';

// const protectedRoutes = ['/dashboard', '/instances', '/topup', '/crm', '/pesan'];

export function middleware(request: NextRequest) {
  // const { pathname } = new URL(request.url);
  // const url = request.nextUrl.clone();
  // const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  // if (isProtectedRoute) {
  //   const is_login = request.cookies.is_login;
  //   if (!is_login || is_login !== '1') {
  //     //remove cookies if not login
  //     request.cookies.is_login = '0';
  //     request.cookies.token = '';
  //     url.pathname = '/';
  //     return NextResponse.redirect(url);
  //   }
  // }
  return NextResponse.next();
}
