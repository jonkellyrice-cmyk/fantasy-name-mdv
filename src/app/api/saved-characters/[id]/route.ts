import { NextResponse } from "next/server";
import { supabase } from "../../../../supabaseClient";

// DELETE /api/saved-characters/:id
export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  // ✅ Next.js 16: params is a Promise and must be awaited
  const { id } = await ctx.params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("saved_characters")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[DELETE /api/saved-characters/:id] DB error:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
