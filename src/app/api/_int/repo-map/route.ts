import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

function enabled(): boolean {
  const v =
    process.env.NEXT_PUBLIC_INTERNAL_TOOLS_ENABLED ??
    process.env.NEXT_PUBLIC_INTERNAL_TOOLS ??
    "";
  return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
}

export async function GET() {
  if (!enabled()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const repoRoot = process.cwd();
    const repoMapPath = path.join(repoRoot, "docs", "repository-map.md");

    if (!fs.existsSync(repoMapPath)) {
      return NextResponse.json(
        { ok: false, error: "repository-map.md not found" },
        { status: 404 }
      );
    }

    const text = fs.readFileSync(repoMapPath, "utf8");

    return NextResponse.json({
      ok: true,
      path: "docs/repository-map.md",
      content: text,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Failed to read repo map" },
      { status: 500 }
    );
  }
}
