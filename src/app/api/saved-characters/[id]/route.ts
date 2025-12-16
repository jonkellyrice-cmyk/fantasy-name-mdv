import { NextResponse } from "next/server";
import { supabase } from "../../../../supabaseClient";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
