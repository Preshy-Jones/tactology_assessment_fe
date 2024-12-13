import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const url = new URL(request.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    return NextResponse.next();
  } catch (error: any) {
    const url = new URL(request.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/departments/:path*"],
};
