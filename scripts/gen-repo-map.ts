import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths reliably in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repo root = one level up from /scripts
const repoRoot = path.resolve(__dirname, "..");

// WHOLE-REPO scan (intentional)
const scanRoot = repoRoot;

const repoName = path.basename(repoRoot);

// Output location (repo-root/docs)
const docsPath = path.resolve(repoRoot, "docs", "repository-map.md");

// Directories to ignore entirely
const IGNORE_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "dist",
  "build",
  ".turbo",
  ".vercel",
  ".idea",
  ".vscode",
  "_legacy",
  "_old",
  "_old-container",
  "docs", // 🚫 prevent repo-map from listing itself
]);

// File extensions worth showing
const INCLUDE_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".css",
  ".scss",
  ".yml",
  ".yaml",
]);

function shouldIgnoreDir(name: string) {
  if (IGNORE_DIRS.has(name)) return true;
  if (name.startsWith("_legacy")) return true;
  return false;
}

function isInterestingFile(name: string) {
  const ext = path.extname(name).toLowerCase();
  if (!ext) return true; // README, LICENSE, etc.
  return INCLUDE_EXTS.has(ext);
}

function walk(dir: string, prefix = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const dirs = entries
    .filter((e) => e.isDirectory() && !e.isSymbolicLink())
    .map((e) => e.name)
    .filter((n) => !shouldIgnoreDir(n))
    .sort((a, b) => a.localeCompare(b));

  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter(isInterestingFile)
    .sort((a, b) => a.localeCompare(b));

  const lines: string[] = [];

  const combined = [
    ...dirs.map((d) => ({ type: "dir" as const, name: d })),
    ...files.map((f) => ({ type: "file" as const, name: f })),
  ];

  combined.forEach((item, idx) => {
    const isLast = idx === combined.length - 1;
    const branch = isLast ? "└─ " : "├─ ";
    lines.push(`${prefix}${branch}${item.name}${item.type === "dir" ? "/" : ""}`);

    if (item.type === "dir") {
      const nextPrefix = prefix + (isLast ? "   " : "│  ");
      lines.push(...walk(path.join(dir, item.name), nextPrefix));
    }
  });

  return lines;
}

const header = `# Repository map

> Auto-generated. Do not edit manually.
> Regenerate from the repo root (${repoName}) with: \`npm run gen:repomap\`

Generated: ${new Date().toISOString()}

## ${repoName}/

\`\`\`
${repoName}/
${walk(scanRoot).join("\n")}
\`\`\`
`;

fs.mkdirSync(path.dirname(docsPath), { recursive: true });
fs.writeFileSync(docsPath, header, "utf8");

console.log(`Wrote: ${docsPath}`);
