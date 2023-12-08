import { NextResponse, NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Define public routes and static assets
  const publicRoutes = ["/login"]
  const staticAssets = ["/_next/static/", "/favicon.ico"]
  const imageExtensions = [".png", ".jpg", ".jpeg"]

  const path = request.nextUrl.pathname

  // Check if the path is a public route or a static asset
  const isPublicPage = publicRoutes.includes(path) || staticAssets.some((asset) => path.startsWith(asset)) || imageExtensions.some((ext) => path.endsWith(ext))

  // If it's a public page or a static asset, proceed without any checks
  if (isPublicPage) {
    return NextResponse.next()
  }

  // Get the token from cookies
  const token = request.cookies.get("token")?.value || ""

  // If token doesn't exist, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  if (token) {
    // If token is valid, proceed to the requested page
    return NextResponse.next()
  } else {
    // If token verification fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher: [
    // This regex will match all routes except the ones specified
    "/((?!login|_next/static|_next/image|favicon.ico).*)",
  ],
}
