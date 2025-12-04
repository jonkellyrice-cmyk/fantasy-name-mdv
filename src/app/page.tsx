"use client";

import { useState } from "react";

export default function Home() {
  const [genre, setGenre] = useState("fantasy");
  const [archetypeA, setArchetypeA] = useState("");
  const [archetypeB, setArchetypeB] = useState("");
  const [count, setCount] = useState(5);

  const [results, setResults] = useState<string[]>([]);

const fantasySyllables = [
  "ae", "al", "ar", "bal", "bel", "cor", "dra", "el", "fae", "gal", "hal",
  "ian", "jor", "kal", "lor", "mir", "nar", "or", "quel", "rin", "sar",
  "thal", "ur", "val", "wyn", "yor", "zel"
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeFantasyName(a: string, b: string): string {
  const cleanA = a.trim().toLowerCase();
  const cleanB = b.trim().toLowerCase();

  // seed syllables from archetype words
  const seeds = [
    cleanA.slice(0, 2),
    cleanA.slice(-2),
    cleanB.slice(0, 2),
    cleanB.slice(-2),
  ].filter((s) => s.length === 2);

  const base = [...fantasySyllables, ...seeds];

  const parts = [
    randomItem(base),
    randomItem(base),
    Math.random() > 0.6 ? randomItem(base) : ""
  ].join("");

  // Capitalize nicely
  return parts.charAt(0).toUpperCase() + parts.slice(1);
}

function generateNames() {
  if (!archetypeA || !archetypeB) return;

  const output: string[] = [];
  for (let i = 0; i < count; i++) {
    output.push(makeFantasyName(archetypeA, archetypeB));
  }
  setResults(output);
}


  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Fantasy Name MDV Generator</h1>

      {/* Input Card */}
      <div className="bg-gray-800 p-6 rounded-xl max-w-md space-y-4">
        <div>
          <label className="block mb-1">Archetype A</label>
          <input
            type="text"
            value={archetypeA}
            onChange={(e) => setArchetypeA(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            placeholder="e.g. 'Elf', 'Knight', 'Druid'"
          />
        </div>

        <div>
          <label className="block mb-1">Archetype B</label>
          <input
            type="text"
            value={archetypeB}
            onChange={(e) => setArchetypeB(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            placeholder="e.g. 'Shadow', 'Storm', 'Flame'"
          />
        </div>

        <div>
          <label className="block mb-1">How many names?</label>
          <input
            type="number"
            value={count}
            min={1}
            max={50}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700"
          />
        </div>

        <button
          onClick={generateNames}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold"
        >
          Generate
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-bold">Results</h2>
          <ul className="space-y-1">
            {results.map((name, i) => (
              <li key={i} className="bg-gray-800 p-3 rounded">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
