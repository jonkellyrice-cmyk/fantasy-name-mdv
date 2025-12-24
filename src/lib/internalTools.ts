// src/lib/internalTools.ts

/**
 * Canonical gate for MDV internal tools (Dev Tools, Provenance, Patch, etc.)
 *
 * This MUST be the only place that decides whether internal tools are enabled.
 * All UI + API routes should import from here.
 */

function envTrue(v: string | undefined): boolean {
  if (!v) return false;
  return v === "1" || v.toLowerCase() === "true";
}

/**
 * Internal tools are enabled when:
 * - explicitly enabled via env
 * - OR we are running locally in dev
 *
 * This prevents accidental breakage after git pulls
 * while remaining safe in production.
 */
export function internalToolsEnabled(): boolean {
  // Explicit flags (preferred)
  if (envTrue(process.env.NEXT_PUBLIC_ENABLE_INTERNAL_TOOLS)) return true;
  if (envTrue(process.env.ENABLE_INTERNAL_TOOLS)) return true;

  // Local dev fallback (safe + intentional)
  if (process.env.NODE_ENV === "development") return true;

  return false;
}

/**
 * Throws if internal tools are accessed when disabled.
 * Use in API routes.
 */
export function assertInternalToolsEnabled(): void {
  if (!internalToolsEnabled()) {
    throw new Error("Internal tools are disabled by environment configuration.");
  }
}
