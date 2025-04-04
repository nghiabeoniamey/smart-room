import {NextRequest, NextResponse} from "next/server";

const publicRoutes = [
    '/authentication',
    '/authentication/login',
    '/authentication/register',
    '/authentication/redirect',
    '/authentication/forgot-password',
    '/authentication/401',
    '/authentication/404',
    '/authentication/403',
];

const teacherRoutes = [
    '/actor/teacher',
    '/actor/teacher/class',
    '/actor/teacher/config',
];

const studentRoutes = [
    '/actor/student',
    '/actor/student/class',
    '/actor/student/config',
];

export async function middleware(request: NextRequest) {


    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};