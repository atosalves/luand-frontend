import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTES = ["/"];
const REDIRECT_PUBLIC_ROUTES_WHEN_AUTHENTICATE = ["/login"];

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicRoute = PUBLIC_ROUTES.includes(path);
    const isRedirectPublicRouteWhenAuthenticate =
        REDIRECT_PUBLIC_ROUTES_WHEN_AUTHENTICATE.includes(path);

    const token = request.cookies.get("token")?.value;

    if (!token && isRedirectPublicRouteWhenAuthenticate) {
        return NextResponse.next();
    }

    if (!token && !isPublicRoute) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/login";

        return NextResponse.redirect(redirectUrl);
    }

    if (token && isTokenExpired(token) && !isPublicRoute) {
        return NextResponse.next();
    }

    if (
        token &&
        !isTokenExpired(token) &&
        isRedirectPublicRouteWhenAuthenticate
    ) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/dashboard";

        return NextResponse.redirect(redirectUrl);
    }

    if (token && isTokenExpired(token)) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/login";

        const response = NextResponse.redirect(redirectUrl);
        response.cookies.set("token", "", { expires: new Date(0) });

        return response;
    }

    return NextResponse.next();
}

function isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;

    if (expirationTime) {
        return expirationTime * 1000 < Date.now();
    }
    return true;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
