import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from 'better-auth/cookies'

export async function proxy(request: NextRequest) {          // call it procy to register next.js
    const sessionCookie = getSessionCookie(request)          // getting session cookie, will get only if user is logged in

    if(!sessionCookie){                                      // if session cookie not available, route him to login
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next()                               // id session is available forward req to server
}

export const config = {
    matcher: ["/blog", "/create"],                                 // specify route the proxy applies to
}