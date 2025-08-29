// app/api/authenticate/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  // Example logic for authentication (should be replaced with real DB validation)
  if (
    username === process.env.NEXT_PUBLIC_USERNAME &&
    password === process.env.NEXT_PUBLIC_PASSWORD
  ) {
    return NextResponse.json({ success: true, token: "mekyal-online-shop" });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
