"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function middleware(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}