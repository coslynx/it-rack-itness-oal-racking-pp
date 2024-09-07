"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch session" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { userId } = await supabase.auth.getUser(token);

  try {
    const body = await req.json();
    const { title, target, deadline, type } = body;

    const { error } = await supabase
      .from("goals")
      .insert({
        user_id: userId,
        title,
        target,
        deadline,
        type,
        progress: 0,
      });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Goal created successfully" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create goal" }), { status: 500 });
  }
}

export async function GET(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { userId } = await supabase.auth.getUser(token);

  try {
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch goals" }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { userId } = await supabase.auth.getUser(token);

  try {
    const body = await req.json();
    const { goalId, ...updates } = body;

    const { error } = await supabase
      .from("goals")
      .update(updates)
      .eq("id", goalId)
      .eq("user_id", userId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Goal updated successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update goal" }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { userId } = await supabase.auth.getUser(token);

  try {
    const { searchParams } = new URL(req.url);
    const goalId = searchParams.get("id");

    if (!goalId) {
      return new Response(JSON.stringify({ error: "Missing goal ID" }), { status: 400 });
    }

    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", goalId)
      .eq("user_id", userId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Goal deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete goal" }), { status: 500 });
  }
}

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