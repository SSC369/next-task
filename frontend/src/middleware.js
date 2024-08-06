import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("taskToken")?.value || "";
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
//middleware works only on matcher paths , fi we dont mention ma
export const config = {
  matcher: ["/"],
};
