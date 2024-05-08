import constants from "api/constants";
import { verifyToken } from "helpers/api/utils";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/(api)/(trips|itinerary|expenses|users)(.*)"],
};

export async function middleware(request) {
  const token = request.headers.get("Authorization");

  if (token) {
    const parsedToken = token.replace("Bearer ", "");
    const isAuthenticated = await verifyToken(parsedToken);
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, ...constants.errors.authFailed }, { status: 401 });
    }

    return NextResponse.next();
  }

  return NextResponse.json({ success: false, message: "No token attached to request", code: constants.errors.authFailed.code }, { status: 400 });
}
