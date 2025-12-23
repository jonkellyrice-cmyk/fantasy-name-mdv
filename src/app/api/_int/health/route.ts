import { NextResponse } from "next/server";

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

  return NextResponse.json({
    ok: true,
    service: "fantasy-name-mdv",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
}
