"use client";

import { useEffect, useMemo, useState } from "react";

type SavedCharacter = {
  id: string;
  name: string;
  nickname: string | null;
  epithet: string | null;

  enclave_name: string;
  enclave_summary: string;
  enclave_hook: string;

  spirit_name: string | null;
  spirit_summary: string | null;
  spirit_hook: string | null;

  lore: string[] | null;
  stats_json: any;
  created_at?: string;
};

type SortMode = "recent" | "oldest" | "az";
type ViewMode = "expanded" | "compact";

function safeDateMs(s?: string) {
  if (!s) return 0;
  const ms = Date.parse(s);
  return Number.isFinite(ms) ? ms : 0;
}

export default function FavoritesPage() {
  const [items, setItems] = useState<SavedCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // deletion state (kept separate from load state)
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // NEW: sort + view controls
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("expanded");

  // NEW: copy feedback
  const [copyToast, setCopyToast] = useState<string | null>(null);

  function showCopied(msg: string) {
    setCopyToast(msg);
    window.clearTimeout((showCopied as any)._t);
    (showCopied as any)._t = window.setTimeout(() => setCopyToast(null), 1200);
  }

  async function copyToClipboard(text: string, successMsg = "Copied!") {
    try {
      await navigator.clipboard.writeText(text);
      showCopied(successMsg);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      alert("Copy failed. Your browser may be blocking clipboard access.");
    }
  }

  function formatFullBlock(c: SavedCharacter) {
    const lines: string[] = [];

    lines.push(c.name);

    if (c.epithet) lines.push(c.epithet);
    if (c.nickname) lines.push(`Nickname: "${c.nickname}"`);

    lines.push("");
    lines.push(`Enclave: ${c.enclave_name}`);
    if (c.enclave_summary) lines.push(`- ${c.enclave_summary}`);
    if (c.enclave_hook) lines.push(`- TTRPG Hook: ${c.enclave_hook}`);

    if (c.spirit_name) {
      lines.push("");
      lines.push(`Spirit-Bond: ${c.spirit_name}`);
      if (c.spirit_summary) lines.push(`- ${c.spirit_summary}`);
      if (c.spirit_hook) lines.push(`- TTRPG Hook: ${c.spirit_hook}`);
    }

    if (c.lore && c.lore.length > 0) {
      lines.push("");
      lines.push("Character Lore:");
      for (const line of c.lore) {
        lines.push(`- ${line}`);
      }
    }

    return lines.join("\n");
  }

  // refresh helper so delete can reload list cleanly
  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/saved-characters");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to load favorites");
      }

      const data = await res.json();
      setItems(data.items ?? []);
    } catch (err: any) {
      console.error("Failed to load favorites:", err);
      setError(err.message || "Failed to load favorites");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // one-click remove (DELETE) then refresh
  async function removeFavorite(id: string) {
    try {
      setIsDeleting(true);
      setDeleteError(null);

      const res = await fetch(`/api/saved-characters/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to remove favorite");
      }

      await refresh();
    } catch (err: any) {
      console.error("Failed to delete favorite:", err);
      setDeleteError(err.message || "Failed to remove from favorites");
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NEW: derived sorted list
  const sortedItems = useMemo(() => {
    const arr = [...items];

    if (sortMode === "recent") {
      arr.sort((a, b) => safeDateMs(b.created_at) - safeDateMs(a.created_at));
    } else if (sortMode === "oldest") {
      arr.sort((a, b) => safeDateMs(a.created_at) - safeDateMs(b.created_at));
    } else if (sortMode === "az") {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    }

    return arr;
  }, [items, sortMode]);

  return (
    <main className="min-h-screen p-6 md:p-10 bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Saved Elven Characters</h1>
          <p className="text-gray-300 text-sm md:text-base">
            These are the characters you&apos;ve starred from the generator.
          </p>
        </header>

        {/* NEW: controls row (only when there's content and not loading/error) */}
        {!loading && !error && items.length > 0 && (
          <section className="bg-gray-800/80 border border-gray-700 p-4 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <label className="text-xs text-gray-300">
                  Sort
                  <select
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    className="ml-2 p-2 rounded bg-gray-900 border border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="recent">Most recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="az">Name (A–Z)</option>
                  </select>
                </label>

                <label className="text-xs text-gray-300">
                  View
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                    className="ml-2 p-2 rounded bg-gray-900 border border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="expanded">Expanded</option>
                    <option value="compact">Compact</option>
                  </select>
                </label>
              </div>

              <div className="text-xs text-gray-400">
                {sortedItems.length} saved {sortedItems.length === 1 ? "character" : "characters"}
              </div>
            </div>
          </section>
        )}

        {loading && (
          <section className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl">
            <p className="text-gray-300 text-sm">Loading your favorites…</p>
          </section>
        )}

        {error && !loading && (
          <section className="bg-red-900/60 border border-red-700 p-6 rounded-xl">
            <p className="text-sm text-red-100">Failed to load favorites: {error}</p>
          </section>
        )}

        {/* delete error (separate from load error) */}
        {deleteError && !loading && (
          <section className="bg-red-900/40 border border-red-700 p-4 rounded-xl">
            <p className="text-xs text-red-100">{deleteError}</p>
          </section>
        )}

        {!loading && !error && items.length === 0 && (
          <section className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl">
            <p className="text-sm text-gray-300">
              You haven&apos;t saved any characters yet. Go back to the main generator, star a few
              favorites, and they&apos;ll appear here.
            </p>
          </section>
        )}

        {!loading && !error && items.length > 0 && (
          <section className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl space-y-4">
            <ul className="space-y-3">
              {sortedItems.map((c) => (
                <li
                  key={c.id}
                  className="bg-gray-900 border border-gray-700 p-4 rounded-lg"
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-lg break-words">{c.name}</div>

                      {/* Compact view shows only a tiny hint line */}
                      {viewMode === "compact" ? (
                        <div className="mt-1 text-xs text-gray-400">
                          <span className="text-gray-300">Enclave:</span>{" "}
                          <span className="text-gray-200">{c.enclave_name}</span>
                          {c.created_at && (
                            <>
                              <span className="mx-2 text-gray-600">•</span>
                              <span className="text-gray-500">
                                Saved {new Date(c.created_at).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          {c.epithet && (
                            <div className="text-xs text-gray-400 italic">{c.epithet}</div>
                          )}
                          {c.nickname && (
                            <div className="text-xs text-gray-400">
                              Nickname: “{c.nickname}”
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {c.created_at && (
                        <div className="text-[10px] text-gray-500 whitespace-nowrap">
                          Saved {new Date(c.created_at).toLocaleDateString()}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {/* Copy actions */}
                        <button
                          type="button"
                          onClick={() => void copyToClipboard(c.name, "Name copied")}
                          className="text-xs px-2 py-1 rounded border border-gray-600 text-gray-200 bg-gray-900 hover:bg-gray-800"
                          title="Copy the character name."
                        >
                          Copy name
                        </button>

                        

                        <button
                          type="button"
                          onClick={() => void copyToClipboard(formatFullBlock(c), "Full block copied")}
                          className="text-xs px-2 py-1 rounded border border-purple-500 text-purple-200 bg-gray-900 hover:bg-purple-500/10"
                          title="Copy the full character block (name, enclave, spirit-bond, lore)."
                        >
                          Copy full
                        </button>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => void removeFavorite(c.id)}
                          disabled={isDeleting}
                          className="text-xs px-2 py-1 rounded border border-red-500 text-red-200 bg-gray-900 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove this character from your saved list."
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded-only body */}
                  {viewMode === "expanded" && (
                    <>
                      {/* Enclave */}
                      <div className="mt-2 text-sm">
                        <span className="text-gray-300 font-semibold">Enclave: </span>
                        <span className="text-gray-100">{c.enclave_name}</span>
                      </div>
                      <ul className="mt-1 text-xs text-gray-400 list-disc list-inside space-y-0.5">
                        <li>{c.enclave_summary}</li>
                        <li>
                          <span className="text-purple-300">TTRPG Hook:</span>{" "}
                          {c.enclave_hook}
                        </li>
                      </ul>

                      {/* Spirit-Bond (if present) */}
                      {c.spirit_name && (
                        <>
                          <div className="mt-2 text-sm">
                            <span className="text-gray-300 font-semibold">
                              Spirit-Bond:{" "}
                            </span>
                            <span className="text-gray-100">{c.spirit_name}</span>
                          </div>
                          <ul className="mt-1 text-xs text-gray-400 list-disc list-inside space-y-0.5">
                            {c.spirit_summary && <li>{c.spirit_summary}</li>}
                            {c.spirit_hook && (
                              <li>
                                <span className="text-purple-300">TTRPG Hook:</span>{" "}
                                {c.spirit_hook}
                              </li>
                            )}
                          </ul>
                        </>
                      )}

                      {/* Lore bullets */}
                      {c.lore && c.lore.length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm text-gray-300 font-semibold">
                            Character Lore:
                          </div>
                          <ul className="mt-1 text-xs text-gray-400 list-disc list-inside space-y-0.5">
                            {c.lore.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* NEW: lightweight copy toast */}
        {copyToast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-gray-100 text-xs px-3 py-2 rounded-lg shadow">
            {copyToast}
          </div>
        )}
      </div>
    </main>
  );
}
