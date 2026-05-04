import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constent/role";

export async function proxy (request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;

const {data} = await userService.getSeesion()
console.log(data);

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin
    }
// user is nuthenticated or not
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login",request.url))
    }

// user is authenticate and user role = ADMIN
// user san not visit /dashboard
    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard",request.url))
    }

// user is authenticate and user role = USER
// user san not visit /admin-dashboard
    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard",request.url))
    }

return NextResponse.next()
}

export const config = {
    matcher:["/dashboard","/admin-dashboard"]
}