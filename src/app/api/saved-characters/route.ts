import { NextResponse } from "next/server";
import { supabase } from "../../../supabaseClient";

// This matches the payload type we use on the frontend.
type SaveCharacterPayload = {
  name: string;
  nickname?: string | null;
  epithet?: string | null;

  enclave_name: string;
  enclave_summary: string;
  enclave_hook: string;

  spirit_name?: string | null;
  spirit_summary?: string | null;
  spirit_hook?: string | null;

  lore: string[];
  stats: any; // we'll tighten this later to InternalStats
  allowDuplicate?: boolean;
};

// 🚧 TEMP: fake "current user" until real auth is wired.
// This makes everything belong to a single dev user.
async function getCurrentUserId(): Promise<string | null> {
  // Later this will come from Supabase/Clerk auth.
  return "00000000-0000-0000-0000-000000000001";
}

// GET /api/saved-characters
// Return all saved characters for the current user.
export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("saved_characters")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/saved-characters] DB error:", error);
    return NextResponse.json(
      { error: "Failed to load saved characters" },
      { status: 500 }
    );
  }

  return NextResponse.json({ items: data ?? [] }, { status: 200 });
}

// POST /api/saved-characters
// Save a new character for the current user.
export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let payload: SaveCharacterPayload;
  try {
    payload = (await req.json()) as SaveCharacterPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  // Basic validation
  if (
    !payload.name ||
    !payload.enclave_name ||
    !payload.enclave_summary ||
    !payload.enclave_hook
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Dedupe by (user_id, name, enclave_name) unless allowDuplicate is true
  if (!payload.allowDuplicate) {
    const { data: existing, error: dedupeError } = await supabase
      .from("saved_characters")
      .select("id")
      .eq("user_id", userId)
      .eq("name", payload.name)
      .eq("enclave_name", payload.enclave_name)
      .maybeSingle();

    if (dedupeError) {
      console.error(
        "[POST /api/saved-characters] dedupe error:",
        dedupeError
      );
    }

    if (existing) {
      // Frontend expects a duplicated flag in this case
      return NextResponse.json(
        {
          duplicated: true,
          item: null,
          message: "Character already saved.",
        },
        { status: 200 }
      );
    }
  }

  const insertPayload = {
    user_id: userId,
    name: payload.name,
    nickname: payload.nickname ?? null,
    epithet: payload.epithet ?? null,
    enclave_name: payload.enclave_name,
    enclave_summary: payload.enclave_summary,
    enclave_hook: payload.enclave_hook,
    spirit_name: payload.spirit_name ?? null,
    spirit_summary: payload.spirit_summary ?? null,
    spirit_hook: payload.spirit_hook ?? null,
    lore: payload.lore ?? [],
    stats_json: payload.stats ?? {},
  };

const { data, error } = await supabase
  .from("saved_characters")
  .insert(insertPayload)
  .select("*")
  .single();

if (error) {
  console.error("[POST /api/saved-characters] insert error:", error);
  return NextResponse.json(
    {
      error: "Failed to save character",
      details: error.message ?? String(error),
    },
    { status: 500 }
  );
}


  return NextResponse.json(
    {
      item: data,
      message: "Character saved.",
    },
    { status: 201 }
  );
}
