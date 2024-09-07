"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { userId } = await supabase.auth.getUser(token);

  try {
    const body = await req.json();
    const { goalId, progress } = body;

    const { error } = await supabase
      .from("goals")
      .update({ progress })
      .eq("id", goalId)
      .eq("user_id", userId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Progress updated successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update progress" }), { status: 500 });
  }
}