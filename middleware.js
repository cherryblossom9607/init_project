// export { auth as middleware } from "@/auth";

// middleware.ts
import { auth } from "@/auth"; // ตรวจสอบเส้นทางให้ถูกต้องตามที่คุณเก็บไฟล์ auth.ts
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // ตรวจสอบว่าผู้ใช้ Login แล้วหรือไม่

  const isPublicRoute =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/register"; // กำหนดเส้นทางสาธารณะที่ทุกคนเข้าถึงได้
  const isAuthRoute = nextUrl.pathname.startsWith("/auth"); // เส้นทางที่เกี่ยวข้องกับการยืนยันตัวตน (เช่น /auth/signin, /auth/callback)

  // ถ้าผู้ใช้ยังไม่ได้ Login และพยายามเข้าถึงหน้าที่ไม่ใช่หน้าสาธารณะหรือไม่ใช่หน้า Auth
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    // Redirect ไปที่หน้า login
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // ถ้าผู้ใช้ Login แล้วและพยายามเข้าถึงหน้า login หรือ register
  if (isLoggedIn && (isPublicRoute || isAuthRoute)) {
    // Redirect ไปที่หน้า dashboard หรือหน้าหลักที่คุณต้องการ
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // ถ้าเป็นไปตามเงื่อนไขอื่นๆ ให้ดำเนินการต่อ
  return NextResponse.next();
});

// กำหนด matcher เพื่อบอก Next.js ว่า middleware นี้ควรทำงานกับเส้นทางไหนบ้าง
// ในที่นี้คือทุกเส้นทาง ยกเว้นไฟล์ static, API routes, และ favicon
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
