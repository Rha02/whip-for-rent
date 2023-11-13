import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Middleware for administration pages
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const loginURL = new URL(request.nextUrl.href);
        loginURL.pathname = '/login';
        const dashboardURL = new URL(request.nextUrl.href);
        dashboardURL.pathname = '/dashboard';

        const cookie = request.cookies.get('authtoken');
        if (!cookie) {
            return NextResponse.redirect(loginURL.href);
        }

        // Get the token from the cookie
        const token = cookie.value;

        // Make a request to the backend
        const host = process.env.SERVER_HOST;
        fetch(`${host}/users/checkauth`, {
            headers: {
                "Authorization": token
            }
        }).then(res => {
            res.json().then(data => {
                if (data.access_level > 2) {
                    return NextResponse.redirect(dashboardURL.href);
                }
                return NextResponse.next();
            });
        }).catch(err => {
            return NextResponse.redirect(loginURL.href);
        });
    }
}