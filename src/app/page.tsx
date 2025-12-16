"use client";

import { useState, useEffect } from "react";

// ===========================
// USER ROLE HOOK (TEMP STUB)
// ===========================

type UserRoleFlags = {
  isDev: boolean;
  isPremium: boolean;
  isFree: boolean;
  isLoggedIn: boolean;
};

// TODO: replace this with real auth wiring once Supabase/Clerk is integrated
export function useUserRole(): UserRoleFlags {
  // While developing, we treat you as logged-in dev + premium:
  return {
    isDev: true,
    isPremium: true,
    isFree: false,
    isLoggedIn: true,
  };
}

// ===========================
// STATS: internal stat block
// ===========================

type NameStats = {
  // Elemental alignment (0–100)
  fire: number;
  water: number;
  earth: number;
  air: number;
  dark: number;

  // Role influence (0–100)
  warrior: number;
  hunter: number;
  seer: number;
  healer: number;
  bard: number;
  shadow: number;
  noble: number;
  smith: number;
  wanderer: number;

  // High-level thematic axes (0–100)
  luminosity: number; // bright vs shadowed
  wildness: number;   // wild vs courtly/civilized
  arcane: number;     // mystical vs purely physical
  renown: number;     // how “legend-tier” they feel

  // Additional tone axes (0–100)
  toneBright: number;
  toneShadow: number;
  toneBalanced: number;
  toneScore: number;

  // Dialect affinities (0–100)
  dialectHigh: number;
  dialectForest: number;
  dialectSea: number;
  dialectMountain: number;
  dialectShadow: number;

  // Flavor flags
  hasEpithet: boolean;
  hasNickname: boolean;
};

// Keep this alias so older code that still uses StatBlock survives.
type StatBlock = NameStats;

/* ============================================
   NEW: Canonical stats type for save system
   ============================================ */
export type InternalStats = NameStats;


// ===========================
// ENCLAVE TYPES (moved up here) and spirit-bond
// ===========================

type EnclaveId =
  | "verdant-remnant"
  | "astral-scribes"
  | "thorn-circle"
  | "windward-path"
  | "ember-forge"
  | "moonlit-vigil"
  | "duskwatch"
  | "riverbinding"
  | "loreweave"
  | "ironbough"
  | "starfall-sentinels"
  | "veilwalkers";

type Enclave = {
  id: EnclaveId;
  name: string;
  summary: string;
  ttrpgTip: string;
  score: (stats: NameStats) => number;
};

// 🔮 NEW: Spirit-Bond types
type SpiritBondId =
  | "fleet-step"
  | "ember-blood"
  | "moonshadow-sight"
  | "verdant-mend"
  | "starbound-will"
  | "dreamecho"
  | "stonegrace"
  | "tidebound-gift"
  | "veil-touched"
  | "battle-trance"
  | "silver-tongue"
  | "ancestral-ward"
  | "runesingers-touch"
  | "heartweaver-sense"
  | "wildheart-pact";


type SpiritBond = {
  id: SpiritBondId;
  name: string;
  summary: string;
  ttrpgTip: string;
  score: (stats: NameStats) => number;
};

type GeneratedEntry = {
  name: string;
  lore?: string;
  stats?: NameStats;
  enclave?: Enclave | null;
  spiritBond?: SpiritBond | null; // ⬅️ NEW
};


/* ===========================
   ELVISH LANGUAGE ENGINE
   (Integrated, no external imports)
   =========================== */

type Gender = "neutral" | "male" | "female";

const ELEMENTS = {
  FIRE: "fire",
  WATER: "water",
  EARTH: "earth",
  AIR: "air",
  DARK: "darkness",
} as const;

type Element = (typeof ELEMENTS)[keyof typeof ELEMENTS];

const DIALECTS = {
  HIGH: "high",
  FOREST: "forest",
  SEA: "sea",
  MOUNTAIN: "mountain",
  SHADOW: "shadow",
} as const;

type Dialect = (typeof DIALECTS)[keyof typeof DIALECTS];

type ProtoRoot = {
  key: string;
  proto: string;
  elements: Element[];
};

const PROTO_ROOTS: ProtoRoot[] = [
  // A. ELEMENTAL ROOTS (core)
    // --- FIRE ---
  { key: "fire", proto: "pyran", elements: [ELEMENTS.FIRE] },
  { key: "flame", proto: "sirla", elements: [ELEMENTS.FIRE] },
  { key: "ember", proto: "kaleth", elements: [ELEMENTS.FIRE] },
  { key: "heat", proto: "ulmar", elements: [ELEMENTS.FIRE] },
  { key: "smoke", proto: "vohran", elements: [ELEMENTS.FIRE] },
  { key: "spark", proto: "tilos", elements: [ELEMENTS.FIRE] },
  { key: "blaze", proto: "raevir", elements: [ELEMENTS.FIRE] },
  { key: "ash", proto: "ulan", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "pyre", proto: "sevrin", elements: [ELEMENTS.FIRE] },
  { key: "char", proto: "makkur", elements: [ELEMENTS.FIRE] },
  { key: "molten", proto: "lavren", elements: [ELEMENTS.FIRE] },
  { key: "inferno", proto: "kaurith", elements: [ELEMENTS.FIRE] },

  // --- LIGHT / CELESTIAL (fire/air hybrid) ---
  { key: "light", proto: "alir", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "gleam", proto: "solai", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "radiance", proto: "faelor", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "star", proto: "selun", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "sun", proto: "tavos", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "dawn", proto: "aureth", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "halo", proto: "liruen", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "glow", proto: "rosyel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },

  // --- AIR ---
  { key: "breath", proto: "aevor", elements: [ELEMENTS.AIR] },
  { key: "wind", proto: "suith", elements: [ELEMENTS.AIR] },
  { key: "storm", proto: "aekan", elements: [ELEMENTS.AIR] },
  { key: "sky", proto: "vion", elements: [ELEMENTS.AIR] },
  { key: "gale", proto: "thraen", elements: [ELEMENTS.AIR] },
  { key: "cloud", proto: "lorun", elements: [ELEMENTS.AIR] },
  { key: "whirl", proto: "cyraeth", elements: [ELEMENTS.AIR] },
  { key: "song", proto: "aeluin", elements: [ELEMENTS.AIR] }, 
  { key: "current", proto: "vairas", elements: [ELEMENTS.AIR] },
  { key: "zephyr", proto: "zevran", elements: [ELEMENTS.AIR] },

  // --- WATER ---
  { key: "water", proto: "mirea", elements: [ELEMENTS.WATER] },
  { key: "river", proto: "gleno", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "ocean", proto: "thalor", elements: [ELEMENTS.WATER] },
  { key: "wave", proto: "ulai", elements: [ELEMENTS.WATER] },
  { key: "tide", proto: "maruin", elements: [ELEMENTS.WATER] },
  { key: "mist", proto: "selmor", elements: [ELEMENTS.WATER] },
  { key: "deep", proto: "nolath", elements: [ELEMENTS.WATER] },
  { key: "foam", proto: "avris", elements: [ELEMENTS.WATER] },
  { key: "rain", proto: "lirath", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "flood", proto: "raedun", elements: [ELEMENTS.WATER] },
  { key: "brook", proto: "cailin", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },

  // --- EARTH ---
  { key: "earth", proto: "mosil", elements: [ELEMENTS.EARTH] },
  { key: "stone", proto: "garon", elements: [ELEMENTS.EARTH] },
  { key: "mountain", proto: "dunag", elements: [ELEMENTS.EARTH] },
  { key: "wood", proto: "talar", elements: [ELEMENTS.EARTH] },
  { key: "root", proto: "breth", elements: [ELEMENTS.EARTH] },
  { key: "clay", proto: "morin", elements: [ELEMENTS.EARTH] },
  { key: "iron", proto: "ferun", elements: [ELEMENTS.EARTH] },
  { key: "soil", proto: "loeth", elements: [ELEMENTS.EARTH] },
  { key: "peak", proto: "kavor", elements: [ELEMENTS.EARTH] },
  { key: "vale", proto: "serin", elements: [ELEMENTS.EARTH] },

  // --- VOID / DARKNESS ---
  { key: "void", proto: "ekhar", elements: [ELEMENTS.DARK] },
  { key: "night", proto: "uol", elements: [ELEMENTS.DARK] },
  { key: "shadow", proto: "velun", elements: [ELEMENTS.DARK] },
  { key: "gloom", proto: "draven", elements: [ELEMENTS.DARK] },
  { key: "pale", proto: "saevor", elements: [ELEMENTS.DARK] },
  { key: "hollow", proto: "nullar", elements: [ELEMENTS.DARK] },
  { key: "smother", proto: "murith", elements: [ELEMENTS.DARK] },
  { key: "whisper", proto: "silun", elements: [ELEMENTS.DARK] },
  { key: "grave", proto: "dolmar", elements: [ELEMENTS.DARK, ELEMENTS.EARTH] },
  { key: "dread", proto: "kaorin", elements: [ELEMENTS.DARK] },

// A. ELEMENTAL ROOTS (additional, extended)
// FIRE-leaning
{ key: "spark", proto: "scaelor", elements: [ELEMENTS.FIRE] },
{ key: "spark", proto: "iscarel", elements: [ELEMENTS.FIRE] },
{ key: "spark", proto: "skarun", elements: [ELEMENTS.FIRE] },
{ key: "blaze", proto: "braevun", elements: [ELEMENTS.FIRE] },
{ key: "blaze", proto: "blaeron", elements: [ELEMENTS.FIRE] },
{ key: "blaze", proto: "braviel", elements: [ELEMENTS.FIRE] },
{ key: "coal", proto: "corain", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "coal", proto: "colemar", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "coal", proto: "kalbor", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "radiance", proto: "relith", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "radiance", proto: "radion", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "radiance", proto: "rielas", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "halo", proto: "aloren", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "halo", proto: "halion", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "halo", proto: "olavel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "aurora", proto: "aurilai", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "aurora", proto: "aurisel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "aurora", proto: "orivaen", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "ash", proto: "askaen", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "ash", proto: "asvel", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "ash", proto: "eskar", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "smoke", proto: "fumair", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "smoke", proto: "fumarel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "smoke", proto: "smorain", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "magma", proto: "magrion", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "magma", proto: "magren", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "magma", proto: "lavorn", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "inferno", proto: "invarae", elements: [ELEMENTS.FIRE] },
{ key: "inferno", proto: "infernul", elements: [ELEMENTS.FIRE] },
{ key: "inferno", proto: "velkar", elements: [ELEMENTS.FIRE] },
{ key: "ember", proto: "emberel", elements: [ELEMENTS.FIRE] },
{ key: "ember", proto: "emvorn", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "ember", proto: "imbrial", elements: [ELEMENTS.FIRE] },
{ key: "cinder", proto: "cindrel", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "cinder", proto: "cindrae", elements: [ELEMENTS.FIRE] },
{ key: "cinder", proto: "cindar", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },

// AIR-leaning
{ key: "breeze", proto: "zevail", elements: [ELEMENTS.AIR] },
{ key: "breeze", proto: "brethel", elements: [ELEMENTS.AIR] },
{ key: "breeze", proto: "aervas", elements: [ELEMENTS.AIR] },
{ key: "gale", proto: "galruin", elements: [ELEMENTS.AIR] },
{ key: "gale", proto: "gaelun", elements: [ELEMENTS.AIR] },
{ key: "gale", proto: "galeth", elements: [ELEMENTS.AIR] },
{ key: "thunder", proto: "torveln", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "thunder", proto: "torvash", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "thunder", proto: "thonrak", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "lightning", proto: "fulmaris", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "lightning", proto: "fulraan", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "lightning", proto: "lirveth", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "cloud", proto: "nuveir", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "cloud", proto: "nuvarel", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "cloud", proto: "claumar", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "gust", proto: "gusrael", elements: [ELEMENTS.AIR] },
{ key: "gust", proto: "guraen", elements: [ELEMENTS.AIR] },
{ key: "whirl", proto: "virlen", elements: [ELEMENTS.AIR] },
{ key: "whirl", proto: "valcir", elements: [ELEMENTS.AIR] },

// WATER-leaning
{ key: "tide", proto: "marain", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "tide", proto: "tivar", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "tide", proto: "maroth", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "spring_water", proto: "foneth", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "spring_water", proto: "fontira", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "spring_water", proto: "brialun", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "deep", proto: "proverin", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "deep", proto: "dovrel", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "deep", proto: "morvain", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "foam", proto: "espiral", elements: [ELEMENTS.WATER] },
{ key: "foam", proto: "fulain", elements: [ELEMENTS.WATER] },
{ key: "mist", proto: "mireth", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "mist", proto: "nisrael", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "rain", proto: "pluvain", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "rain", proto: "renvar", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },

// EARTH-leaning
{ key: "ore", proto: "mineth", elements: [ELEMENTS.EARTH] },
{ key: "ore", proto: "orvain", elements: [ELEMENTS.EARTH] },
{ key: "ore", proto: "dural", elements: [ELEMENTS.EARTH] },
{ key: "chasm", proto: "cairuth", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "chasm", proto: "cavrel", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "chasm", proto: "vallun", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "clay", proto: "argelan", elements: [ELEMENTS.EARTH] },
{ key: "clay", proto: "glevar", elements: [ELEMENTS.EARTH] },
{ key: "root", proto: "radren", elements: [ELEMENTS.EARTH] },
{ key: "root", proto: "raveln", elements: [ELEMENTS.EARTH] },
{ key: "soil", proto: "teroul", elements: [ELEMENTS.EARTH] },
{ key: "soil", proto: "lumdar", elements: [ELEMENTS.EARTH] },
{ key: "shale", proto: "scalen", elements: [ELEMENTS.EARTH] },
{ key: "shale", proto: "shalvar", elements: [ELEMENTS.EARTH] },

// DARK / LIMINAL
{ key: "eclipse", proto: "ekliven", elements: [ELEMENTS.DARK, ELEMENTS.FIRE] },
{ key: "eclipse", proto: "murhel", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "gloom", proto: "glomir", elements: [ELEMENTS.DARK] },
{ key: "gloom", proto: "mordrel", elements: [ELEMENTS.DARK] },
{ key: "shadow", proto: "umbral", elements: [ELEMENTS.DARK] },
{ key: "shadow", proto: "tenavel", elements: [ELEMENTS.DARK] },
{ key: "hollow", proto: "cavial", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "hollow", proto: "hollun", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },

  // B. NATURE & LANDSCAPE (core)
  { key: "forest", proto: "dyal", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "leaf", proto: "althe", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "branch", proto: "torin", elements: [ELEMENTS.EARTH] },
  { key: "root", proto: "thalun", elements: [ELEMENTS.EARTH] },
  { key: "bark", proto: "koen", elements: [ELEMENTS.EARTH] },
  { key: "meadow", proto: "lainor", elements: [ELEMENTS.EARTH] },
  { key: "valley", proto: "nosim", elements: [ELEMENTS.EARTH] },
  { key: "cliff", proto: "skarim", elements: [ELEMENTS.EARTH] },
  { key: "peak", proto: "kenor", elements: [ELEMENTS.EARTH] },
  { key: "cave", proto: "holun", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
  { key: "snow", proto: "mithae", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "ice", proto: "keral", elements: [ELEMENTS.WATER] },
  { key: "mist", proto: "nephal", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "rain", proto: "losied", elements: [ELEMENTS.WATER] },
  { key: "night", proto: "nuel", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "moon", proto: "lua", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "dawn", proto: "arail", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "dusk", proto: "ombran", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
  { key: "starfall", proto: "selkan", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "desert", proto: "tharuk", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },

  // B. NATURE & LANDSCAPE (additional, refined)
  { key: "grove", proto: "nemeth", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "thicket", proto: "druval", elements: [ELEMENTS.EARTH] },
  { key: "hill", proto: "brigan", elements: [ELEMENTS.EARTH] },
  { key: "plain", proto: "kamrel", elements: [ELEMENTS.EARTH] },
  { key: "marsh", proto: "palun", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "fen", proto: "muireth", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "shore", proto: "lanor", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "island", proto: "islen", elements: [ELEMENTS.WATER] },
  { key: "reed", proto: "cairith", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "field", proto: "prathen", elements: [ELEMENTS.EARTH] },
  { key: "grottos", proto: "grothun", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
  { key: "ridge", proto: "carnon", elements: [ELEMENTS.EARTH] },
  { key: "glade", proto: "lareth", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "sunset", proto: "tramur", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "starlight", proto: "stelair", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "eclipse", proto: "eklir", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "horizon", proto: "orivon", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "glen", proto: "glennir", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "harbor", proto: "porain", elements: [ELEMENTS.WATER] },
  { key: "crag", proto: "skarn", elements: [ELEMENTS.EARTH] },
  // Groves / Thickets / Flora
{ key: "grove", proto: "nemorae", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "grove", proto: "galeth", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
{ key: "thicket", proto: "tharven", elements: [ELEMENTS.EARTH] },
{ key: "brush", proto: "brusil", elements: [ELEMENTS.EARTH] },

{ key: "vine", proto: "virel", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "willow", proto: "salaen", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "thorns", proto: "driscar", elements: [ELEMENTS.EARTH] },
{ key: "briarwood", proto: "briavel", elements: [ELEMENTS.EARTH] },

// Landforms
{ key: "hill", proto: "hollan", elements: [ELEMENTS.EARTH] },
{ key: "hill", proto: "briscaen", elements: [ELEMENTS.EARTH] },
{ key: "plain", proto: "vellor", elements: [ELEMENTS.EARTH] },
{ key: "plateau", proto: "talven", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },

{ key: "ridge", proto: "karith", elements: [ELEMENTS.EARTH] },
{ key: "ridge", proto: "cravern", elements: [ELEMENTS.EARTH] },
{ key: "crag", proto: "skarnel", elements: [ELEMENTS.EARTH] },
{ key: "crag", proto: "karusk", elements: [ELEMENTS.EARTH] },

{ key: "canyon", proto: "canrel", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "ravine", proto: "ravos", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "grotto", proto: "grothain", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "sinkhole", proto: "dolairn", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },

// Waterways / Wetlands
{ key: "marsh", proto: "paleth", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "marsh", proto: "morain", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "fen", proto: "fennor", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "fen", proto: "muiral", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },

{ key: "lagoon", proto: "lagrel", elements: [ELEMENTS.WATER] },
{ key: "shore", proto: "shalor", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "shore", proto: "maralin", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "island", proto: "yslar", elements: [ELEMENTS.WATER] },

{ key: "bog", proto: "brunal", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "delta", proto: "deltir", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },

// Light / Sky / Phenomena
{ key: "sunset", proto: "selmarun", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "sunset", proto: "tramiel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "horizon", proto: "oraelan", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "eclipse", proto: "eclorin", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "eclipse", proto: "eklaev", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "starlight", proto: "stelmir", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "starlight", proto: "lestar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },

// Misc natural concepts
{ key: "harbor", proto: "poralen", elements: [ELEMENTS.WATER] },
{ key: "glen", proto: "glenair", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "glen", proto: "glavorn", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "field", proto: "praelor", elements: [ELEMENTS.EARTH] },

  // C. MOTION / DANCE (core)
  { key: "step", proto: "tiren", elements: [ELEMENTS.AIR] },
  { key: "leap", proto: "kaelu", elements: [ELEMENTS.AIR] },
  { key: "spin", proto: "viros", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "glide", proto: "suilen", elements: [ELEMENTS.AIR] },
  { key: "sway", proto: "neril", elements: [ELEMENTS.WATER] },
  { key: "twist", proto: "kairum", elements: [ELEMENTS.AIR] },
  { key: "flow", proto: "merai", elements: [ELEMENTS.WATER] },
  { key: "fall", proto: "douren", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "rise", proto: "akan", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "whirl", proto: "toruin", elements: [ELEMENTS.AIR] },
  { key: "circle", proto: "orian", elements: [ELEMENTS.AIR] },
  { key: "bend", proto: "thulin", elements: [ELEMENTS.EARTH] },
  { key: "break", proto: "kradan", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
  { key: "strike", proto: "baruk", elements: [ELEMENTS.FIRE] },
  { key: "cut", proto: "karesh", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "pulse", proto: "thiren", elements: [ELEMENTS.FIRE] },
  { key: "echo", proto: "drunel", elements: [ELEMENTS.EARTH] },
  { key: "drift", proto: "aelun", elements: [ELEMENTS.AIR] },
  { key: "scatter", proto: "velor", elements: [ELEMENTS.AIR] },
  { key: "gather", proto: "hiran", elements: [ELEMENTS.EARTH] },
  { key: "stride", proto: "varen", elements: [ELEMENTS.AIR] },
{ key: "stride", proto: "strael", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },

{ key: "rush", proto: "corai", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "rush", proto: "ravel", elements: [ELEMENTS.AIR] },

{ key: "weave", proto: "thelir", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "weave", proto: "wilen", elements: [ELEMENTS.WATER] },

{ key: "tread", proto: "tavour", elements: [ELEMENTS.EARTH] },
{ key: "tread", proto: "dalren", elements: [ELEMENTS.EARTH] },

{ key: "lilt", proto: "laevir", elements: [ELEMENTS.AIR] },
{ key: "lilt", proto: "liren", elements: [ELEMENTS.AIR] },

{ key: "sprint", proto: "saril", elements: [ELEMENTS.AIR] },
{ key: "sprint", proto: "akren", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },

{ key: "dodge", proto: "derash", elements: [ELEMENTS.AIR] },
{ key: "dodge", proto: "doiran", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },

{ key: "swerve", proto: "syrinel", elements: [ELEMENTS.AIR] },
{ key: "swerve", proto: "vairum", elements: [ELEMENTS.AIR] },

{ key: "pivot", proto: "peilan", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "pivot", proto: "pirun", elements: [ELEMENTS.AIR] },

{ key: "tilt", proto: "talmiar", elements: [ELEMENTS.AIR] },
{ key: "tilt", proto: "tilor", elements: [ELEMENTS.AIR] },

{ key: "stamp", proto: "storgal", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "stamp", proto: "brathen", elements: [ELEMENTS.EARTH] },

{ key: "clash", proto: "karvel", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "clash", proto: "karesil", elements: [ELEMENTS.FIRE] },

{ key: "shimmer", proto: "shaviel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "shimmer", proto: "savaen", elements: [ELEMENTS.AIR] },

{ key: "tumble", proto: "tavril", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "tumble", proto: "turlen", elements: [ELEMENTS.AIR] },

{ key: "cascade", proto: "casenil", elements: [ELEMENTS.WATER] },
{ key: "cascade", proto: "fallaren", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },

{ key: "flutter", proto: "felerin", elements: [ELEMENTS.AIR] },
{ key: "flutter", proto: "falunai", elements: [ELEMENTS.AIR] },

{ key: "charge", proto: "charon", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "charge", proto: "velkan", elements: [ELEMENTS.FIRE] },

{ key: "thrum", proto: "thumrel", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "thrum", proto: "dravel", elements: [ELEMENTS.EARTH] },

{ key: "oscillate", proto: "osiren", elements: [ELEMENTS.AIR] },
{ key: "oscillate", proto: "osval", elements: [ELEMENTS.AIR] },

{ key: "spiral", proto: "spiraen", elements: [ELEMENTS.AIR] },
{ key: "spiral", proto: "spirunel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },

{ key: "quicken", proto: "quirael", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "quicken", proto: "kiren", elements: [ELEMENTS.AIR] },

{ key: "linger", proto: "linvel", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "linger", proto: "solin", elements: [ELEMENTS.WATER] },

{ key: "collapse", proto: "kolvar", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "collapse", proto: "druvan", elements: [ELEMENTS.EARTH] },

  // C. MOTION / DANCE (additional, refined)
  { key: "tread", proto: "passil", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "stride", proto: "gradel", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "charge", proto: "ravan", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "rush", proto: "yriven", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "turn", proto: "voltir", elements: [ELEMENTS.AIR] },
  { key: "spin_fast", proto: "spiron", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "dance", proto: "cairia", elements: [ELEMENTS.AIR] },
  { key: "weave", proto: "tramar", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "glimmer", proto: "glisar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "surge", proto: "onval", elements: [ELEMENTS.WATER, ELEMENTS.FIRE] },
  { key: "flow_slow", proto: "lentar", elements: [ELEMENTS.WATER] },
  { key: "rush_water", proto: "torenth", elements: [ELEMENTS.WATER] },
  { key: "hover", proto: "sosair", elements: [ELEMENTS.AIR] },
  { key: "crawl", proto: "tarthun", elements: [ELEMENTS.EARTH] },
  { key: "slide", proto: "scalun", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "coil", proto: "corvim", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "flare", proto: "fiora", elements: [ELEMENTS.FIRE] },
  { key: "quiver", proto: "tremel", elements: [ELEMENTS.AIR] },
  { key: "waltz", proto: "valsera", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "rush_wind", proto: "galvorn", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "glissade", proto: "glissair", elements: [ELEMENTS.AIR] },
{ key: "flutter_step", proto: "flureth", elements: [ELEMENTS.AIR] },
{ key: "pivot_soft", proto: "pirolen", elements: [ELEMENTS.AIR] },
{ key: "dip", proto: "dovain", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "stretch", proto: "stirael", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },

// rhythmic, ritual motion
{ key: "chant_step", proto: "manarel", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
{ key: "ritual_circle", proto: "cerain", elements: [ELEMENTS.AIR] },
{ key: "echo_step", proto: "echorin", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
{ key: "pulsebeat", proto: "pulsair", elements: [ELEMENTS.FIRE] },
{ key: "stamp_soft", proto: "brumel", elements: [ELEMENTS.EARTH] },

// agile combat movement
{ key: "vault", proto: "vaelkan", elements: [ELEMENTS.AIR] },
{ key: "lunge", proto: "luneth", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "parry", proto: "parun", elements: [ELEMENTS.AIR] },
{ key: "retreat", proto: "revalen", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "advance", proto: "avornel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },

// flowing / watery movement
{ key: "eddy", proto: "edrel", elements: [ELEMENTS.WATER] },
{ key: "spiral_water", proto: "spiralai", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "wave_dance", proto: "valmira", elements: [ELEMENTS.WATER] },
{ key: "cascade_fast", proto: "cavril", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "tide_turn", proto: "tidron", elements: [ELEMENTS.WATER] },

// airy / weightless motion
{ key: "lift", proto: "levinor", elements: [ELEMENTS.AIR] },
{ key: "rise_soft", proto: "aelorin", elements: [ELEMENTS.AIR] },
{ key: "spiral_up", proto: "koiral", elements: [ELEMENTS.AIR] },
{ key: "soar_low", proto: "solven", elements: [ELEMENTS.AIR] },
{ key: "rush_updraft", proto: "udvaran", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },

// percussive / grounded steps
{ key: "pound", proto: "dromal", elements: [ELEMENTS.EARTH] },
{ key: "thud", proto: "thuran", elements: [ELEMENTS.EARTH] },
{ key: "march", proto: "maruth", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
{ key: "tamp", proto: "tavelk", elements: [ELEMENTS.EARTH] },
{ key: "grind", proto: "gralen", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },

// chaotic or magical motion
{ key: "burst_move", proto: "breskai", elements: [ELEMENTS.FIRE] },
{ key: "flicker_step", proto: "fliskel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "warp_twist", proto: "varunai", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "shiver", proto: "shival", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "rift_step", proto: "rivelon", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },

// soft micro-movements (good for stealth, rogues, shadow types)
{ key: "tiptoe", proto: "tivrel", elements: [ELEMENTS.AIR] },
{ key: "creep", proto: "cravin", elements: [ELEMENTS.DARK, ELEMENTS.EARTH] },
{ key: "slide_soft", proto: "silvain", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "edge_move", proto: "escaro", elements: [ELEMENTS.EARTH] },
{ key: "stalk", proto: "stelmar", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },

  // D. EMOTION & SPIRIT (core)
  { key: "love", proto: "amriel", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "sorrow", proto: "melkun", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "joy", proto: "talia", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "anger", proto: "urvak", elements: [ELEMENTS.FIRE] },
  { key: "courage", proto: "varun", elements: [ELEMENTS.FIRE] },
  { key: "fear", proto: "shuvan", elements: [ELEMENTS.DARK] },
  { key: "hope", proto: "aeriel", elements: [ELEMENTS.AIR] },
  { key: "memory", proto: "ernei", elements: [ELEMENTS.WATER] },
  { key: "dream", proto: "oneir", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "wisdom", proto: "saren", elements: [ELEMENTS.AIR] },
  { key: "rage", proto: "krovun", elements: [ELEMENTS.FIRE] },
  { key: "grief", proto: "dhoiral", elements: [ELEMENTS.DARK] },
  { key: "rest", proto: "lumen", elements: [ELEMENTS.AIR] },
  { key: "desire", proto: "siren", elements: [ELEMENTS.FIRE] },
  { key: "longing", proto: "meriel", elements: [ELEMENTS.WATER] },
  { key: "honor", proto: "thalorun", elements: [ELEMENTS.EARTH] },
  { key: "oath", proto: "oken", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "fate", proto: "miron", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "secret", proto: "kephal", elements: [ELEMENTS.DARK] },
  { key: "will", proto: "adanir", elements: [ELEMENTS.FIRE] },

  // D. EMOTION & SPIRIT (additional, refined)
  { key: "mercy", proto: "clemar", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "wrath", proto: "furion", elements: [ELEMENTS.FIRE] },
  { key: "serenity", proto: "pasiel", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "wonder", proto: "mirava", elements: [ELEMENTS.AIR] },
  { key: "despair", proto: "tristal", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "faith", proto: "credhal", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "devotion", proto: "devarae", elements: [ELEMENTS.FIRE, ELEMENTS.WATER] },
  { key: "vengeance", proto: "vendrak", elements: [ELEMENTS.FIRE, ELEMENTS.DARK] },
  { key: "envy", proto: "invidar", elements: [ELEMENTS.DARK] },
  { key: "pride", proto: "suvaron", elements: [ELEMENTS.FIRE] },
  { key: "pity", proto: "miserel", elements: [ELEMENTS.WATER] },
  { key: "calm", proto: "placir", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "zeal", proto: "ardun", elements: [ELEMENTS.FIRE] },
  { key: "awe", proto: "stavel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "melancholy", proto: "dolvar", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
  { key: "devotion_spirit", proto: "anamar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "spite", proto: "acrar", elements: [ELEMENTS.DARK] },
  { key: "tranquility", proto: "quiesan", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "resolve", proto: "fermir", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
  { key: "inspiration", proto: "spiriel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "compassion", proto: "coravaen", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "kindness", proto: "amrilor", elements: [ELEMENTS.WATER] },
{ key: "patience", proto: "volenai", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
{ key: "loyalty", proto: "devran", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "humility", proto: "umarel", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },

{ key: "jealousy", proto: "zelvar", elements: [ELEMENTS.DARK] },
{ key: "rage_inner", proto: "ferunai", elements: [ELEMENTS.FIRE] },
{ key: "yearning", proto: "laerun", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "solace", proto: "solmarin", elements: [ELEMENTS.WATER] },
{ key: "comfort", proto: "calvor", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },

{ key: "ambition", proto: "ambrel", elements: [ELEMENTS.FIRE] },
{ key: "clarity", proto: "clarien", elements: [ELEMENTS.AIR] },
{ key: "cunning", proto: "cunrel", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "malice", proto: "malvar", elements: [ELEMENTS.DARK, ELEMENTS.FIRE] },
{ key: "gentleness", proto: "lenair", elements: [ELEMENTS.WATER] },

{ key: "terror", proto: "tervain", elements: [ELEMENTS.DARK] },
{ key: "panic", proto: "panrel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "shock", proto: "skarien", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "grit", proto: "graven", elements: [ELEMENTS.EARTH] },
{ key: "boldness", proto: "valerin", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },

{ key: "bliss", proto: "blisar", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "ecstasy", proto: "ekstiel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "sacred", proto: "sanorim", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "blessing", proto: "beneir", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "grace", proto: "graciel", elements: [ELEMENTS.AIR] },

{ key: "bitterness", proto: "amarun", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
{ key: "remorse", proto: "penvar", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "forgiveness", proto: "perdonai", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "torment", proto: "torvul", elements: [ELEMENTS.DARK] },
{ key: "doubt", proto: "dovrel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },

{ key: "elation", proto: "elaevin", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "affection", proto: "affriel", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "praise", proto: "laudar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "shame", proto: "vergil", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
{ key: "regret", proto: "reminar", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },

{ key: "aether_spirit", proto: "aeralun", elements: [ELEMENTS.AIR] },
{ key: "shadow_spirit", proto: "umraval", elements: [ELEMENTS.DARK] },
{ key: "inner_balance", proto: "equilar", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "inner_fire", proto: "ignarel", elements: [ELEMENTS.FIRE] },
{ key: "soul_strength", proto: "fortiel", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },

  // E. ANIMALS & CREATURES (core)
  { key: "wolf", proto: "garuin", elements: [ELEMENTS.EARTH] },
  { key: "hawk", proto: "aerik", elements: [ELEMENTS.AIR] },
  { key: "eagle", proto: "tharun", elements: [ELEMENTS.AIR] },
  { key: "serpent", proto: "zulai", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
  { key: "bear", proto: "drunak", elements: [ELEMENTS.EARTH] },
  { key: "deer", proto: "lyonel", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "fox", proto: "verin", elements: [ELEMENTS.AIR] },
  { key: "owl", proto: "thurel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
  { key: "lion", proto: "karum", elements: [ELEMENTS.FIRE] },
  { key: "horse", proto: "mirendal", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "hound", proto: "barun", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "raven", proto: "orvul", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
  { key: "boar", proto: "galen", elements: [ELEMENTS.EARTH] },
  { key: "fish", proto: "siru", elements: [ELEMENTS.WATER] },
  { key: "whale", proto: "ovamar", elements: [ELEMENTS.WATER] },
  { key: "spider", proto: "kelreth", elements: [ELEMENTS.DARK] },
  { key: "insect", proto: "phiril", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
  { key: "dragon", proto: "kalduin", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "lizard", proto: "meruk", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
  { key: "bat", proto: "dhuair", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "stag", proto: "threnil", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
{ key: "falcon", proto: "arveth", elements: [ELEMENTS.AIR] },
{ key: "lynx", proto: "vesiran", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "panther", proto: "melkara", elements: [ELEMENTS.DARK] },
{ key: "staghound", proto: "bravuil", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },

{ key: "otter", proto: "lunren", elements: [ELEMENTS.WATER] },
{ key: "seal", proto: "morilan", elements: [ELEMENTS.WATER] },
{ key: "shark", proto: "varusk", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "jellyfish", proto: "nuvrea", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "sea_serpent", proto: "thalusk", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },

{ key: "stagbeetle", proto: "karveth", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "firefly", proto: "lumera", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "moth_spirit", proto: "mavriel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "hornet", proto: "zarunel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "antelope", proto: "rimeath", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },

{ key: "goat", proto: "cairun", elements: [ELEMENTS.EARTH] },
{ key: "ram", proto: "dorvach", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "yak", proto: "marvun", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "camel", proto: "saref", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "ox", proto: "thural", elements: [ELEMENTS.EARTH] },

{ key: "dolphin", proto: "silarae", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
{ key: "squid", proto: "kravien", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "eel", proto: "zeluin", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "coral_spirit", proto: "corvel", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
{ key: "sea_turtle", proto: "morakuin", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },

{ key: "wildcat", proto: "felorin", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "hyena", proto: "yrakar", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "jackal", proto: "sharuen", elements: [ELEMENTS.DARK, ELEMENTS.EARTH] },
{ key: "vulture", proto: "khariel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "sparrow", proto: "liruen", elements: [ELEMENTS.AIR] },

{ key: "boar_spirit", proto: "grathul", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "fox_spirit", proto: "verulai", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "wolf_spirit", proto: "garvarin", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "raven_spirit", proto: "orvanel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "lion_spirit", proto: "karvion", elements: [ELEMENTS.FIRE] },

{ key: "kelpie", proto: "mordalae", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "griffin", proto: "grivain", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "unicorn", proto: "alunor", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "warg", proto: "vorgral", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
{ key: "wyrmling", proto: "kaldrei", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },

  // E. ANIMALS & CREATURES (additional, refined)
  { key: "stag", proto: "cerun", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "falcon", proto: "falcir", elements: [ELEMENTS.AIR] },
  { key: "wolfhound", proto: "garvar", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
  { key: "crow", proto: "corven", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
  { key: "swan", proto: "albar", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "otter", proto: "lutrien", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "foxfire", proto: "verial", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "lynx", proto: "lunchar", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "hare", proto: "conel", elements: [ELEMENTS.EARTH] },
  { key: "wolf_spirit", proto: "gariel", elements: [ELEMENTS.DARK, ELEMENTS.EARTH] },
  { key: "serpent_sea", proto: "moraiz", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
  { key: "phoenix", proto: "fenicar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "rat", proto: "sorvil", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
  { key: "goat", proto: "caprul", elements: [ELEMENTS.EARTH] },
  { key: "bull", proto: "tauron", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
  { key: "crow_spirit", proto: "corvion", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "songbird", proto: "aviel", elements: [ELEMENTS.AIR] },
  { key: "wolf_night", proto: "garunel", elements: [ELEMENTS.DARK, ELEMENTS.EARTH] },
  { key: "kraken", proto: "kraegun", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "wyrm", proto: "wyrhal", elements: [ELEMENTS.FIRE, ELEMENTS.DARK] },

  // F. CRAFT / ROLE / CULTURE (core)
  { key: "smith", proto: "brakor", elements: [ELEMENTS.FIRE] },
  { key: "hunter", proto: "torvak", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "seer", proto: "omriel", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "dancer", proto: "tiral", elements: [ELEMENTS.AIR] },
  { key: "singer", proto: "lirien", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "keeper", proto: "draven", elements: [ELEMENTS.EARTH] },
  { key: "wanderer", proto: "aevun", elements: [ELEMENTS.AIR] },
  { key: "shaper", proto: "koral", elements: [ELEMENTS.EARTH] },
  { key: "judge", proto: "sirvak", elements: [ELEMENTS.AIR] },
  { key: "priest", proto: "thulen", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "witch", proto: "zelai", elements: [ELEMENTS.DARK] },
  { key: "storyteller", proto: "maenor", elements: [ELEMENTS.AIR] },
  { key: "warrior", proto: "kargun", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "scout", proto: "aevrik", elements: [ELEMENTS.AIR] },
  { key: "healer", proto: "solien", elements: [ELEMENTS.WATER] },
  { key: "trader", proto: "baril", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "farmer", proto: "dhranal", elements: [ELEMENTS.EARTH] },
  { key: "sailor", proto: "merak", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "noble", proto: "eluno", elements: [ELEMENTS.AIR] },
  { key: "guardian_spirit", proto: "dhuverin", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
{ key: "artisan", proto: "calivar", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
{ key: "scribe", proto: "larethon", elements: [ELEMENTS.AIR] },
{ key: "scholar", proto: "meridan", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "poet", proto: "rialen", elements: [ELEMENTS.AIR] },
{ key: "weaver", proto: "thalira", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },

{ key: "herbalist", proto: "muirel", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "alchemist", proto: "solvren", elements: [ELEMENTS.FIRE, ELEMENTS.WATER] },
{ key: "scribe_mage", proto: "arcthel", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },
{ key: "geomancer", proto: "durvok", elements: [ELEMENTS.EARTH] },
{ key: "pyromancer", proto: "sirvakor", elements: [ELEMENTS.FIRE] },

{ key: "champion", proto: "varion", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
{ key: "duelist", proto: "virel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "warden", proto: "carneth", elements: [ELEMENTS.EARTH] },
{ key: "ranger", proto: "talvren", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
{ key: "beast_tamer", proto: "korilan", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },

{ key: "cook", proto: "merlian", elements: [ELEMENTS.FIRE, ELEMENTS.WATER] },
{ key: "brewer", proto: "braviel", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
{ key: "bard", proto: "sorelin", elements: [ELEMENTS.AIR] },
{ key: "actor", proto: "dramion", elements: [ELEMENTS.AIR] },
{ key: "maskmaker", proto: "volren", elements: [ELEMENTS.AIR, ELEMENTS.DARK] },

{ key: "oracle", proto: "sevrial", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "medium", proto: "anelun", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "prophet", proto: "evarun", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
{ key: "dreamwalker", proto: "oneirosa", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
{ key: "spiritcaller", proto: "dhuvara", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },

{ key: "merchant", proto: "vakriel", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
{ key: "artisan_jeweler", proto: "galvia", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
{ key: "navigator", proto: "selvarn", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
{ key: "cartographer", proto: "taviren", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
{ key: "scribe_cart", proto: "mirathen", elements: [ELEMENTS.AIR] },

{ key: "diplomat", proto: "parion", elements: [ELEMENTS.AIR] },
{ key: "official", proto: "verasun", elements: [ELEMENTS.EARTH] },
{ key: "envoy", proto: "thaviel", elements: [ELEMENTS.AIR] },
{ key: "lawkeeper", proto: "judril", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
{ key: "chieftain", proto: "korvan", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },

{ key: "sentry", proto: "darvor", elements: [ELEMENTS.EARTH] },
{ key: "spy", proto: "velith", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "thief", proto: "crevan", elements: [ELEMENTS.DARK] },
{ key: "assassin", proto: "silvrek", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
{ key: "smuggler", proto: "barvith", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },

  // F. CRAFT / ROLE / CULTURE (additional, refined)
  { key: "bard", proto: "bardel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "poet", proto: "verson", elements: [ELEMENTS.AIR] },
  { key: "scribe", proto: "skriven", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "captain", proto: "kapren", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "lord", proto: "domril", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "lady", proto: "domira", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "herbalist", proto: "herval", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "mage", proto: "magiel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "archer", proto: "sarith", elements: [ELEMENTS.AIR] },
  { key: "monk", proto: "monair", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "pilgrim", proto: "viathel", elements: [ELEMENTS.AIR] },
  { key: "champion", proto: "kamrion", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "chieftain", proto: "kapthun", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "oracle", proto: "oranel", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "spy", proto: "oculthar", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "thief", proto: "lathron", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "smith_arcane", proto: "runakor", elements: [ELEMENTS.FIRE, ELEMENTS.DARK] },
  { key: "sail_master", proto: "velanor", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "bannerbearer", proto: "vexilar", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "duelist", proto: "duelvar", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
];



const AFFIX_PATTERNS: Record<
  Dialect,
  { personal: string[]; place: string[]; clan: string[] }
> = {
  [DIALECTS.HIGH]: {
    // Noble, lyrical, vowel-heavy, “court Elvish”
    personal: [
      "{root}ia",
      "{root}ea",
      "{root}iel",
      "{root}ion",
      "{root}ien",
      "{root}elion",
      "{root}arion",
      "{root}alith",
      "{root}amir",
      "Ael{root}",
      "El{root}ar",
      "Il{root}ien",
      "Aer{root}",
      "Eir{root}ion",
    ],
    place: [
      "{root}arë",
      "{root}orë",
      "{root}ilion",
      "{root}amarë",
      "{root}avel",
      "{root}anor",
      "Tor{root}ien",
      "{root}aldor",
    ],
    clan: [
      "An{root}",
      "Tel{root}",
      "Calen{root}",
      "{root}ain",
      "Mir{root}",
      "Vor{root}el",
      "Luth{root}",
      "Athan{root}",
    ],
  },

  [DIALECTS.FOREST]: {
    // Earthy, slightly Celtic: gw, br, th, -an, -eth, -wen
    personal: [
      "{root}an",
      "{root}eth",
      "{root}en",
      "{root}ach",
      "{root}wen",
      "{root}aros",
      "{root}uin",
      "{root}ren",
      "{root}olas",
      "Fen{root}",
      "Gwyn{root}",
      "{root}adhel",
      "{root}aroch",
    ],
    place: [
      "{root}thir",
      "{root}ron",
      "{root}dun",
      "{root}gwyn",
      "{root}breth",
      "{root}lanor",
      "Dru{root}il",
      "{root}bryn",
    ],
    clan: [
      "Mac{root}",
      "Ui{root}",
      "{root}dhel",
      "Cen{root}",
      "Brul{root}ach",
      "Sil{root}",
      "Or{root}gwyn",
      "Tal{root}an",
    ],
  },

  [DIALECTS.SEA]: {
    // Liquid, flowing, lots of diphthongs and soft consonants
    personal: [
      "{root}ae",
      "{root}ao",
      "{root}uin",
      "{root}ia",
      "{root}ionae",
      "{root}alun",
      "{root}eirion",
      "{root}avel",
      "{root}eira",
      "{root}orin",
      "Sir{root}",
      "Aro{root}",
    ],
    place: [
      "{root}aë",
      "{root}oae",
      "{root}eluin",
      "{root}orae",
      "{root}thalos",
      "{root}mareth",
      "Pel{root}ae",
      "{root}olin",
    ],
    clan: [
      "Sel{root}",
      "Mar{root}ae",
      "Pel{root}uin",
      "Lor{root}",
      "Aen{root}or",
      "Thal{root}un",
    ],
  },

  [DIALECTS.MOUNTAIN]: {
    // Heavy, compact, consonant-forward, but still pronounceable
    personal: [
      "{root}in",
      "{root}rak",
      "{root}ol",
      "{root}grin",
      "{root}dorn",
      "{root}gar",
      "{root}vorn",
      "{root}grim",
      "Kar{root}in",
      "Bal{root}",
      "{root}gran",
      "{root}kul",
    ],
    place: [
      "{root}dûm",
      "{root}drum",
      "{root}thol",
      "{root}korin",
      "{root}grum",
      "{root}kar",
      "Dur{root}ak",
      "{root}kaz",
    ],
    clan: [
      "Kar{root}",
      "Dur{root}un",
      "Khaz{root}",
      "Bram{root}",
      "Thur{root}",
      "Gor{root}un",
      "Stone{root}",
      "Bar{root}in",
    ],
  },

  [DIALECTS.SHADOW]: {
    // Dark vowels, gh/th, mor-/ul-/gul- vibes
    personal: [
      "{root}úth",
      "{root}ghal",
      "{root}shai",
      "{root}than",
      "{root}mur",
      "{root}ghel",
      "{root}aun",
      "{root}vyr",
      "{root}druin",
      "{root}zael",
      "Mor{root}in",
      "Vel{root}",
    ],
    place: [
      "{root}gúl",
      "{root}daen",
      "{root}naúl",
      "{root}dûn",
      "{root}morth",
      "{root}ighor",
      "{root}ulmar",
      "Dra{root}un",
    ],
    clan: [
      "Moth{root}",
      "Dhul{root}",
      "Ghul{root}",
      "Vor{root}",
      "Nal{root}un",
      "Ar{root}ghul",
      "Mor{root}",
      "Ul{root}oth",
    ],
  },
};



function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randChance(p: number) {
  return Math.random() < p;
}
function isVowel(ch: string) {
  return /[aeiouáéíóú]/i.test(ch);
}
function syllableCount(s: string) {
  return s.split(/[^aeiouáéíóú]+/).filter(Boolean).length;
}

/* --- Global phonology rules --- */

function applyTwoGRule(s: string): string {
  const chars = s.toLowerCase().split("");
  let firstG = false;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "g") {
      if (!firstG) firstG = true;
      else chars[i] = "k";
    }
  }
  return chars.join("");
}

function applyOneRRule(s: string, dialect: Dialect): string {
  const chars = s.split("");
  let firstR = false;

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "r") {
      if (!firstR) {
        firstR = true;
      } else {
        switch (dialect) {
          case DIALECTS.HIGH:
            chars[i] = "l";
            break;
          case DIALECTS.FOREST:
            chars[i] = "d";
            chars.splice(i + 1, 0, "h");
            break;
          case DIALECTS.SEA:
            chars[i] = "l";
            break;
          case DIALECTS.MOUNTAIN:
            chars[i] = "r";
            chars.splice(i + 1, 0, "k");
            break;
          case DIALECTS.SHADOW:
            chars[i] = "g";
            chars.splice(i + 1, 0, "h");
            break;
        }
      }
    }
  }

  return chars.join("");
}

function collapseDoubleVowels(s: string) {
  return s
    .replace(/aa/g, "a")
    .replace(/ee/g, "e")
    .replace(/ii/g, "i")
    .replace(/oo/g, "o")
    .replace(/uu/g, "u");
}

// Global vowel-run rule
function fixVowelRuns(s: string, dialect: Dialect) {
  const chars = s.split("");
  let out = "";
  let i = 0;

  while (i < chars.length) {
    const ch = chars[i];
    if (!isVowel(ch)) {
      out += ch;
      i++;
      continue;
    }
    let run = "";
    while (i < chars.length && isVowel(chars[i])) {
      run += chars[i];
      i++;
    }

    if (run.length <= 2) {
      out += run;
    } else {
      const v1 = run[0];
      const v2 = run[run.length - 1];
      let replacement;
      if (dialect === DIALECTS.SEA && randChance(0.3)) {
        replacement = v1 + "l" + v2;
      } else {
        replacement = v1 + v2;
      }
      out += replacement;
    }
  }
  return out;
}

function trimTripleConsonants(s: string) {
  return s.replace(/([^aeiou])([^aeiou])([^aeiou])/g, "$1$2");
}

function cleanupForm(s: string, dialect: Dialect) {
  s = collapseDoubleVowels(s);
  s = fixVowelRuns(s, dialect);
  s = trimTripleConsonants(s);

  if (dialect === DIALECTS.HIGH) {
    if (/[tgkdbp]$/.test(s)) s = s + "a";
  } else if (dialect === DIALECTS.SEA) {
    if (!isVowel(s[s.length - 1])) s = s + "aë";
  }
  return s;
}

/* --- Dialect sound changes --- */

function applyHighSoundChanges(proto: string) {
  let s = proto.toLowerCase();

  s = s
    .replace(/ai/g, "ae")
    .replace(/au/g, "ao")
    .replace(/oi/g, "oe")
    .replace(/ue/g, "ui");

  s = s
    .replace(/([aeiou])t([aeiou])/g, "$1th$2")
    .replace(/([aeiou])d([aeiou])/g, "$1dh$2")
    .replace(/([aeiou])g([aeiou])/g, "$1gh$2")
    .replace(/([aeiou])b([aeiou])/g, "$1v$2");

  s = s.replace(/a([bcdfghjklmnpqrstvwxyz])([aeiou])/g, "á$1$2");

  if (randChance(0.12)) {
    const lastVowelIndex = s.search(/[aeiou][^aeiou]*$/);
    if (lastVowelIndex > 0) {
      const ins = randomChoice(["il", "el", "ar"]);
      s = s.slice(0, lastVowelIndex) + ins + s.slice(lastVowelIndex);
    }
  }

  return s;
}

function applyForestSoundChanges(proto: string) {
  let s = proto.toLowerCase();

  s = s
    .replace(/ai/g, "e")
    .replace(/au/g, "o")
    .replace(/ei/g, "e")
    .replace(/oa/g, "o")
    .replace(/ue/g, "u");

  s = s
    .replace(/b/g, "bh")
    .replace(/d/g, "dh")
    .replace(/g/g, "gh")
    .replace(/m/g, "mh")
    .replace(/s/g, "sh");

  s = s.replace(/i([rln])/g, "e$1");
  s = s.replace(/u$/g, "o");

  if (isVowel(s[s.length - 1])) {
    s = s.slice(0, -1);
  }

  if (randChance(0.1)) {
    s = s.replace(/a([bcdfghjklmnpqrstvwxyz])a/g, "e$1a");
  }

  return s;
}

function applySeaSoundChanges(proto: string) {
  let s = proto.toLowerCase();

  s = s
    .replace(/a/g, "ae")
    .replace(/e/g, "eo")
    .replace(/i/g, "ia");

  s = s
    .replace(/([aeiou])t([aeiou])/g, "$1l$2")
    .replace(/([aeiou])d([aeiou])/g, "$1$2");

  s = s
    .replace(/dr/g, "dora")
    .replace(/tr/g, "tera")
    .replace(/gl/g, "gelo");

  if (randChance(0.15)) {
    s = s.replace(/([aeiou])([aeiou])/g, (_m, v1, v2) =>
      v1 + randomChoice(["l", "r"]) + v2
    );
  }

  if (!isVowel(s[s.length - 1])) {
    s = s + "ao";
  }

  return s;
}

function applyMountainSoundChanges(proto: string) {
  let s = proto.toLowerCase();

  s = s
    .replace(/^g([aeiou])/, "gr$1")
    .replace(/^k([aeiou])/, "kr$1")
    .replace(/^t([aeiou])/, "tr$1");

  s = s
    .replace(/dh/g, "d")
    .replace(/th/g, "t")
    .replace(/sh/g, "sk");

  s = s.replace(/a([^aeiou]{1,2})$/g, "o$1");

  if (!isVowel(s[s.length - 1]) && randChance(0.1)) {
    s = s.replace(/([^aeiou])$/, "um$1");
  }

  const syllables = s.split(/[^aeiou]+/).filter(Boolean).length;
  if (syllables < 2) {
    s = s + "un";
  }

  return s;
}

function applyShadowSoundChanges(proto: string) {
  let s = proto.toLowerCase();

  s = s
    .replace(/a/g, "u")
    .replace(/e/g, "o");

  s = s
    .replace(/ai/g, "ia")
    .replace(/au/g, "ua")
    .replace(/eo/g, "oe");

  s = s
    .replace(/t/g, "th")
    .replace(/d/g, "dh")
    .replace(/g/g, "gh");

  s = s.replace(/^b/, "v").replace(/^d/, "sh");

  if (randChance(0.15)) {
    s = s.replace(/([aeiou])([^aeiou])([aeiou])/g, "$1gh$2$3");
  }

  return s;
}

/* --- Dialect pipeline --- */

function transformRootForDialect(proto: string, dialect: Dialect) {
  let s = applyTwoGRule(proto);

  switch (dialect) {
    case DIALECTS.HIGH:
      s = applyHighSoundChanges(s);
      break;
    case DIALECTS.FOREST:
      s = applyForestSoundChanges(s);
      break;
    case DIALECTS.SEA:
      s = applySeaSoundChanges(s);
      break;
    case DIALECTS.MOUNTAIN:
      s = applyMountainSoundChanges(s);
      break;
    case DIALECTS.SHADOW:
      s = applyShadowSoundChanges(s);
      break;
  }

  s = applyOneRRule(s, dialect);
  s = cleanupForm(s, dialect);

  return s;
}

function applyPattern(pattern: string, rootForm: string) {
  return pattern.replace("{root}", rootForm);
}

/* --- Root selection + compounding --- */

function pickRootByElement(element: Element | null): ProtoRoot {
  if (element == null) return randomChoice(PROTO_ROOTS);

  if (element === ELEMENTS.DARK) {
    const darkRoots = PROTO_ROOTS.filter((r) =>
      r.elements.includes(ELEMENTS.DARK)
    );
    if (darkRoots.length) return randomChoice(darkRoots);
  }

  const matches = PROTO_ROOTS.filter((r) => r.elements.includes(element));
  if (matches.length) return randomChoice(matches);

  return randomChoice(PROTO_ROOTS);
}

function compressHead(rootProto: string) {
  const r = rootProto.toLowerCase();
  const lastVowel = r.search(/[aeiouáéíóú][^aeiouáéíóú]*$/);
  if (lastVowel === -1) return r.slice(0, 4);
  const cut = Math.min(r.length, lastVowel + 2);
  return r.slice(0, cut);
}

function compressTail(rootProto: string) {
  const r = rootProto.toLowerCase();
  const firstVowel = r.search(/[aeiouáéíóú]/);
  if (firstVowel === -1) return r.slice(-3);
  return r.slice(firstVowel);
}

function makeCompoundProto(
  root1: ProtoRoot,
  root2: ProtoRoot
) {
  const r1 = root1.proto.toLowerCase();
  const r2 = root2.proto.toLowerCase();

  let head = compressHead(r1);
  let tail = compressTail(r2);

  let compound = head + tail;

  if (syllableCount(compound) > 4 || compound.length > 9) {
    const shortHead = r1.slice(0, Math.min(3, r1.length));
    const shortTail = r2.slice(Math.max(0, r2.length - 3));
    compound = shortHead + shortTail;
  }

  return compound;
}

function pickTwoRoots(
  elementA: Element | null,
  elementB: Element | null
): [ProtoRoot, ProtoRoot] {
  const r1 = elementA ? pickRootByElement(elementA) : randomChoice(PROTO_ROOTS);

  let r2: ProtoRoot;
  let attempts = 0;
  do {
    r2 = elementB ? pickRootByElement(elementB) : pickRootByElement(elementA);
    attempts++;
  } while (r2.proto === r1.proto && attempts < 10);

  return [r1, r2];
}

/* --- Public generators --- */

type NameType = "personal" | "place" | "clan";

function generateName(opts: {
  dialect: Dialect;
  type: NameType;
  element: Element | null;
}) {
  const { dialect, type, element } = opts;
  const root = pickRootByElement(element);
  const transformedRoot = transformRootForDialect(root.proto, dialect);

  const patterns = AFFIX_PATTERNS[dialect][type];
  const pattern = randomChoice(patterns);
  let name = applyPattern(pattern, transformedRoot);
  name = cleanupForm(name, dialect);
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    name,
    dialect,
    type,
    element,
    protoRoot: root.proto,
    meaning: root.key,
  };
}

function generateCompoundName(opts: {
  dialect: Dialect;
  type: NameType;
  elementA: Element | null;
  elementB: Element | null;
}) {
  const { dialect, type, elementA, elementB } = opts;

  const [root1, root2] = pickTwoRoots(elementA, elementB);
  const fusedProto = makeCompoundProto(root1, root2);
  const transformedRoot = transformRootForDialect(fusedProto, dialect);

  const patterns = AFFIX_PATTERNS[dialect][type];
  const pattern = randomChoice(patterns);
  let name = applyPattern(pattern, transformedRoot);
  name = cleanupForm(name, dialect);
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    name,
    dialect,
    type,
    elements: [elementA, elementB],
    protoRoots: [root1.proto, root2.proto],
    meanings: [root1.key, root2.key],
  };
}

function generateArchaicName(baseOptions: {
  dialect: Dialect;
  type: NameType;
  element: Element | null;
  elementA: Element | null;
  elementB: Element | null;
}) {
  const { dialect, type, element, elementA, elementB } = baseOptions;

  const base =
    Math.random() < 0.5
      ? generateName({ dialect, type, element })
      : generateCompoundName({ dialect, type, elementA, elementB });

  let { name } = base;

  const transforms: ((s: string) => string)[] = [
    (s) => s.replace(/([^aeiou])$/, "$1a"),
    (s) => s.replace(/a/g, "á"),
    (s) => s.replace(/([bcdfghjklmnpqrstvwxyz])([aeiou])/, "$1$1$2"),
    (s) => s + randomChoice(["ae", "ai", "oë"]),
    (s) => s.replace(/([aeiou])([bcdfghjklmnpqrstvwxyz])/, "$1h$2"),
  ];

  name =
    transforms[Math.floor(Math.random() * transforms.length)](name) || name;

  return {
    ...base,
    name,
    archaic: true as const,
  };
}

// Unified "varied" generator: single / compound / archaic mix
// Now biased so most names are <= 3 syllables (Tolkien-style beats)
function generateVariedName(options: {
  dialect: Dialect;
  type: NameType;
  element: Element | null;
  elementA: Element | null;
  elementB: Element | null;
}) {
  let lastResult:
    | ReturnType<typeof generateName>
    | ReturnType<typeof generateCompoundName>
    | ReturnType<typeof generateArchaicName>
    | null = null;

  // Try a few times to get something with 3 syllables or fewer
  for (let attempt = 0; attempt < 6; attempt++) {
    const roll = Math.random();

    let result:
      | ReturnType<typeof generateName>
      | ReturnType<typeof generateCompoundName>
      | ReturnType<typeof generateArchaicName>;

    if (roll < 0.05) {
      result = generateArchaicName(options);
    } else if (roll < 0.4) {
      result = generateCompoundName({
        dialect: options.dialect,
        type: options.type,
        elementA: options.elementA,
        elementB: options.elementB,
      });
    } else {
      result = generateName({
        dialect: options.dialect,
        type: options.type,
        element: options.element,
      });
    }

    lastResult = result;

    // Prefer names with 3 syllables or fewer
    const syl = syllableCount(result.name.toLowerCase());
    if (syl <= 3) {
      return result;
    }
  }

  // Fallback: if we never hit <= 3 syllables, just use the last one,
  // or a plain generated name as an absolute fallback.
  if (lastResult) return lastResult;

  return generateName({
    dialect: options.dialect,
    type: options.type,
    element: options.element,
  });
}
/** Turn raw archetype text into internal concept keys (matching PROTO_ROOTS.key). */
function extractConcepts(text: string): string[] {
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  const concepts = new Set<string>();

  for (const w of words) {
    const mapped = SEMANTIC_LEXICON[w];
    if (mapped) {
      concepts.add(mapped);
    }
  }

  return Array.from(concepts);
}
// ===========================
// PROTO-ROOT DIVERSITY SYSTEM
// ===========================

// How often a given proto-root has been used in this batch.
// Keyed by root.proto so different shapes under the same key diverge naturally.
type ProtoUsageStats = Map<string, number>;

type RootCandidate = {
  root: ProtoRoot;
  baseScore: number;     // semantic + element fit
  usagePenalty: number;  // diversity penalty from ProtoUsageStats
  finalScore: number;    // baseScore - usagePenalty
};

// Tunable weights – you can tweak these by feel
const SEMANTIC_STRONG_WEIGHT = 3;   // exact key match
const SEMANTIC_FUZZY_WEIGHT = 1;    // fuzzy / substring match
const ELEMENT_MATCH_WEIGHT = 2;     // element alignment bonus
const DIVERSITY_PENALTY_PER_USE = 1; // how hard we push away from overused roots

/** Internal helper: how we key usage for a given root. */
function getProtoUsageKey(root: ProtoRoot): string {
  return root.proto; // could change to root.key if you want semantic-level tracking
}

/** Read how many times a root has been used this batch. */
function getProtoUsageCount(
  stats: ProtoUsageStats | undefined,
  root: ProtoRoot
): number {
  if (!stats) return 0;
  const key = getProtoUsageKey(root);
  return stats.get(key) ?? 0;
}

/** Increment usage for a root in this batch. */
function incrementProtoUsage(
  stats: ProtoUsageStats | undefined,
  root: ProtoRoot
): void {
  if (!stats) return;
  const key = getProtoUsageKey(root);
  const current = stats.get(key) ?? 0;
  stats.set(key, current + 1);
}

/**
 * Diversity-aware proto-root picker.
 *
 * - Takes canonical concept keys (from SEMANTIC_LEXICON / extractConcepts)
 * - Optionally uses element + dialect as context
 * - Optionally uses ProtoUsageStats to discourage overusing the same roots
 *
 * If you call it with only `concepts`, it still works, just without
 * element/dialect/usage information.
 */
function pickRootsForConcepts(
  concepts: string[],
  elementMain?: Element | null,
  dialect?: Dialect,
  usageStats?: ProtoUsageStats
): ProtoRoot[] {
  const safeElement = elementMain ?? null;
  const safeDialect =
    dialect ??
    randomChoice([
      DIALECTS.HIGH,
      DIALECTS.FOREST,
      DIALECTS.SEA,
      DIALECTS.MOUNTAIN,
      DIALECTS.SHADOW,
    ]);

  // Build scored candidates from concepts + element context
  const candidates = buildRootCandidatesForConcepts(
    concepts,
    safeElement,
    safeDialect,
    usageStats
  );

  // If we couldn't score anything at all, fall back to a themed random pick
  if (!candidates.length) {
    const themedPool =
      safeElement != null
        ? PROTO_ROOTS.filter((r) => r.elements.includes(safeElement))
        : PROTO_ROOTS;

    const fallbackRoot = themedPool.length
      ? randomChoice(themedPool)
      : randomChoice(PROTO_ROOTS);

    // We still return an array, to match the original contract
    return [fallbackRoot];
  }

  // How many distinct roots do we want?
  // - If there are many concepts, grab up to 3
  // - If there are few, grab at least 1
  const desiredCount = Math.min(
    Math.max(concepts.length, 1),
    3,
    candidates.length
  );

  return pickWeightedRoots(candidates, desiredCount, usageStats);
}


/* --- Mapping Archetype A/B → Elements --- */

function pickElementFromText(text: string): Element | null {
  const t = text.toLowerCase();

  // FIRE-leaning words
  if (/(fire|flame|ember|blaze|pyre|sun|solar|lava|ash|cinder|phoenix|forge|smoke|magma|inferno)/.test(t)) {
    return ELEMENTS.FIRE;
  }

  // WATER-leaning words
  if (/(water|sea|ocean|river|stream|brook|tide|wave|surf|mist|fog|rain|snow|frost|ice|deep|harbor|shore|marsh|fen)/.test(t)) {
    return ELEMENTS.WATER;
  }

  // EARTH-leaning words
  if (/(earth|stone|rock|boulder|mountain|peak|summit|cliff|valley|glen|grove|forest|wood|tree|root|soil|desert|hill|field|plain|meadow|cave|cavern|crag)/.test(t)) {
    return ELEMENTS.EARTH;
  }

  // AIR-leaning words
  if (/(air|wind|breeze|gale|storm|tempest|sky|cloud|lightning|thunder|whirl|gust|winged|falcon|hawk)/.test(t)) {
    return ELEMENTS.AIR;
  }

  // DARK-leaning words
  if (/(shadow|dark|night|midnight|void|abyss|grave|death|ghost|specter|wraith|nether|eclipse|raven|crow|spider|bat|crypt|tomb)/.test(t)) {
    return ELEMENTS.DARK;
  }

  return null;
}
function pickDialectFromArchetypes(a: string, b: string): Dialect {
  const t = `${a} ${b}`.toLowerCase();

  // Strong, explicit tags first

  // High / Celestial / Courtly
  if (/(high|noble|court|star|solar|sun|light|radiant|angel|seraph|crown|throne|royal|king|queen|prince|princess|lordly)/.test(t)) {
    return DIALECTS.HIGH;
  }

  // Forest / Sylvan / Wild
  if (/(forest|wood|woods|grove|thicket|sylvan|druid|ranger|leaf|root|bough|wild|antler|stag|deer)/.test(t)) {
    return DIALECTS.FOREST;
  }

  // Sea / Maritime
  if (/(sea|ocean|tide|wave|surf|siren|sailor|captain|ship|coast|harbor|port|marine|current)/.test(t)) {
    return DIALECTS.SEA;
  }

  // Mountain / Stone / Forge
  if (/(mountain|stone|rock|boulder|peak|summit|dwarf|mine|cavern|forge|smith|anvil|iron|steel|hammer)/.test(t)) {
    return DIALECTS.MOUNTAIN;
  }

  // Shadow / Grave / Secret
  if (/(shadow|dark|night|void|eclipse|assassin|thief|rogue|spy|ghost|wraith|grave|crypt|tomb|nether)/.test(t)) {
    return DIALECTS.SHADOW;
  }

  // If nothing explicit, gently bias by element (via the helper above)
  const elementHint = pickElementFromText(t);

  if (elementHint === ELEMENTS.FIRE) {
    // Fire can be High or Mountain or Shadow (war-fire, forge-fire, hell-fire)
    return randomChoice([DIALECTS.HIGH, DIALECTS.MOUNTAIN, DIALECTS.SHADOW]);
  }

  if (elementHint === ELEMENTS.WATER) {
    // Water leans Sea or Forest (streams & river-vales)
    return randomChoice([DIALECTS.SEA, DIALECTS.FOREST]);
  }

  if (elementHint === ELEMENTS.EARTH) {
    // Earth leans Mountain or Forest
    return randomChoice([DIALECTS.MOUNTAIN, DIALECTS.FOREST]);
  }

  if (elementHint === ELEMENTS.AIR) {
    // Air leans High or Sea (sky/sea winds)
    return randomChoice([DIALECTS.HIGH, DIALECTS.SEA]);
  }

  if (elementHint === ELEMENTS.DARK) {
    // Dark is usually Shadow
    return DIALECTS.SHADOW;
  }

  // True fallback: any dialect
  return randomChoice([
    DIALECTS.HIGH,
    DIALECTS.FOREST,
    DIALECTS.SEA,
    DIALECTS.MOUNTAIN,
    DIALECTS.SHADOW,
  ]);
}
/* ===========================
   LEVEL 3: SEMANTIC LEXICON
   Map English-ish fantasy words -> your internal root keys
   =========================== */

const SEMANTIC_LEXICON: Record<string, string> = {
  // --- ELEMENTAL & COSMIC ---
  fire: "fire",
  flame: "flame",
  ember: "ember",
  blaze: "flame",
  inferno: "fire",
  sun: "sun",
  solar: "sun",
  star: "star",
  starlight: "star",
  constellation: "star",
  light: "light",
  radiant: "light",
  glow: "light",
  dawn: "dawn",
  sunrise: "dawn",
  dusk: "dusk",
  twilight: "dusk",
  night: "night",
  midnight: "night",
  shadow: "night",
  darkness: "night",
  void: "void",
  abyss: "void",
  moon: "moon",
  lunar: "moon",

  storm: "storm",
  tempest: "storm",
  lightning: "storm",
  thunder: "storm",
  wind: "wind",
  gale: "wind",
  sky: "sky",
  cloud: "sky",
  air: "breath",
  breath: "breath",

  water: "water",
  river: "river",
  stream: "river",
  brook: "river",
  ocean: "ocean",
  sea: "ocean",
  tide: "ocean",
  wave: "wave",
  surf: "wave",
  mist: "mist",
  fog: "mist",
  rain: "rain",
  stormrain: "rain",
  snow: "snow",
  frost: "snow",
  ice: "ice",

  earth: "earth",
  stone: "stone",
  rock: "stone",
  boulder: "stone",
  mountain: "mountain",
  peak: "peak",
  summit: "peak",
  cliff: "cliff",
  valley: "valley",
  gorge: "valley",
  cave: "cave",
  cavern: "cave",
  desert: "desert",

  forest: "forest",
  wood: "forest",
  woods: "forest",
  grove: "forest",
  thicket: "forest",
  tree: "leaf",
  leaf: "leaf",
  branch: "branch",
  root: "root",
  bark: "bark",
  meadow: "meadow",
  field: "meadow",
  plain: "meadow",

  // --- WEAPONS / DEFENSE ---
  sword: "cut",
  blade: "cut",
  dagger: "cut",
  knife: "cut",
  spear: "strike",
  lance: "strike",
  arrow: "strike",
  bow: "archer",
  shield: "guardian_spirit",
  armor: "guardian_spirit",
  helm: "noble",
  crown: "noble",
  throne: "noble",

  // --- MOTION / BATTLE / ACTION ---
  step: "step",
  dance: "dancer",
  dancer: "dancer",
  leap: "leap",
  jump: "leap",
  spin: "spin",
  whirl: "whirl",
  glide: "glide",
  sway: "sway",
  twist: "twist",
  flow: "flow",
  fall: "fall",
  rise: "rise",
  charge: "rise",
  dash: "step",

  strike: "strike",
  cut: "cut",
  slash: "cut",
  cleave: "cut",
  break: "break",
  shatter: "break",
  crush: "break",
  smash: "break",
  scatter: "scatter",
  gather: "gather",
  echo: "echo",
  drift: "drift",

  // --- EMOTION & SPIRIT ---
  love: "love",
  passion: "desire",
  desire: "desire",
  joy: "joy",
  bliss: "joy",
  sorrow: "sorrow",
  grief: "grief",
  mourning: "grief",
  rage: "rage",
  anger: "anger",
  fury: "rage",
  courage: "courage",
  bravery: "courage",
  fear: "fear",
  terror: "fear",
  hope: "hope",
  dream: "dream",
  nightmare: "dream",
  memory: "memory",
  wisdom: "wisdom",
  knowledge: "wisdom",
  secret: "secret",
  hidden: "secret",
  fate: "fate",
  destiny: "fate",
  honor: "honor",
  oath: "oath",
  vow: "oath",
  will: "will",
  resolve: "will",
  rest: "rest",
  peace: "rest",
  longing: "longing",

  // --- CREATURES ---
  wolf: "wolf",
  hound: "hound",
  dog: "hound",
  fox: "fox",
  bear: "bear",
  lion: "lion",
  hawk: "hawk",
  eagle: "eagle",
  raven: "raven",
  crow: "raven",
  owl: "owl",
  deer: "deer",
  stag: "deer",
  boar: "boar",
  boarhound: "boar",
  serpent: "serpent",
  snake: "serpent",
  dragon: "dragon",
  wyrm: "dragon",
  lizard: "lizard",
  spider: "spider",
  insect: "insect",
  beetle: "insect",
  bat: "bat",
  fish: "fish",
  whale: "whale",
  horse: "horse",

  // --- ROLES / CLASSES / ARCHETYPES ---
  smith: "smith",
  blacksmith: "smith",
  smithy: "smith",
  hunter: "hunter",
  ranger: "hunter",
  tracker: "hunter",
  seer: "seer",
  oracle: "seer",
  prophet: "seer",
  mage: "seer",
  wizard: "seer",
  sorcerer: "seer",
  sorceress: "seer",
  warlock: "witch",
  witch: "witch",
  priest: "priest",
  cleric: "priest",
  singer: "singer",
  bard: "singer",
  keeper: "keeper",
  warden: "keeper",
  guardian: "guardian_spirit",
  guardian_spirit: "guardian_spirit",
  paladin: "warrior",
  knight: "warrior",
  warrior: "warrior",
  fighter: "warrior",
  soldier: "warrior",
  champion: "warrior",
  berserker: "rage",

  rogue: "scout",
  thief: "scout",
  pickpocket: "scout",
  assassin: "secret",
  spy: "secret",
  scout: "scout",
  ranger_scout: "scout",

  healer: "healer",
  priestess: "healer",
  druid: "healer",
  trader: "trader",
  merchant: "trader",
  sailor: "sailor",
  captain: "sailor",
  farmer: "farmer",
  peasant: "farmer",
  storyteller: "storyteller",
  skald: "storyteller",
  chronicler: "storyteller",

  noble: "noble",
  lord: "noble",
  lady: "noble",
  king: "noble",
  queen: "noble",
  duke: "noble",
  duchess: "noble",

  // --- MISC / META-FANTASY ---
  blood: "desire",
  song: "singer",
  music: "singer",
  rune: "secret",
  sigil: "secret",
};

// ===========================
// FORM SHAPE SYSTEM
// ===========================

// How we describe the "silhouette" of a name
type ShapeLengthBucket = "tiny" | "short" | "medium" | "longish";

type EndingType = "vowel" | "softConsonant" | "hardConsonant";

type ShapeSignature = {
  syllables: number;
  lengthBucket: ShapeLengthBucket;
  endingType: EndingType;
  dialect: Dialect;
};

// Batch-level shape statistics
type ShapeStats = Map<string, number>;

/** Helper: pack a ShapeSignature into a string key for the map */
function shapeKey(sig: ShapeSignature): string {
  return [
    sig.dialect,
    sig.syllables,
    sig.lengthBucket,
    sig.endingType,
  ].join("|");
}

function incrementShape(stats: ShapeStats, sig: ShapeSignature): void {
  const key = shapeKey(sig);
  const current = stats.get(key) ?? 0;
  stats.set(key, current + 1);
}

function shapeFrequency(stats: ShapeStats, sig: ShapeSignature): number {
  const key = shapeKey(sig);
  return stats.get(key) ?? 0;
}

/** Classify how long this name is relative to its length preset. */
function getLengthBucket(
  name: string,
  lengthPreset: NameLength
): ShapeLengthBucket {
  const len = name.length;
  const { maxChars } = LENGTH_PRESETS[lengthPreset];

  const ratio = len / maxChars;

  if (ratio <= 0.35) return "tiny";    // e.g. "Vel", "Sarv"
  if (ratio <= 0.65) return "short";   // compact but not super tiny
  if (ratio <= 0.9) return "medium";   // comfortably using the preset
  return "longish";                    // near the upper bound
}

/** Classify the ending type by final character(s). */
function getEndingType(name: string): EndingType {
  const s = name.toLowerCase().replace(/[^a-záéíóú]/g, "");
  if (!s) return "vowel";

  const last = s[s.length - 1];

  if (/[aeiouáéíóú]/.test(last)) {
    return "vowel";
  }

  // "Soft" consonants feel elvish and flowing
  if (/[lnrmys]/.test(last)) {
    return "softConsonant";
  }

  // Everything else counts as a "hard" stop (k, t, d, g, b, p, etc.)
  return "hardConsonant";
}

/**
 * Compute a ShapeSignature for the *base* form (pre-gender).
 * We pass in the length preset so the lengthBucket is relative to that.
 */
function getShapeSignature(
  base: string,
  dialect: Dialect,
  lengthPreset: NameLength
): ShapeSignature {
  const s = base.toLowerCase();
  const syllables = syllableCount(s);
  const lengthBucket = getLengthBucket(s, lengthPreset);
  const endingType = getEndingType(s);

  return {
    syllables,
    lengthBucket,
    endingType,
    dialect,
  };
}

/**
 * Lightly vary the base form to get a slightly different shape:
 * - maybe trim a trailing syllable if it's long
 * - maybe swap / tweak a vowel
 * - maybe add a soft consonant or vowel at the end
 *
 * Always runs cleanupForm + isCoolName again.
 */
function varyFormForShape(
  base: string,
  dialect: Dialect,
  lengthPreset: NameLength
): string {
  let s = base.toLowerCase();

  // Decide randomly which micro-variation to try
  const roll = Math.random();

  // 1) If it's on the longer side, try trimming at the last vowel
  if (roll < 0.33 && s.length >= 5) {
    const lastVowelIndex = s.search(/[aeiouáéíóú][^aeiouáéíóú]*$/);
    if (lastVowelIndex > 0) {
      s = s.slice(0, lastVowelIndex);
    }
  }
  // 2) Slight vowel flourish: a -> ae, o -> oa, e -> ei, etc.
  else if (roll < 0.66) {
    s = s.replace(
      /[aeiouáéíóú](?!.*[aeiouáéíóú].*$)/, // last vowel in the string
      (v) => {
        switch (v) {
          case "a":
            return randomChoice(["a", "ae"]);
          case "e":
            return randomChoice(["e", "ei"]);
          case "o":
            return randomChoice(["o", "oa"]);
          case "i":
            return randomChoice(["i", "ia"]);
          case "u":
            return randomChoice(["u", "ui"]);
          default:
            return v;
        }
      }
    );
  }
  // 3) Adjust ending openness: sometimes add/remove a soft consonant / vowel
  else {
    const endingType = getEndingType(s);

    if (endingType === "vowel") {
      // Close it softly: add l / n / r sometimes
      if (s.length > 2 && Math.random() < 0.7) {
        s = s + randomChoice(["l", "n", "r"]);
      }
    } else {
      // Open it: add a vowel that fits elvish feel
      if (Math.random() < 0.7) {
        s = s + randomChoice(["a", "e", "o"]);
      }
    }
  }

  // Cleanup + sanity check
  s = cleanupForm(s, dialect);

  if (!isCoolName(s, lengthPreset)) {
    // If we broke it, just fall back to the original base
    return base;
  }

  return s;
}

// AFFIX pattern type alias for clarity
type Pattern = string;

/**
 * Infer the *ending type* a pattern tends to produce,
 * based on the characters AFTER {root}.
 *
 * Example:
 * - "{root}ia"   -> last literal char "a"   -> vowel
 * - "{root}el"   -> last literal char "l"   -> softConsonant
 * - "Kar{root}"  -> no suffix, prefix only  -> we treat as "any"
 */
function getEndingTypeFromPattern(pattern: Pattern): EndingType | "any" {
  // Strip out the {root} placeholder and non-letters
  const suffix = pattern.replace("{root}", "");
  const letters = suffix.replace(/[^a-záéíóú]/gi, "");

  if (!letters) {
    // pure root or prefix-only; could end however the root ends
    return "any";
  }

  const last = letters[letters.length - 1].toLowerCase();

  if (/[aeiouáéíóú]/.test(last)) {
    return "vowel";
  }

  if (/[lnrmys]/.test(last)) {
    return "softConsonant";
  }

  return "hardConsonant";
}

/**
 * Aggregate how many times each endingType has appeared so far
 * for a given dialect across this batch.
 */
function getEndingTypeUsageForDialect(
  stats: ShapeStats,
  dialect: Dialect
): Record<EndingType, number> {
  const counts: Record<EndingType, number> = {
    vowel: 0,
    softConsonant: 0,
    hardConsonant: 0,
  };

  for (const [key, value] of stats.entries()) {
    // key structure: dialect|syllables|lengthBucket|endingType
    const [keyDialect, , , endingTypeStr] = key.split("|");
    if (keyDialect !== dialect) continue;

    if (
      endingTypeStr === "vowel" ||
      endingTypeStr === "softConsonant" ||
      endingTypeStr === "hardConsonant"
    ) {
      counts[endingTypeStr] += value;
    }
  }

  return counts;
}
/**
 * Choose a pattern for this dialect, nudging toward underused ending types
 * within the current batch.
 *
 * - If no shapeStats are provided, falls back to pure randomChoice.
 * - If provided, tries to diversify endings (vowel vs soft vs hard).
 */
function pickPatternWithShapeBias(
  dialect: Dialect,
  desiredLength: NameLength, // currently unused, but kept for future tuning
  shapeStats?: ShapeStats
): Pattern {
  const patterns = AFFIX_PATTERNS[dialect].personal;

  // No stats? Just pick randomly as before.
  if (!shapeStats || patterns.length <= 1) {
    return randomChoice(patterns);
  }

  const endingUsage = getEndingTypeUsageForDialect(shapeStats, dialect);

  // For each pattern, estimate its endingType and assign a "load" score
  const candidates = patterns.map((p) => {
    const endingType = getEndingTypeFromPattern(p);
    let load = 0;

    if (endingType === "any") {
      // neutral patterns: treat as mildly under-used
      load = Math.min(
        endingUsage.vowel,
        endingUsage.softConsonant,
        endingUsage.hardConsonant
      );
    } else {
      load = endingUsage[endingType];
    }

    return { pattern: p, endingType, load };
  });

  // Find minimal load among used ending types
  let minLoad = Infinity;
  for (const c of candidates) {
    if (c.load < minLoad) {
      minLoad = c.load;
    }
  }

  // Filter to patterns with the smallest "load"
  const leastUsed = candidates.filter((c) => c.load === minLoad);

  // Random among least-used shapes to keep things organic
  const chosen = randomChoice(leastUsed);
  return chosen.pattern;
}

/* ===========================
   LEVEL 3: PHONETIC SKELETON
   English-ish text -> soft Elvish-like consonant clusters
   (Irish + Italian inspired)
   =========================== */

function mapClusterToElvish(cluster: string): string {
  let c = cluster.toLowerCase();

  // Normalize common digraphs into smoother shapes
  c = c
    .replace(/gh/g, "g")
    .replace(/ph/g, "f")
    .replace(/sh/g, "s")
    .replace(/th/g, "t")
    .replace(/ck/g, "c")
    .replace(/qu/g, "kw")
    .replace(/ch/g, "c");

  // Trim very long clusters
  if (c.length > 3) c = c.slice(0, 3);

  // Single hard stop -> add a liquid for that Irish/Italian feel
  if (c.length === 1 && /[bdgkpt]/.test(c)) {
    const liquid = randomChoice(["l", "r"]);
    c = c + liquid;
  }

  return c;
}
function makePhoneticSkeleton(text: string): string[] {
  const cleaned = text.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) return [];

  const clusters: string[] = [];
  let current = "";

  for (const ch of cleaned) {
    if (isVowel(ch)) {
      if (current) {
        clusters.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current) clusters.push(current);

  // Map into Elvish-like clusters and drop empties
  return clusters.map(mapClusterToElvish).filter(Boolean);
}
/* ===========================
   SEMANTIC CLOUD LAYER
   (canonical concept -> related concepts)
   =========================== */

/**
 * IMPORTANT:
 * Keys here are your *internal* concept keys
 * (values from SEMANTIC_LEXICON, e.g. "scout", "night", "warrior"),
 * not the raw English words the user types.
 *
 * Every synonym should also be a concept key that either:
 * - appears as a value in SEMANTIC_LEXICON, and/or
 * - appears as a PROTO_ROOTS.key
 */
const SEMANTIC_CLOUD_MAP: Record<string, string[]> = {
  // Sneaky / shadowy archetypes
  scout: ["secret", "night", "fox", "step", "drift", "echo"],
  secret: ["night", "dream", "memory", "shadow", "void"],
  night: ["void", "raven", "fear", "sorrow", "dream"],

  // Martial / physical
  warrior: ["courage", "rage", "strike", "cut", "storm"],
  hunter: ["forest", "wolf", "fox", "step", "drift"],
  smith: ["fire", "stone", "mountain"],

  // Mystic / spiritual
  seer: ["dream", "wisdom", "secret", "star", "moon"],
  healer: ["rest", "love", "water", "river"],
  priest: ["light", "sun", "oath", "honor"],

  // Elemental anchors
  fire: ["flame", "ember", "sun", "light", "rage"],
  water: ["river", "ocean", "wave", "mist", "snow"],
  earth: ["stone", "mountain", "root", "forest"],
  air: ["wind", "storm", "breath", "sky"],

  forest: ["leaf", "meadow", "root", "hunter"],
  ocean: ["wave", "mist", "whale", "river"],
  mountain: ["stone", "peak", "cliff", "earth"],

  // Emotional tones
  grief: ["sorrow", "night", "rain"],
  hope: ["dawn", "light", "sun"],
  rage: ["storm", "fire", "desire"],

  // Creatures / totems
  wolf: ["hound", "hunter", "forest"],
  raven: ["night", "storm", "secret"],
  serpent: ["dragon", "void", "secret"],
};

/**
 * Take canonical concept keys (from extractConcepts/SEMANTIC_LEXICON)
 * and expand into a small semantic cloud of related concept keys.
 *
 * This is our "semantic cloud" for a single name generation pass.
 */
function expandConceptsToSemanticCloud(
  concepts: string[],
  maxSize: number = 24
): string[] {
  const set = new Set<string>();

  for (const c of concepts) {
    const key = c.toLowerCase();
    if (!key) continue;

    // always keep the base concept
    set.add(key);

    const syns = SEMANTIC_CLOUD_MAP[key];
    if (syns && syns.length) {
      for (const s of syns) {
        set.add(s.toLowerCase());
      }
    }
  }

  const all = Array.from(set);

  if (all.length <= maxSize) {
    return all;
  }

  // If cloud is large, randomly sample a stable-size subset
  const trimmed: string[] = [];
  const pool = [...all];

  while (trimmed.length < maxSize && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    trimmed.push(pool[idx]);
    pool.splice(idx, 1);
  }

  return trimmed;
}

/**
 * Given a semantic cloud, pick ProtoRoots that fit that cloud,
 * with a soft preference for matching concept keys.
 *
 * This is the more "intelligent" replacement for pickRootsForConcepts.
 */
function getProtoMatchesFromCloud(
  cloud: string[],
  elementHints: Element[]
): ProtoRoot[] {
  const cloudSet = new Set(cloud.map((c) => c.toLowerCase()));
  const hasElementHints = elementHints && elementHints.length > 0;

  type Scored = { root: ProtoRoot; score: number };
  const scored: Scored[] = [];

  for (const root of PROTO_ROOTS) {
    let score = 0;
    const key = root.key.toLowerCase();

    // Direct concept hit
    if (cloudSet.has(key)) {
      score += 3;
    } else {
      // Light fuzzy: overlap between key and any cloud token
      for (const token of cloudSet) {
        if (key.includes(token) || token.includes(key)) {
          score += 1;
          break;
        }
      }
    }

    // Element alignment bonus
    if (hasElementHints && root.elements.some((e) => elementHints.includes(e))) {
      score += 2;
    }

    if (score > 0) {
      scored.push({ root, score });
    }
  }

  if (scored.length) {
    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.root);
  }

  // Fallback: if nothing matched, build a themed subset or just sample
  const themedPool = hasElementHints
    ? PROTO_ROOTS.filter((r) => r.elements.some((e) => elementHints.includes(e)))
    : PROTO_ROOTS;

  const maxFallback = 24;
  const picked: ProtoRoot[] = [];
  const pool = [...themedPool];

  while (picked.length < maxFallback && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }

  return picked;
}

/* ==================================
Weighted-Protoroot diversity engine helper
================================= */
function buildRootCandidatesForConcepts(
  concepts: string[],
  elementMain: Element | null,
  dialect: Dialect,              // reserved for future tuning
  usageStats?: ProtoUsageStats
): RootCandidate[] {
  // 1) Expand canonical concepts into a semantic cloud
  const cloud = expandConceptsToSemanticCloud(concepts);
  const cloudSet = new Set(cloud.map((c) => c.toLowerCase()));
  const hasElementMain = !!elementMain;

  const candidates: RootCandidate[] = [];

  for (const root of PROTO_ROOTS) {
    let baseScore = 0;
    const key = root.key.toLowerCase();

    // Strong semantic hit: root.key is directly in the cloud
    if (cloudSet.has(key)) {
      baseScore += SEMANTIC_STRONG_WEIGHT;
    } else {
      // Fuzzy semantic: small bonus if key overlaps any cloud token
      for (const token of cloudSet) {
        if (key.includes(token) || token.includes(key)) {
          baseScore += SEMANTIC_FUZZY_WEIGHT;
          break;
        }
      }
    }

    // Element alignment
    if (hasElementMain && root.elements.includes(elementMain!)) {
      baseScore += ELEMENT_MATCH_WEIGHT;
    }

    // If it has no semantic/element connection at all, skip it
    if (baseScore <= 0) continue;

    const usageCount = getProtoUsageCount(usageStats, root);
    const usagePenalty = usageCount * DIVERSITY_PENALTY_PER_USE;
    const finalScore = baseScore - usagePenalty;

    // We still keep low/negative scores; the picker will handle edge cases.
    candidates.push({
      root,
      baseScore,
      usagePenalty,
      finalScore,
    });
  }

  return candidates;
}

function pickWeightedRoots(
  candidates: RootCandidate[],
  count: number,
  usageStats?: ProtoUsageStats
): ProtoRoot[] {
  const selected: ProtoRoot[] = [];
  if (candidates.length === 0 || count <= 0) return selected;

  // Work on a mutable copy so we don't pick the same candidate twice
  const pool = [...candidates];

  while (selected.length < count && pool.length > 0) {
    // Prefer candidates with positive final scores; if none, use all
    const positive = pool.filter((c) => c.finalScore > 0);
    const activePool = positive.length ? positive : pool;

    // Compute total weight; clamp very small/negative scores up to a small floor
    const weights = activePool.map((c) => Math.max(c.finalScore, 0.1));
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    let roll = Math.random() * totalWeight;
    let chosenIndex = 0;

    for (let i = 0; i < activePool.length; i++) {
      const w = weights[i];
      if (roll < w) {
        chosenIndex = i;
        break;
      }
      roll -= w;
    }

    const chosenCandidate = activePool[chosenIndex];
    const root = chosenCandidate.root;

    selected.push(root);
    incrementProtoUsage(usageStats, root);

    // Remove chosenCandidate from the global pool so we don't re-pick it
    const globalIndex = pool.findIndex((c) => c.root === root);
    if (globalIndex >= 0) {
      pool.splice(globalIndex, 1);
    }
  }

  return selected;
}

/* ===========================
   LEVEL 3: SYNTHESIZE PROTO ROOT
   (semantic anchors + phonetic skeleton -> new proto form)
   =========================== */

function synthesizeProtoRootFromArchetypes(
  archetypeA: string,
  archetypeB: string
): string {
  const text = `${archetypeA} ${archetypeB}`.trim();
  if (!text) {
    return randomChoice(PROTO_ROOTS).proto;
  }

  // 1) Extract canonical concepts from the archetype text
  const baseConcepts = extractConcepts(text);

  // 2) Expand them into a semantic cloud
  const cloud = expandConceptsToSemanticCloud(baseConcepts);

  // 3) Use element hints (if any) to bias proto-root selection
  const elementHint = pickElementFromText(text);
  const elementHints: Element[] = elementHint ? [elementHint] : [];

  // 4) Get candidate proto-roots that fit this cloud
  const semanticRoots = getProtoMatchesFromCloud(cloud, elementHints);

  const skeleton = makePhoneticSkeleton(text);
  const vowels = ["a", "e", "i", "o", "u"];

  // 5. Choose semantic base(s) from the cloud-weighted roots
  const headSource = (
    semanticRoots[0] ?? randomChoice(PROTO_ROOTS)
  ).proto.toLowerCase();

  const tailSource = (
    semanticRoots[1] ?? semanticRoots[0] ?? randomChoice(PROTO_ROOTS)
  ).proto.toLowerCase();

  // head = first 2 letters of first proto, tail = last 2 of second proto
  const head = headSource.slice(0, 2);
  const tail = tailSource.slice(-2);

  let protoCore = head + tail;

  // 2. Convert skeleton clusters into soft syllable-ish chunks
  const syllablePieces: string[] = [];
  for (const cluster of skeleton.slice(0, 2)) {
    const v = randomChoice(vowels);
    syllablePieces.push(cluster + v);
  }

  // 3. Blend: semantic core + up to two skeleton syllables
  let proto = protoCore;

  if (syllablePieces.length) {
    if (proto.length <= 5) {
      proto += syllablePieces[0];
      if (syllablePieces[1] && proto.length < 8) {
        proto += syllablePieces[1];
      }
    } else {
      // if proto is already chunky, just weave in one syllable
      proto = proto.slice(0, 3) + syllablePieces[0];
    }
  }

  // 4. Cleanup and sanity bounds
  proto = collapseDoubleVowels(proto);
  proto = proto.replace(/[^a-záéíóú]/g, "");

  if (proto.length < 4) {
    proto += randomChoice(vowels) + "n";
  }

  // Keep proto itself reasonable; the final name still adds affixes + gender
  if (proto.length > 9) {
    proto = proto.slice(0, 9);
  }

  return proto;
}


function applyGenderToName(name: string, gender: Gender): string {
  // Always start from a normalized lowercase base
  let s = name.toLowerCase();

  if (gender === "male") {
    const maleEnding = randomChoice([
      "os",
      "ur",
      "ion",
      "ar",
      "ad",
      "eth",
      "en",
      "or",
      "ach",
      "aed",
    ]);
    // strip trailing vowels and add ending
    s = s.replace(/[aeiouáéíóú]+$/i, "") + maleEnding;
  } else if (gender === "female") {
    const femaleEnding = randomChoice([
      "a",
      "ia",
      "iel",
      "ys",
      "ven",
      "ine",
      "airs",
      "ira",
      "eya",
      "ose",
    ]);
    if (/[bcdfghjklmnpqrstvwxyz]$/i.test(s)) {
      s = s + femaleEnding;
    } else {
      s = s.replace(/[aeiouáéíóú]+$/i, "") + femaleEnding;
    }
  } else {
    // neutral: leave ending as-is
    s = name;
  }

  // Capitalize once, here
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// --- Length control types ---
type NameLength = "short" | "medium" | "long";

// --- Length presets controlled by the dropdown ---
const LENGTH_PRESETS: Record<
  NameLength,
  { minSyllables: number; maxSyllables: number; maxChars: number }
> = {
  short: {
    minSyllables: 1,
    maxSyllables: 1,
    maxChars: 6, // tight, punchy names
  },
  medium: {
    minSyllables: 1,
    maxSyllables: 2,
    maxChars: 7, // most “normal” names land here
  },
  long: {
    minSyllables: 1,
    maxSyllables: 3,
    maxChars: 8, // your old upper bound
  },
};

// "Coolness" / sanity filter: shape + consonant clump check,
// using the currently chosen length preset.
function isCoolName(name: string, length: NameLength): boolean {
  const { minSyllables, maxSyllables, maxChars } = LENGTH_PRESETS[length];
  const s = name.toLowerCase();
  const syllables = syllableCount(s);

  if (syllables < minSyllables || syllables > maxSyllables) return false;
  if (s.length > maxChars) return false;

  // Avoid 4+ hard consonants in a row
  if (/[^aeiouáéíóú]{4,}/.test(s)) return false;

  return true;
}

//====================
//---------small usage type for nicknames and epithets-----
//=============================
// Track how often each epithet/nickname is used in a single Generate click
type EpithetUsageStats = Map<string, number>;
/** Retrieve usage count safely */
function getEpithetUsage(usage: EpithetUsageStats | undefined, key: string): number {
  if (!usage) return 0;
  return usage.get(key) ?? 0;
}

/** Increment usage count safely */
function incrementEpithetUsage(usage: EpithetUsageStats | undefined, key: string) {
  if (!usage) return;
  usage.set(key, (usage.get(key) ?? 0) + 1);
}



// ===========================
// SURNAMES: helpers
// ===========================

// Simple capitalizer for surnames (no gender logic here)
function capitalizeName(raw: string): string {
  const s = raw.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Choose a surname length preset based on the actual first-name syllable count
function pickSurnameLengthPreset(firstName: string): NameLength {
  const s = firstName.toLowerCase();
  const syl = syllableCount(s);

  if (syl <= 1) return "long"; // short first -> longer surname
  if (syl >= 3) return "short"; // long first -> short, punchy surname
  return "medium"; // 2-beat first -> medium surname
}

// Dialect compliment / contrast for surnames
function pickSurnameDialectFromFirst(baseDialect: Dialect): Dialect {
  const optionsByDialect: Record<Dialect, Dialect[]> = {
    [DIALECTS.HIGH]: [DIALECTS.FOREST, DIALECTS.SEA],
    [DIALECTS.FOREST]: [DIALECTS.HIGH, DIALECTS.MOUNTAIN],
    [DIALECTS.SEA]: [DIALECTS.HIGH, DIALECTS.FOREST],
    [DIALECTS.MOUNTAIN]: [DIALECTS.FOREST, DIALECTS.HIGH],
    [DIALECTS.SHADOW]: [DIALECTS.HIGH, DIALECTS.FOREST],
  };

  const opts = optionsByDialect[baseDialect] ?? [baseDialect];
  return randomChoice(opts);
}

// Pick a proto for the surname that *isn't* just the primary first-name concept
function buildSurnameProto(
  semanticRoots: ProtoRoot[],
  elementMain: Element
): string {
  // If we have multiple semantic roots, prefer a "secondary" one
  if (semanticRoots.length > 1) {
    const secondaryPool = semanticRoots.slice(1);
    return randomChoice(secondaryPool).proto;
  }

  // If we have exactly one concept, look for a different root
  if (semanticRoots.length === 1) {
    const primary = semanticRoots[0];
    const altCandidates = PROTO_ROOTS.filter(
      (r) =>
        r.key !== primary.key &&
        r.elements.some((el) => primary.elements.includes(el))
    );
    const chosen = altCandidates.length ? randomChoice(altCandidates) : primary;

    return chosen.proto;
  }

  // No semantic roots at all -> fall back to element-based root
  return pickRootByElement(elementMain).proto;
}

/**
 * Blend the user-derived proto with a native proto-root so that:
 * - the archetype still leaves a clear fingerprint
 * - each name also pulls from your established lexicon for variety
 */
function fuseUserAndNativeProto(userProto: string, nativeProto: string): string {
  const u = userProto.toLowerCase();
  const n = nativeProto.toLowerCase();

  const head = compressHead(u); // user influence
  const tail = compressTail(n); // native lexicon influence

  let compound = head + tail;

  if (syllableCount(compound) > 4 || compound.length > 9) {
    const shortHead = u.slice(0, Math.min(3, u.length));
    const shortTail = n.slice(Math.max(0, n.length - 3));
    compound = shortHead + shortTail;
  }

  return compound;
}

function makeFantasyName(
  archetypeA: string,
  archetypeB: string,
  gender: Gender,
  length: NameLength,
  shapeStats?: ShapeStats,        // optional, for batch-level variety
  protoUsageStats?: ProtoUsageStats // NEW: share diversity engine with surnames
): string {

  const combined = `${archetypeA} ${archetypeB}`.trim();
  const dialect = pickDialectFromArchetypes(archetypeA, archetypeB);

  const elementMain =
    pickElementFromText(combined) ??
    randomChoice([
      ELEMENTS.FIRE,
      ELEMENTS.WATER,
      ELEMENTS.EARTH,
      ELEMENTS.AIR,
      ELEMENTS.DARK,
    ]);

  const elementA = pickElementFromText(archetypeA) ?? elementMain;
  const elementB = pickElementFromText(archetypeB) ?? elementMain;

  const { maxChars } = LENGTH_PRESETS[length];

  // --- LEVEL 3 + HYBRID PATH (archetypes provided) ---
  if (combined.length > 0) {
    const userProto = synthesizeProtoRootFromArchetypes(
      archetypeA,
      archetypeB
    );
    let lastBase = "";

    // NEW: semantic/diversity-aware pool of native roots for first names
    const semanticRoots =
      protoUsageStats
        ? pickRootsForConcepts(
            extractConcepts(combined),
            elementMain,
            dialect,
            protoUsageStats
          )
        : [];

    for (let attempt = 0; attempt < 10; attempt++) {
  // Prefer a root from the semantic/diversity pool; fall back to element
  const nativeRoot =
    semanticRoots.length > 0
      ? randomChoice(semanticRoots)
      : pickRootByElement(elementMain);

  // NEW: sometimes use a pure native proto, sometimes the fused one.
  // This is where we break out of the “all names share one fused spine” problem.
  const usePureNative = Math.random() < 0.35; // ~35% pure-native, 65% fused
  const protoForThisAttempt = usePureNative
    ? nativeRoot.proto
    : fuseUserAndNativeProto(userProto, nativeRoot.proto);

  const transformedRoot = transformRootForDialect(protoForThisAttempt, dialect);
  const pattern = pickPatternWithShapeBias(dialect, length, shapeStats);


      // BASE NAME (no gender yet)
      let base = applyPattern(pattern, transformedRoot);
      base = cleanupForm(base, dialect);

      // remember last base for fallback
      lastBase = base;

      // --- shape-awareness ---
      if (shapeStats) {
        const sig = getShapeSignature(base, dialect, length);
        const freq = shapeFrequency(shapeStats, sig);

        // if we've already used this shape 3+ times, try to vary it
        if (freq >= 3) {
          const varied = varyFormForShape(base, dialect, length);
          const variedSig = getShapeSignature(varied, dialect, length);
          const variedFreq = shapeFrequency(shapeStats, variedSig);

          if (
            (varied !== base && variedFreq < freq) ||
            (variedFreq <= 1 && isCoolName(varied, length))
          ) {
            base = varied;
          } else {
            // shape is too common and we couldn't rescue it -> try next attempt
            continue;
          }
        }
      }
      // --- END shape-awareness block ---

      // run the syllable/shape check on the BASE name
      if (isCoolName(base, length)) {
        // On acceptance, record the shape usage for this batch
        if (shapeStats) {
          const sig = getShapeSignature(base, dialect, length);
          incrementShape(shapeStats, sig);
        }

        let name = applyGenderToName(base, gender);

        // final safety clamp in case gender pushes length a bit over
        if (name.length > maxChars) {
          name = name.slice(0, maxChars);
        }

        return name;
      }
    }

    // Archetype fallback: genderize the last base we saw and clamp
    const fallbackBase = lastBase || userProto || "elin";
    let lastName = applyGenderToName(fallbackBase, gender);
    if (lastName.length > maxChars) {
      lastName = lastName.slice(0, maxChars);
    }
    return lastName;
  }


  // --- FALLBACK: RANDOM ELVISH ENGINE (no archetypes at all) ---
  let lastBase = "";

  for (let attempt = 0; attempt < 10; attempt++) {
    const result = generateVariedName({
      dialect,
      type: "personal",
      element: elementMain,
      elementA,
      elementB,
    });

    const base = result.name; // base, pre-gender
    lastBase = base;

    // Again, length/shape check BEFORE adding gender
    if (isCoolName(base, length)) {
      let gendered = applyGenderToName(base, gender);

      if (gendered.length > maxChars) {
        gendered = gendered.slice(0, maxChars);
      }

      return gendered;
    }
  }

  // Final fallback if nothing passed the filter
  const fallbackBase = lastBase || "elin";
  let lastName = applyGenderToName(fallbackBase, gender);
  if (lastName.length > maxChars) {
    lastName = lastName.slice(0, maxChars);
  }
  return lastName;
}

// ===========================
// SURNAMES: generator
// ===========================
function makeSurname(
  archetypeA: string,
  archetypeB: string,
  firstName: string,
  protoUsageStats?: ProtoUsageStats   // NEW: share usage with first names
): string {
  const text = `${archetypeA} ${archetypeB}`.trim();

  // Base dialect is what the first name would use
  const baseDialect = pickDialectFromArchetypes(archetypeA, archetypeB);
  const dialect = pickSurnameDialectFromFirst(baseDialect);

  const elementMain =
    pickElementFromText(text) ??
    randomChoice([
      ELEMENTS.FIRE,
      ELEMENTS.WATER,
      ELEMENTS.EARTH,
      ELEMENTS.AIR,
      ELEMENTS.DARK,
    ]);

  // Semantic anchors for the surname (same meaning space, different route)
  const concepts = extractConcepts(text);
  const semanticRoots = pickRootsForConcepts(
    concepts,
    elementMain,
    dialect,
    protoUsageStats
  );

  const proto = buildSurnameProto(semanticRoots, elementMain);

  // Length preset is derived from the actual first name
  const surnameLength = pickSurnameLengthPreset(firstName);
  const { maxChars } = LENGTH_PRESETS[surnameLength];

  let lastBase = proto;

  for (let attempt = 0; attempt < 10; attempt++) {
    const transformedRoot = transformRootForDialect(proto, dialect);

    // Use clan-style patterns for surnames
    const pattern = randomChoice(AFFIX_PATTERNS[dialect].clan);

    let base = applyPattern(pattern, transformedRoot);
    base = cleanupForm(base, dialect);
    lastBase = base;

    if (isCoolName(base, surnameLength)) {
      let finalName = capitalizeName(base);

      if (finalName.length > maxChars) {
        finalName = finalName.slice(0, maxChars);
      }

      return finalName;
    }
  }

  // Fallback: clamp and capitalize whatever last base we saw
  let fallback = capitalizeName(lastBase);
  if (fallback.length > maxChars) {
    fallback = fallback.slice(0, maxChars);
  }
  return fallback;
}


//====================================================================================================================//
//---------------------------------------------END OF CORE LOGIC, START OF LORE LOGIC---------------------------------//
//====================================================================================================================//
/* ===========================
   LORE SYSTEM (TTRPG-focused)
   =========================== */

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type LoreTone = "bright" | "shadowed" | "balanced";

function deriveLoreProfile(
  archetypeA: string,
  archetypeB: string
): {
  role: string;
  tone: LoreTone;
  element: Element | null;
  dialect: Dialect;
  concepts: string[];
} {
  // --- Handle empty archetypes by picking random stand-ins ---
  let a = archetypeA.trim();
  let b = archetypeB.trim();

  const FALLBACK_ARCHETYPES = [
    "warrior",
    "hunter",
    "seer",
    "healer",
    "bard",
    "shadow",
    "noble",
    "smith",
    "wanderer",
    "storm",
    "flame",
    "frost",
    "forest",
    "moon",
    "sun",
    "spirit",
    "blade",
    "ember",
  ];

  if (!a) a = randomItem(FALLBACK_ARCHETYPES);
  if (!b) b = randomItem(FALLBACK_ARCHETYPES);

  const raw = `${a} ${b}`.trim();
  const t = raw.toLowerCase();

  const element = pickElementFromText(raw);
  const dialect = pickDialectFromArchetypes(a, b);
  const concepts = extractConcepts(raw);

  // --- Role classification ---
  let role = "wanderer";

  if (/(knight|warrior|fighter|soldier|champion|paladin|berserker)/.test(t)) {
    role = "warrior";
  } else if (/(ranger|hunter|tracker|scout|archer)/.test(t)) {
    role = "hunter";
  } else if (/(mage|wizard|sorcer|warlock|witch|seer|oracle|prophet)/.test(t)) {
    role = "seer";
  } else if (/(healer|priest|cleric|druid)/.test(t)) {
    role = "healer";
  } else if (/(bard|singer|minstrel|storyteller|skald)/.test(t)) {
    role = "bard";
  } else if (/(thief|rogue|assassin|spy|shadow)/.test(t)) {
    role = "shadow";
  } else if (/(king|queen|prince|princess|lord|lady|noble|duke|duchess)/.test(t)) {
    role = "noble";
  } else if (/(smith|forge|artisan|craft|maker)/.test(t)) {
    role = "smith";
  }

  // --- Tone classification ---
  let tone: LoreTone = "balanced";

  if (
    /(shadow|night|grave|death|void|abyss|nether|wraith|ghost|crypt|tomb|assassin|betray)/.test(t) ||
    element === ELEMENTS.DARK
  ) {
    tone = "shadowed";
  } else if (
    /(sun|light|radiant|dawn|star|sky|angel|seraph|blessed|holy)/.test(t) ||
    element === ELEMENTS.FIRE ||
    element === ELEMENTS.AIR
  ) {
    tone = "bright";
  }

  return { role, tone, element, dialect, concepts };
}


function makeLore(name: string, a: string, b: string): string {
  const arcA = a || "mysterious";
  const arcB = b || "forgotten";

  const { role, tone, element, dialect, concepts } = deriveLoreProfile(
    arcA,
    arcB
  );

  const hasConcept = (key: string) => concepts.includes(key);

  // Dialect-flavored places
  const placesByDialect: Record<Dialect, string[]> = {
    [DIALECTS.HIGH]: [
      "The starlit courts of the highborn",
      "Silver halls where songs never truly end",
      "Moonlit terraces above the First City",
      "The silver courts of Aelyndar",
      "The star-vaulted libraries of Calith Rel",
      "The Dawnspire terraces above the clouds",
      "The argent bridges of Ilmoran",
      "The crystal sanctums of Vaelith",
      "The rune-etched sky towers of Elthamar",
      "The astral cloisters of Serelune",
      "The moon-crowned halls of Eldrinor",
    ],
    [DIALECTS.FOREST]: [
      "A deep greenwood few mortals have seen",
      "Whispering groves older than most kingdoms",
      "The whispering groves of Thalanor",
      "The root-bridges of Verdantfen",
      "The feymarked glens of Amralae",
      "The bark-spiraled sanctuaries of Greenward",
      "The elderwood rings of Selyndar",
      "The firefly-haunted trails of Lorawyn",
      "The moss-draped stones of Briarhollow",
      "The thorn-circle villages of Wrenfell",
      "The moss-lit paths beneath ancient boughs",
    ],
    [DIALECTS.SEA]: [
      "The tide-sung coasts of the western sea",
      "Storm-washed cliffs where gulls cry at dusk",
      "The tide-shattered reefs of Selukar",
      "The pearl harbors of Brinwaste",
      "The storm-chased piers of Marathruun",
      "The kelp-spire monasteries of Thressa",
      "The lighthouse coves of Vellumar",
      "The wave-carved caverns of Oshaline",
      "The drifting flotilla-cities of Seaspire",
      "The deep-song markets of Siralen",
      "Pearled harbors and salt-slick docks",
    ],
    [DIALECTS.MOUNTAIN]: [
      "High mountain vales touched by snow",
      "Stone-walled holds carved into the cliffs",
      "The obsidian ridges of Khar Mordain",
      "The sky-bitten peaks of Thuldren",
      "The anvil-sung forges of Brakor Hold",
      "The cliff-tier villages of Orevhan",
      "The frost-rimed caverns of Vallidrun",
      "The lightning-split plateaus of Markhul",
      "The iron-root warrens of Grundhammar",
      "The high summit watchfires of Tal Karum",
      "Echoing halls beneath the watchful peaks",
    ],
    [DIALECTS.SHADOW]: [
      "The veiled borderlands between realms",
      "Twilight roads where most fear to walk",
      "The dusk-veiled streets of Arvelshade",
      "The umbral monasteries of Keth Ruun",
      "The lantern-lit warrens of Sablemarch",
      "The omen pools of Grimhollow",
      "The echo-quiet tunnels of Virenfall",
      "The mask markets of Whispergate",
      "The threadbare scriptoriums of Nightwell",
      "The dream-fractured chambers of Morvaen",
      "Starless groves that remember every footstep",
    ],
  };

  const fallbackPlaces = [
    "Forgotten border-villages",
    "Roads where few linger long",
    "Old realms that have slipped from the maps",
  ];

  const places = placesByDialect[dialect] ?? fallbackPlaces;
  const place = randomItem(places);

  // Element-flavored motifs
  const elementMotifs: string[] =
    element === ELEMENTS.FIRE || hasConcept("fire") || hasConcept("flame")
      ? [
          "Villages reduced to embers",
          "Flamebound oaths that still sting",
          "Smoke rising from places they once called home",
          "Ember-veined scars",
          "Ritual ash markings",
          "A forged-in-battle temper",
          "Sun-touched eyes that glow when angered",
          "The scent of smoke that follows them",
          "Volatile courage bordering on recklessness",
          "Memories of a pyre that changed their fate",
          "An inner heat that whispers ancient names",
          "Red horizons that never fully faded from memory",
        ]
      : element === ELEMENTS.WATER || hasConcept("ocean") || hasConcept("river")
      ? [
          "Tidelocked secrets and drowned prayers",
          "Names carried away by the river",
          "Storms that never quite reach shore",
          "Tidal moods that shift with the moon",
          "Whisper-smooth footsteps like lapping waves",
          "Sea-salt intuition guiding their decisions",
          "Storm-born resilience hardened by loss",
          "A habit of drifting into deep thought",
          "The calm of a still lake before violence",
          "A connection to drowned secrets",
          "Hearing patterns in rain others cannot",
          "Waves that sound, to them, like someone calling for help",
        ]
      : element === ELEMENTS.EARTH ||
        hasConcept("forest") ||
        hasConcept("mountain")
      ? [
          "Roots torn from sacred soil",
          "Fallen groves and broken standing-stones",
          "Slopes choked with abandoned shrines",
          "Stone-quiet patience",
          "Hands calloused from ancient crafts",
          "A voice like steady granite",
          "Unshakable loyalty once earned",
          "The steadiness of rooted trees",
          "A deep memory for old wrongs",
          "Echoing heartbeats in vault-like calm",
          "The sense of mountains watching nearby",
          "Soil that remembers every footstep",
        ]
      : element === ELEMENTS.AIR || hasConcept("wind") || hasConcept("storm")
      ? [
          "Promises scattered on the wind",
          "Storms that answered when no one else would",
          "Sky-sent omens they can no longer ignore",
          "A restless pull to distant horizons",
          "Wind-light footsteps",
          "Thoughts that race like storm gusts",
          "The urge to intervene before others act",
          "The ability to vanish into open spaces",
          "Voices carrying farther than they should",
          "An uncanny talent for reading omens",
          "A past spent chasing something unseen",
          "Winds that still carry the smell of that night",
        ]
      : element === ELEMENTS.DARK || hasConcept("night") || hasConcept("void")
      ? [
          "Moonless nights and unquiet graves",
          "Whispers from things that do not breathe",
          "Shadows that know their true name",
          "Shadow-stitched whispers",
          "Eyes that linger too long on the unknown",
          "Soft footfalls learned from necessity",
          "Secrets kept even from themselves",
          "Strange comfort in silence",
          "A gift for unraveling lies",
          "A past that refuses to stay buried",
          "Faint traces of forgotten curses",
          "Starless skies that feel like a held breath",
        ]
      : [
          "Half-remembered songs",
          "Long roads behind them and longer still ahead",
          "Memories they turn over like worn coins",
          "Quiet evenings when the past feels almost kind",
        ];

  const elementMotif = randomItem(elementMotifs);

  // Role-flavored titles
  const roleTitles: Record<string, string[]> = {
    warrior: [
      "Blade-warden",
      "Oathbound knight",
      "Spear-singer",
      "Shield-bearer of the old wars",
      "Blade-Warden",
      "Sky-Cutter",
      "First Shield",
      "Ember Duelist",
      "Stormspear",
      "Oathbreaker-Hunter",
      "Battlecaller",
      "Warbrand of the Fallen Line",
      "Frontline Sentinel",
      "Champion of the Silent Ring",
      "Scar-marked veteran in all but years",
    ],
    hunter: [
      "Shadow-tracker",
      "Warden of hidden paths",
      "Waywatcher of the wild",
      "Arrow-kin of the deep woods",
      "Moon-Tracker",
      "Silent Arrow",
      "Nightstalker",
      "Beast-Binder",
      "Fangpath Ranger",
      "Stillwind Scout",
      "Star-Trail Pursuer",
      "Ghost-stride Archer",
      "Blood-Trail Seeker",
      "Watcher of the Green Veil",
      "Scout who rarely misses a trail",
    ],
    seer: [
      "Dreambound oracle",
      "Reader of star-scattered omens",
      "Veil-touched seer",
      "Keeper of moonlit prophecies",
      "Dream-Binder",
      "Runespeaker",
      "Thread-Watcher",
      "Omen-Tide Oracle",
      "Starweaver",
      "Truth-Gazer",
      "Echo-Soul Diviner",
      "Moon-Mirror Prophet",
      "Fate-Touched Visionary",
      "Chronicle-Bearer",
      "Reluctant witness to too many futures",
    ],
    healer: [
      "Leaf-mender",
      "Keeper of gentle hands",
      "Herb-wise wanderer",
      "Soul-stitcher of broken warriors",
      "Lifewoven Adept",
      "Spirit-Thread Binder",
      "Remedy-Singer",
      "Soul-Stitcher",
      "Dawnleaf Mendicant",
      "Warmhands Acolyte",
      "Hearth-Bloom Curist",
      "Mender of Broken Bonds",
      "Grove-Heart Physician",
      "Keeper of Gentle Rest",
      "Tireless watcher at bedside and battlefield both",
    ],
    bard: [
      "Songweaver",
      "Bearer of old tales",
      "Harp-kin with a restless tongue",
      "Keeper of the unsung verses",
      "Song-Carver",
      "Tale-Warden",
      "Wind-Verse Weaver",
      "Echo-Runed Skald",
      "Melody-Strider",
      "Loreborne Singer",
      "Harp-Fire Virtuoso",
      "Whisper-Tune Wanderer",
      "Words-That-Stir",
      "Voice of the Forgotten Path",
      "Wandering collector of last words",
    ],
    shadow: [
      "Veil-dancer",
      "Knife in the dusk",
      "Stepper-between light and dark",
      "Quiet hand that ends quarrels",
      "Duskblade",
      "Shade-Steps",
      "Silent Ribbon",
      "Night-Veil Agent",
      "Umbral Hand",
      "Blackglass Whisper",
      "Oath-Thin Knife",
      "Grave-Lantern Lurker",
      "Veins-of-Smoke Infiltrator",
      "Shadow-Mark Operative",
      "Ghost that never quite left the living world",
    ],
    noble: [
      "Scion of a fading house",
      "Heir to moonlit titles",
      "Child of a court that has lost its shine",
      "Highborn of the Azure Line",
      "Keeper of Verdant Oaths",
      "Heir of the Moonspire",
      "Scion of Three Crowns",
      "Bearer of Ancestral Ink",
      "Star-Line Aristocrat",
      "Voice of the Inner Court",
      "Legacy-Bound Envoy",
      "Crown-Sharer",
      "Silver-Line Regent",
      "Last bright ember of a nearly-cold line",
    ],
    smith: [
      "Forge-singer",
      "Binder of steel and starfire",
      "Artisan whose work outlives empires",
      "Forge-Singer",
      "Anvil-Seer",
      "Sparkwright",
      "Runebinder",
      "Steel-Weft Artisan",
      "Hearthhammer Crafter",
      "Glimmer-Forge Adept",
      "Star-Iron Shaper",
      "Molten-Rune Warden",
      "Maker of Hidden Hinges",
      "Keeper of embers that never seem to die",
    ],
    wanderer: [
      "Road-worn pilgrim",
      "Restless wayfarer",
      "Stranger at a hundred hearths",
      "Path-Carried",
      "Road-Kept",
      "Wayfarer of Distant Hours",
      "Horizon-Marked",
      "Crosswind Traveler",
      "Lost-Trail Listener",
      "Mendicant Pilgrim",
      "Star-Road Walker",
      "Farstrayed Soul",
      "Dust-Echo Nomad",
      "Traveler who never quite arrives",
    ],
  };

  const titles = roleTitles[role] ?? roleTitles["wanderer"];
  const title = randomItem(titles);

  // --- Element-based origins ---
  const originFire = [
    `${name} watched their first home vanish into ${elementMotif}, the screams of kin buried under crackling beams.`,
    `As a child, ${name} woke to smoke and steel; by dawn, only embers and silence remained where a village once stood.`,
    `The night the sky turned red, ${name} learned how quickly a lifetime of plans can burn away.`,
    "Survived the burning of their childhood enclave, swearing never again to flee flames.",
    "Trained under a pyromancer militia that treated fire as both teacher and punishment.",
    "Lost someone dear to wildfire and has followed smoke-omens ever since.",
    "Was chosen by a phoenix-order after an ember refused to burn their hand.",
    "Carries the memory of a battle fought under a blazing red sky.",
    "Once tended sacred forge-fires that whispered forgotten names.",
  ];

  const originForest = [
    `${name} once walked a living grove now cut down for war-timber; every fallen tree still haunts their dreams.`,
    `Hunters and loggers shattered the sacred wood that raised ${name}, leaving only stumps and ghost-birds behind.`,
    "Was raised by wardens who spoke with treants in the Old Tongue.",
    "Learned archery by moonlight among ancient roots older than cities.",
    "Helped defend a grove where spirits awaken each spring.",
    "Followed a white stag deep into forbidden trees and returned changed.",
    "Was named by a chorus of dryads during a solstice rite.",
    "Once held vigil in silence for seven days to honor a fallen grove-guardian.",
    "They remember listening to leaves whisper of peace the very day axes first bit into the oldest trunks.",
  ];

  const originSea = [
    `${name} waited on the shore for a ship that never returned, its sails swallowed by a storm with no name.`,
    `A midnight squall took both kin and captain; ${name} still hears the drowning in every heavy rain.`,
    "Was saved from drowning by a tide spirit who demanded a future favor.",
    "Grew up among shipwreck salvagers who treated storms as omens.",
    "Learned to read the currents like scripture.",
    "Heard a leviathan’s distant call as a child and still dreams of it.",
    "Escaped raiders across moonlit waters that forever altered them.",
    "Served as lookout on a drifting city-barge where secrets traded like coin.",
    "The sea once gave them everything they loved, and then—in one crooked wave—took it all back.",
  ];

  const originShadow = [
    `${name} survived a massacre no one else recalls, as if the world itself chose to forget.`,
    `One night the lanterns all went out; by morning, only ${name} remained to name the dead.`,
    "Was raised in halls where names are traded like secrets.",
    "Survived by navigating crime-guild webs with quiet brilliance.",
    "Was tutored by a masked stranger who vanished after one final lesson.",
    "Bonded with a shadow creature during a moment of desperation.",
    "Once lived in a city where the sun rarely rose, shaping their instincts.",
    "Helped expose a conspiracy only to be hunted by its remnants.",
    "They were the child hiding under the table when the knives came out, learning how quiet survival can be.",
  ];

  const originGeneric = [
    `${name} left a small village behind after a single night of blood and fire no bard will sing of.`,
    `Once, ${name} belonged to a quiet place with simple lives; now they carry only memories and scars.`,
    "Was the sole survivor of a razed caravan, found wandering ash-roads.",
    "Trained beside mercenaries who valued coin and camaraderie equally.",
    "Was mentored by a wandering hero who died before passing on their final teaching.",
    "Earned early renown after defending their home from monstrous threats.",
    "Grew up in a nomadic troupe that traveled from realm to realm exchanging stories.",
    "Lost their homeland to political strife and has walked the world ever since.",
    `${name} grew up believing in peace, until the day it was taken from them in a language of steel.`,
  ];

  let baseOriginPool: string[];
  if (element === ELEMENTS.FIRE || hasConcept("fire") || hasConcept("flame")) {
    baseOriginPool = originFire;
  } else if (
    element === ELEMENTS.WATER ||
    hasConcept("ocean") ||
    hasConcept("river")
  ) {
    baseOriginPool = originSea;
  } else if (
    element === ELEMENTS.EARTH ||
    hasConcept("forest") ||
    hasConcept("mountain")
  ) {
    baseOriginPool = originForest;
  } else if (tone === "shadowed" || element === ELEMENTS.DARK) {
    baseOriginPool = originShadow;
  } else {
    baseOriginPool = originGeneric;
  }

  const baseOrigin = randomItem(baseOriginPool);

  // --- Role-specific origin flavor ---
  const roleOrigin: Record<string, string[]> = {
    warrior: [
      `As a half-trained warrior, ${name} learned that drills in the yard could never prepare them for real screams.`,
      "Fought in border skirmishes before they were old enough to swear oaths.",
      "Trained under a merciless swordmaster known only as “the Gale.”",
      "Defended a sacred landmark until reinforcements arrived days too late.",
      "Earned their first scar in a duel meant to be ceremonial.",
      "Left a warband after refusing to carry out an unjust order.",
      "They were meant to stand in the shield-wall that day, but the wall never formed and the lesson never left them.",
    ],
    hunter: [
      `While tracking deer beyond the village bounds, ${name} saw the first smoke rising and ran until their lungs burned.`,
      "Tracked a nightmare beast across three territories before landing the final shot.",
      "Learned patience by shadowing prey for weeks without loosing an arrow.",
      "Once freed a village plagued by unseen nocturnal creatures.",
      "Bonded with a loyal animal companion after saving it from poachers.",
      "Spent years mapping migratory paths of dangerous forest spirits.",
      "They returned from the wilds with fresh game and found only ruin, learning to read tracks too late to matter.",
    ],
    seer: [
      `${name} saw it all in a vision that no one believed; the guilt of being right still keeps them from easy sleep.`,
      "Received visions after nearly drowning in a sacred scrying pool.",
      "Became an apprentice oracle when a prophecy spoke their name.",
      "Helped avert a minor catastrophe—at great personal cost.",
      "Once foresaw their own failure and has feared that day since.",
      "Was raised in a temple where dreams were considered holy scripture.",
      "Their first true prophecy was not celebrated—it was ignored, and by morning the fire had proved them right.",
    ],
    healer: [
      `${name} learned the limits of healing on a night when there were far more wounds than hands.`,
      "Nursed plague victims during a winter that claimed most of their mentors.",
      "Studied healing arts under a spirit-bound monk.",
      "Learned to mend wounds created by unnatural forces.",
      "Failed to save someone dear and now overcompensates with zeal.",
      "Was chosen as keeper of a relic herb garden tended for centuries.",
      "They still remember every face they could not save, a ledger of ghosts that shapes every choice.",
    ],
    bard: [
      `Of all who lived there, ${name} remembers the details most clearly; the story will not leave them alone.`,
      "Studied under a retired adventurer who taught through story and duel.",
      "Once performed a ballad so powerful it calmed a riot.",
      "Traveled with a troupe that vanished under mysterious circumstances.",
      "Wove magic into lullabies long before realizing they were spells.",
      "Collected forbidden verses that reveal dangerous truths.",
      "They tried to sing over the sound of the flames and failed, and have been chasing the right song ever since.",
    ],
    shadow: [
      `${name} survived by staying very small and very quiet in a dark corner, a talent that never quite left them.`,
      "Grew up pulling cons to feed siblings before graduating to espionage.",
      "Escaped a guild that tattoos failures onto its agents.",
      "Learned stealth in a monastery that worshipped silence.",
      "Once stole an artifact only to return it out of guilt.",
      "Survived betrayal by their closest partner.",
      "They know some doors opened for the killers from the inside, and they will always wonder whose hand turned the latch.",
    ],
    noble: [
      `Courtiers argued while the danger grew; ${name} learned that titles mean little when the walls finally fall.`,
      "Was groomed for leadership but rejected the cold politics.",
      "Led a diplomatic envoy that nearly sparked war.",
      "Uncovered corruption within their own lineage.",
      "Studied ancient court combat forms out of defiance.",
      "Was exiled after a succession dispute turned violent.",
      "They escaped down a servant’s passage while heralds and banners burned, carrying a house-name that now tastes like ash.",
    ],
    smith: [
      `The forge where ${name} first learned their craft cracked in the heat of that night and never burned again.`,
      "Learned metallurgy from a master who crafted weapons for demigods.",
      "Accidentally created a minor magical construct that follows them still.",
      "Forged their first blade under a meteor shower.",
      "Studied runes after discovering a half-finished golem.",
      "Witnessed their village's forge collapse during an arcane malfunction.",
      "They still carry a warped blade from the ruins of their old workshop, a reminder that steel fails too.",
    ],
    wanderer: [
      `${name} had just left home when it fell, learning that wandering does not always mean you chose to leave.`,
      "Followed a vision that led them far from home.",
      "Found a relic map showing impossible places.",
      "Was taken in by nomads who taught the value of open paths.",
      "Escaped captivity and never remained in one place again.",
      "Swore to walk until they understood their recurring dreams.",
      "A single night on the road spared them; every step since has felt like borrowed time.",
    ],
  };

  const roleOriginPool = roleOrigin[role] ?? roleOrigin["wanderer"];
  const roleOriginLine = randomItem(roleOriginPool);

  const origin =
    Math.random() < 0.6
      ? `${baseOrigin} ${roleOriginLine}`
      : randomItem([baseOrigin, roleOriginLine]);

  // --- Goals / present drive ---
  const revengeGoals = [
    "Now they trace old scars across the map, hunting those who lit the first flame.",
    "Every road they walk bends, sooner or later, toward the ones who started it all.",
    "To hunt the foe who razed their home.",
    "To dismantle the bandit network that stole their family.",
    "To bring judgment upon a corrupt noble who betrayed them.",
    "To avenge a mentor slain by dark forces.",
    "To expose and destroy a conspiracy years in the making.",
    "To reclaim an artifact stolen by treachery.",
    "They speak little of that night, but the way their hand tightens on the hilt says enough.",
  ];

  const dutyGoals = [
    `Now they serve as a ${title}, determined that no one else will lose what they once did.`,
    "They stand between danger and the next village, paying forward a protection they never had.",
    "To uphold vows sworn before witnesses living and dead.",
    "To escort a fragile peace treaty across dangerous lands.",
    "To guard someone whose importance they don’t yet understand.",
    "To restore an order shattered by internal conflict.",
    "To serve a community that once sheltered them.",
    "To retrieve sacred knowledge lost to time.",
    "Duty keeps their feet moving, even when their heart longs to rest beneath familiar trees.",
  ];

  const redemptionGoals = [
    "Now they walk the long road of atonement, certain that some part of that ruin was their fault.",
    "They take the hardest tasks without complaint, as if each might erase a fraction of the past.",
    "To atone for a past failure that cost innocent lives.",
    "To undo harm caused by their own misjudgment.",
    "To restore honor stripped unjustly—or justly.",
    "To repair a relationship they shattered.",
    "To cleanse a cursed bloodline.",
    "To prove they are more than their reputation.",
    "Every kindness they offer is a stone laid on a path they hope leads back to themselves.",
  ];

  const curiosityGoals = [
    "Now they chase rumors and half-truths, trying to understand why fate chose them to survive.",
    "They travel with questions sharper than any blade, seeking the pattern beneath all this loss.",
    "To uncover the truth behind an ancient myth.",
    "To map uncharted lands whispered of by elders.",
    "To understand a strange power that awakened within them.",
    "To solve a riddle that has obsessed them for years.",
    "To study forgotten ruins that call to their dreams.",
    "To learn why they alone can see certain omens.",
    "Every new land is another chance to learn what the old songs were trying to warn them about.",
  ];

  let goalPool: string[];

  if (tone === "shadowed") {
    goalPool = Math.random() < 0.6 ? revengeGoals : dutyGoals;
  } else if (tone === "bright") {
    goalPool = Math.random() < 0.5 ? dutyGoals : redemptionGoals;
  } else {
    const pools = [revengeGoals, dutyGoals, redemptionGoals, curiosityGoals];
    goalPool = randomItem(pools);
  }

  const goal = randomItem(goalPool);

  // --- Relationship hooks ---
  const siblingHooks: string[] = [
    `An older sibling once stood between ${name} and the flames; ${name} has been trying to live up to that courage ever since.`,
    `A younger sibling was lost that night, and every cause ${name} takes up is secretly for them.`,
    "A sibling they must rescue from a dangerous cult.",
    "A brother lost during a raid, believed dead—but perhaps alive.",
    "A sister who resents their choices, despite loving them dearly.",
    "A twin whose fate diverged sharply from their own.",
    "A sibling who became a villain’s lieutenant.",
    "A younger kin who idolizes them and follows recklessly.",
    `${name} still wears a token from a sibling left behind, a promise that this road will mean something.`,
  ];

  const mentorHooks: string[] = [
    `A wandering mentor found ${name} in the aftermath and taught them how to stand again, then vanished on a quest that never returned.`,
    `${name} learned blade, spell, and patience from a teacher whose lessons still echo in every choice they make.`,
    "A mentor who vanished after uttering one final warning.",
    "A teacher who turned traitor for reasons unknown.",
    "A guardian who died protecting them from a shadowy group.",
    "A master whose unfinished lessons still guide them.",
    "A retired adventurer who entrusted them with a dangerous relic.",
    "A mystic who foresaw their destiny but refused to explain it.",
    `Somewhere out there, the one who trained ${name} is still missing; every tavern and temple might hold the next clue.`,
  ];

  const companionHooks: string[] = [
    "They travel better in company than alone, clinging to the hope that this time they can keep others alive.",
    `Companions walk at their side now; ${name} watches them with the wary fondness of someone who knows how quickly a table can go empty.`,
    "A loyal companion lost under mysterious circumstances.",
    "A former traveling partner they parted with on bad terms.",
    "A childhood friend who now walks a darker path.",
    "A lover sworn to return but long overdue.",
    "A comrade imprisoned for a crime they didn’t commit.",
    "A rival adventurer who pushes them to improve.",
    "Around the fire, they listen more than they speak, quietly measuring which of these new friends they cannot bear to lose.",
  ];

  let relationshipPool: string[];

  if (tone === "shadowed") {
    relationshipPool = Math.random() < 0.5 ? siblingHooks : mentorHooks;
  } else if (tone === "bright") {
    relationshipPool = Math.random() < 0.5 ? mentorHooks : companionHooks;
  } else {
    const pools = [siblingHooks, mentorHooks, companionHooks];
    relationshipPool = randomItem(pools);
  }

  const relationship = randomItem(relationshipPool);

  // --- Openings / structural variation ---
  const openingOptions = [
    `${name} is a ${title} from ${place}.`,
    `Those who know ${name} from ${place} speak their name with a careful respect.`,
    `${name} of ${place} carries themselves like one who has already lost too much.`,
  ];
  const opening = randomItem(openingOptions);

  const roll = Math.random();
  const bullets: string[] = [];

  if (roll < 0.2) {
    // Opening + relationship
    bullets.push(opening, relationship);
  } else if (roll < 0.4) {
    // Origin only
    bullets.push(origin);
  } else if (roll < 0.6) {
    // Origin + goal
    bullets.push(origin, goal);
  } else {
    // Full mini-arc
    bullets.push(opening, origin, goal, relationship);
  }

  // Return as bullet list text
  return bullets.map((line) => `• ${line}`).join("\n");
}
/* ===========================
   EPITHETS & NICKNAMES
   =========================== */

type EpithetMode = "none" | "epithet" | "nickname" | "either";

type LoreProfile = {
  role: string;
  tone: LoreTone;
  element: Element | null;
  dialect: Dialect;
  concepts: string[];
};

// Expanded pools for epithets & nicknames

const ROLE_EPITHETS: Record<string, string[]> = {
  warrior: [
    "the Ironbound",
    "the Red Oath",
    "the Shieldbreaker",
    "the Storm-Edge",
    "the Line-Holder",
    "the Blade Unbent",
    "the War-Worn",
    "the Frontline Vow",
    "the Banner-Bearer",
    "the Steel Tempest",
    "the Duel-Sworn",
    "the Clash-Born",
    "the Blooded Sentinel",
    "the Last to Fall",
      "the Iron Gale",
   "the Battle-Forged",
   "the Spear-Marshaled",
    "the Vow Unbroken",
   "the Hammer of Dawn",
   "the Storm-Ranked",
   "the Brass Vanguard",
   "the Warlit Strider",
   "the Breaker of Lines",
   "the Oath-forged Blade",
   "the Rampart-Keeper",
   "the Shield-in-Shadow",
    "the Ember-Sworn",
    "the Sword-Warden",
    "the Stone-Line Sentinel",
    "the Wall of Spears",
  ],
  hunter: [
    "the Silent Arrow",
    "the Trail-Seer",
    "Beastfriend",
    "the Thorn-Tracker",
    "the Moon-Stalker",
    "the Ghost in the Brush",
    "the Briar-Step",
    "the Farshot",
    "the Beast-Watcher",
    "the Wolf-Whisper",
    "the Leaf-Shadow",
    "the Snarewise",
    "the Path-Finder",
    "the Wild-Eyed",
      "the Arrow-in-Mist",
  "the Beast-Treader",
  "the Silent Range-Walker",
  "the Grove-Stalker",
  "the Sky-Scent Tracker",
  "the Lone-Path Wanderer",
  "the Brushborn",
  "the Farsight Hunter",
  "the Deep-Trail Walker",
  "the Briar-Hawk",
  "the Track-Cunning",
  "the Quarry-Keeper",
  "the Wildmark Scout",
  "the Mossfoot",
  "the Night-Forager",
    "the Green-Sentinel",
  ],
  seer: [
    "the Star-Sighted",
    "the Veilreader",
    "the Dream-Bound",
    "the Thread-Touched",
    "the Omen-Keeper",
    "the Fate-Watcher",
    "the Moon-Gazer",
    "the Rune-Woven",
    "the Twilight Oracle",
    "the Echo-Seer",
    "the Vision-Bearer",
    "the Night-Listener",
    "the Prophecy-Scarred",
    "the Veil-Torn",
      "the Time-Weaver",
  "the Dawn-Watcher",
  "the Star-Whisperer",
  "the Truth-Unbound",
  "the Mind-in-Shadow",
  "the Tides of Knowing",
  "the Lantern of Visions",
  "the Memory-Caller",
  "the Pale Foretelling",
  "the Gazer Beyond",
  "the Waking Oracle",
  "the Silent Propheteer",
  "the Cloud-Seer",
  "the Thread-Binder",
  "the Horizon-Touched",
    "the Future-Mark",
  ],
  healer: [
    "the Gentle Hand",
    "Lifebinder",
    "Dawn-Mender",
    "the Wound-Weaver",
    "the Quiet Mercy",
    "the Battle-Mender",
    "the Blood-Stiller",
    "the Herb-Wise",
    "the Soul-Suturer",
    "the Light-of-Rest",
    "the Pain-Drinker",
    "the Fever-Breaker",
    "the Lantern of Sickbeds",
    "the Last Comfort",
      "the Hope-Raiser",
  "the Balm-Bringer",
  "the Ashen Healer",
  "the Breath-Restorer",
  "the Hearth-Mender",
  "the Sorrow-Soother",
  "the Pulse-Keeper",
  "the Willow-Tender",
  "the Night-Warmth",
  "the Thorn-Gentler",
  "the Quiet Poultice",
  "the Root-Mender",
  "the Touch-of-Dawn",
  "the Hearth-Guardian",
  "the Weary-Watcher",
    "the White-Leaf",
  ],
  bard: [
    "the Songcarver",
    "Lore-Keeper",
    "Whisper-Voice",
    "the Tale-Walker",
    "the Chord-Warden",
    "the Laugh-Binder",
    "the Story-Tempered",
    "the Verse-Whisper",
    "the Hearth-Singer",
    "the Echo-Tongue",
    "the Last Minstrel",
    "the Melody-Bearer",
    "the Wordsmith",
    "the Rhythm-Caller",
      "the Lyric-Shaper",
  "the Dream-Chanter",
  "the Harp-Touched",
  "the Tune-Wright",
  "the Ballad-Spun",
  "the Jest-Weaver",
  "the Stanza-Bound",
  "the Tale-forged",
  "the Voice-in-Dusk",
  "the Cadence-Keeper",
  "the Story-Threader",
  "the Flame-of-Fables",
  "the Road-Singer",
  "the Silver Quill",
  "the Wander-Song",
    "the Legend-Maker",
  ],
  shadow: [
    "the Night-Step",
    "Shade-Touched",
    "the Quiet Knife",
    "the Door-in-the-Dark",
    "the Candle-Killer",
    "the Alley-Wraith",
    "the Soft-Foot",
    "the Unseen Blade",
    "the Crow-in-Corners",
    "the Vein-of-Smoke",
    "the Whispered Threat",
    "the Mask-Bound",
    "the Hooded Silence",
    "the Last Shadow",
      "the Fog-Cloaked",
  "the Gutter-Ghost",
  "the Underlight Walker",
  "the Ash-Tread",
  "the Moth-in-Lantern-Glow",
  "the Back-Alley Murmur",
  "the Ink-Stained Step",
  "the Dim-Threaded",
  "the Gloom-Bound",
  "the Whisper-in-Doors",
  "the Night-Sigil",
  "the Silhouette-Stray",
  "the Soot-Footed",
  "the Twilight Rasp",
  "the Lantern-Bleed",
    "the Dusk-Slip",
  ],
  noble: [
    "Highborne",
    "Moon-Crowned",
    "the Last Scion",
    "the Silver Line",
    "the Star-Wreathed",
    "the Court-Kept",
    "the Crest-Bearer",
    "the Oath of House",
    "the Ring-Warden",
    "the Velvet Hand",
    "the Banner-Crowned",
    "the Gilded Heir",
    "the Blue-Blooded",
    "the House-Unbroken",
      "the Lineage-True",
  "the Diadem-Bound",
  "the Heralded Child",
  "the Crown-in-Waiting",
  "the Noble-Stone",
  "the Scepter-Kin",
  "the House-Bright",
  "the Ancient Blood",
  "the Thronehold",
  "the Mantle-Bearer",
  "the Jewel-of-Court",
  "the Last Heirloom",
  "the Banner-Lit",
  "the Court-Shadowed",
  "the Gold-Veined",
    "the Quiet Regent",
  ],
  smith: [
    "Forge-Sworn",
    "the Emberwright",
    "Anvil-Singer",
    "the Steel-Weaver",
    "the Coal-Eyed",
    "the Spark-Binder",
    "the Blade-Shaper",
    "the Hammer-Caller",
    "the Ember-Gifted",
    "the Rune-Brand",
    "the Fire-Forger",
    "the Iron-Hand",
    "the Furnace-Watcher",
    "the Tempered Maker",
      "the Molten-Blooded",
  "the Heat-Tamer",
  "the Ore-Reader",
  "the Hearth-Anointed",
  "the Bellows-Borne",
  "the Flame-Chanter",
  "the Ash-Clad",
  "the Crucible-Souled",
  "the Iron-Warden",
  "the Spark-Walker",
  "the Hammer-Shadow",
  "the Forge-Keeper",
  "the Ember-Mason",
  "the Brass-Threader",
  "the Alloy-Dreamer",
    "the Smoke-Crowned",
  ],
  wanderer: [
    "the Far-Walked",
    "Road-Kept",
    "Dust-Born",
    "the Crossroads Soul",
    "the Sky-Road",
    "the Horizon-Chaser",
    "the Pack-on-Back",
    "the Border-Walker",
    "the Way-Worn",
    "the Coin-Tosser",
    "the Firelight Guest",
    "the Path-Unending",
    "the Mapless",
    "the Mile-Drinker",
      "the Twilit Rambler",
  "Step-Followed",
  "the Track-Farer",
  "the Wind-Carried",
  "the Noonday Walker",
  "the Campfire-Kin",
  "Trail-Bound",
  "the Dust-Threader",
  "the Far-Sailor",
  "the Road-Mender",
  "Sky-Drifter",
  "the Crest-Walker",
  "the Lantern-Rover",
  "Cloud-Wandered",
  "the Compass-Lost",
    "the Long-Stride",
  ],
};

const ELEMENT_EPITHETS: Partial<Record<Element, string[]>> = {
  [ELEMENTS.FIRE]: [
    "the Emberborn",
    "Flame-Touched",
    "Ashwalker",
    "the Pyre-Heart",
    "the Blaze-Called",
    "the Cinder-Kin",
    "the Hearth-Flame",
    "the Brand-Bearer",
    "the Coal-Souled",
    "the Wildspark",
    "the Scorch-Blooded",
      "the Ember-Ward",
  "the Forge-Kindled",
  "the Fire-Treader",
  "Soot-Marked",
  "the Furnace-Breath",
  "the Ember-Veined",
  "the Flame-Keeper",
  "the Char-Shadowed",
  "the Inferno-Bound",
  "the Kindle-Sworn",
  "the Spark-Warden",
  "the Ash-Forger",
    "the Torch-in-Storm",
  ],
  [ELEMENTS.WATER]: [
    "the Tidesworn",
    "Stormbound",
    "River-Heart",
    "the Tide-Walker",
    "the Deep-Caller",
    "the Mist-Cloaked",
    "the Wave-Rider",
    "the Rain-Favored",
    "the Drift-Soul",
    "the Foam-Born",
    "the Harbor-Warden",
      "the Current-Bound",
  "the Brine-Threaded",
  "the Frostwater Veil",
  "the Storm-Drifter",
  "the Kelprooted",
  "the River-Singer",
  "the Spray-Crowned",
  "the Moon-Tide",
  "the Undertow-Kin",
  "the Marsh-Walker",
  "the Shallow-Breath",
  "the Sea-Murmured",
    "the Flood-Marked",
  ],
  [ELEMENTS.EARTH]: [
    "Stonewarden",
    "Oak-Blooded",
    "Rootwalker",
    "the Stone-Sung",
    "the Earth-Held",
    "the Iron-Rooted",
    "the Boulder-Back",
    "the Grove-Guard",
    "the Flint-Heart",
    "the Barrow-Kin",
    "the Hill-Keeper",
    "the Soil-Bound",
      "the Moss-Cloaked",
  "the Burrow-Wise",
  "the Lichen-Bound",
  "the Deep-Delver",
  "the Thorn-Helmed",
  "the Root-Entwined",
  "the Earthwake",
  "the Loam-Favored",
  "the Stone-Bloom",
  "the Bark-Hewn",
  "the Mud-Oathed",
  "the Cavern-Soul"
  ],
  [ELEMENTS.AIR]: [
    "Wind-Touched",
    "Sky-Wanderer",
    "Stormcaller",
    "the Gale-Bound",
    "the Feather-Step",
    "the Cloud-Strider",
    "the Sky-Whisper",
    "the Storm-Blessed",
    "the White-Winged",
    "the High-Current",
    "the Thunder-Taken",
    "the Horizon-Eyed",
      "the Windborne",
  "Cloud-Walker",
  "the Whisper-in-Air",
  "the Skyborne Veil",
  "the Storm-Harrowed",
  "the Down-Feathered",
  "the Breaker-of-Fog",
  "the Wind-Rider",
  "the Tempest-Kissed",
  "the Far-Seeing",
  "the Updraft-Soul",
  "the Storm-Threaded"
  ],
  [ELEMENTS.DARK]: [
    "the Dreadmarked",
    "Nightwhisper",
    "the Pallid Shade",
    "the Grave-Bound",
    "the Umbral-Taken",
    "the Starless Oath",
    "the Black-Sigiled",
    "the Tomb-Caller",
    "the Lantern-Dimmer",
    "the Cold-Gaze",
    "the Last Gloaming",
    "the Veil-Torn Soul",
      "the Shadow-Rooted",
  "the Void-Wrought",
  "the Bleak-Bound",
  "Grave-Eyed",
  "the Nether-Touched",
  "the Night-Fallen",
  "the Death-Pledged",
  "the Ashen Veil",
  "the Silent Dirge",
  "Woe-Bearer",
  "the Last Lament",
  "the Blackened Hollow"
  ],
};

const DIALECT_EPITHETS: Record<Dialect, string[]> = {
  [DIALECTS.HIGH]: [
    "the Starborne",
    "Silver-Tongue",
    "the Moon-Wise",
    "the Court-Sworn",
    "the Crystal-Crowned",
    "the Dawn-Scribe",
    "the Sky-Herald",
    "the Song-of-Years",
    "the Radiant Line",
    "the Starlace",
    "the High Speaker",
    "the Argent Veil",
      "the Gilded Voice",
  "the Sunlit Mantle",
  "the Celestial-Bound",
  "the Ivory Crest",
  "the Dawn-Anointed",
  "the Crown-of-Winds",
  "the Light-Preserved",
  "the Oath-of-Stars",
  "the Prism-Seer",
  "the Lark-of-Courts",
  "the High-Chronicler",
  "the Cerulean Grace"
  ],
  [DIALECTS.FOREST]: [
    "Greenwalker",
    "Leafcloak",
    "Grovekin",
    "the Briar-Cloak",
    "the Fern-Hid",
    "the Thicket-Wise",
    "the Root-Friend",
    "the Branch-Runner",
    "the Sap-Soul",
    "the Fox-Shadow",
    "the Dew-Warden",
    "the Thorn-Bound",
      "the Moss-Foot",
  "the Hollow-Whisper",
  "the Bark-Warden",
  "the Shade-in-Boughs",
  "the Fawn-Caller",
  "the Lichen-Born",
  "the Glade-Keeper",
  "the Pine-Sigh",
  "the Briar-Mantled",
  "the Elm-Taken",
  "the Quiet Underleaf",
  "the Wildroot Sentinel"
  ],
  [DIALECTS.SEA]: [
    "Wave-Turned",
    "Salt-Singer",
    "Stormsail",
    "the Tide-Bitten",
    "the Rope-Scarred",
    "the Deck-Dancer",
    "the Gull-Cried",
    "the Brine-Eyed",
    "the Reef-Walker",
    "the Seafoam Step",
    "the Lantern-at-Port",
    "the Keel-Friend",
      "the Tide-Listener",
  "Spray-Bound",
  "the Driftwood Soul",
  "the Shoal-Wanderer",
  "the Wave-Lantern",
  "the Gale-Watcher",
  "the Surf-Born",
  "the Compass-Lost",
  "the Harbor-Shadow",
  "the Rope-and-Reed",
  "the Salt-Haloed",
  "the Star-on-Waves"
  ],
  [DIALECTS.MOUNTAIN]: [
    "Stonefoot",
    "Peak-Guardian",
    "Hammer-Echo",
    "the Cliff-Held",
    "the Frost-Breath",
    "the Ridge-Warden",
    "the Cavern-Voice",
    "the Anvil-Echo",
    "the Crag-Keeper",
    "the Ice-Ridge",
    "the Granite-Souled",
    "the Thunder-Downhill",
      "the Snowbound",
  "the Highcliff Watch",
  "the Glacier-Step",
  "Rime-Carved",
  "the Hollow-March",
  "the Avalanche’s Whisper",
  "the Deepstone Echo",
  "the Windswept Crest",
  "Cairn-Binder",
  "the Frost-Hewn",
  "the Summit-Kin",
  "the Iron-Wind Touched"
  ],
  [DIALECTS.SHADOW]: [
    "the Veil-Bound",
    "Gloomwalker",
    "the Lantern-Eater",
    "the Alley-Murk",
    "the Dusk-Watcher",
    "the Fog-Halo",
    "the Quiet Step",
    "the Door-in-Mist",
    "the Candle-Shade",
    "the Night-Breath",
    "the Ashen Silhouette",
    "the Hollow-Eyed",
      "the Smoke-Drift",
  "Soot-Wanderer",
  "the Gutter-Ghost",
  "the Moonless Trace",
  "the Whisper-in-Black",
  "the Dimming Walk",
  "the Pall of Corners",
  "the Shade-Threaded",
  "the Murmuring Veil",
  "the Half-Lit Shape",
  "the Drift-in-Doorways",
  "the Unlit Passage"
  ],
};

// Nicknames are more casual and shorter, keyed by tone
const NICKNAMES_BY_TONE: Record<LoreTone, string[]> = {
bright: [
  "Sunny",
  "Starlet",
  "Bright-Eyes",
  "Ray",
  "Glint",
  "Halo",
  "Spark",
  "Goldie",
  "Lumi",
  "Sky",
  // new from last batch
  "Dawn",
  "Gleam",
  "Prism",
  "Flare",
  "Nova",
  "Comet",
  "Twinkle",
  "Shine",
  "Aurie",
  "Beacon",
  "Sunbeam",
  "Daystar",
  "Glow",
  "Jewel",
  "Blaze",
  "Starfall",
  "Glory",
  "Flit",
  "Halo-Heart",
  "Brightwing",

  // NEW to reach 40 – cheerful/twee/friendly/cute
  "Bubbles",
  "Peach",
  "Pip",
  "Poppy",
  "Button",
  "Merry",
  "Giggles",
  "Breezy",
  "Sprout",
  "Petal",
  "Wink",
  "Cherry",
  "Fizz",
  "Mirth",
  "Skippy",
  "Tinsel",
  "Bunny",
  "Sweetleaf",
  "Honeydrop",
  "Puddle",
],
  balanced: [
  "Ash",
  "Lark",
  "Wren",
  "Rowan",
  "Briar",
  "Rook",
  "Finch",
  "Reed",
  "Pine",
  "Vale",
  // existing new ones
  "Cinder",
  "Moss",
  "Fable",
  "Rune",
  "Sage",
  "Thorn",
  "Keel",
  "Cove",
  "Bran",
  "Kestrel",
  "Tansy",
  "Flint",
  "Oak",
  "Bracken",
  "Loam",
  "Drift",
  "Pebble",
  "Patch",
  "Hazel",
  "Quill",
  "Sparrow",
  "Ivy",
  "Fenn",
  "Talon",
  "Marsh",
  "Cairn",
  "Fern",

  // NEW to reach 40 — practical, grounded, catchy, non-nature specific
  "Brook",
  "Wade",
  "Tarn",
  "Marl",
  "Grit",
  "Burl",
  "Whit",
  "Bridle",
  "Latch",
  "Knoll",
  "Sheaf",
  "Thimble",
  "Banner",
  "Trip",
  "Dell",
  "Wright",
  "Hollow",
  "Patchwork",
],

shadowed: [
  "Shade",
  "Whisper",
  "Gloom",
  "Crow",
  "Grim",
  "Moth",
  "Sable",
  "Vex",
  "Ruin",
  "Rift",
  // your new ones
  "Dusk",
  "Raven",
  "Woe",
  "Hush",
  "Pale",
  "Grave",
  "Hollow",
  "Nightjar",
  "Mor",
  "Knell",
  "Bleak",
  "Fog",
  "Rookshade",
  "Void",
  "Duskwing",
  "Ashen",
  "Wraith",
  "Murk",
  "Tatter",
  "Noir",
  "Stitch",
  "Crowfeather",
  "Bane",
  "Null",
  "Gash",
  "Drab",
  "Sigh",

  // NEW additions to reach 40: tough, criminal, intimidating, scarred
  "Cutlass",
  "Bruise",
  "Blackhand",
  "Razor",
  "Latchkey",
  "Scathe",
  "Smudge",
  "Hex",
  "Blight",
  "Scrap",
],

};


/**
 * Pick a fantasy epithet based on role, element, and dialect.
 * Epithets are things like: "the Emberborn", "Ashwalker", "Greenwalker".
 */
function makeEpithet(profile: LoreProfile): string | null {
  const { role, element, dialect } = profile;

  const rolePool = ROLE_EPITHETS[role] ?? ROLE_EPITHETS["wanderer"];
  const elementPool = element ? ELEMENT_EPITHETS[element] ?? [] : [];
  const dialectPool = DIALECT_EPITHETS[dialect] ?? [];

  // Build a small mixed pool; we only need a few options.
  const mixed: string[] = [];

  if (rolePool.length) mixed.push(randomItem(rolePool));
  if (elementPool.length) mixed.push(randomItem(elementPool));
  if (dialectPool.length) mixed.push(randomItem(dialectPool));

  if (!mixed.length) return null;

  return randomItem(mixed);
}

/**
 * Pick a nickname based on tone, e.g. "Ash", "Shade", "Sunny".
 */
function makeNickname(profile: LoreProfile): string | null {
  const { tone } = profile;
  const pool = NICKNAMES_BY_TONE[tone] ?? NICKNAMES_BY_TONE["balanced"];
  if (!pool.length) return null;
  return randomItem(pool);
}

/**
 * Apply an epithet or nickname to the full name.
 * - "epithet":  Elarion Vaeth, the Emberborn
 * - "nickname": Elarion "Ash" Vaeth
 *
 * Weighted so repeated tags become less likely:
 *  1st use → 100%
 *  2nd use → 50%
 *  3rd use → 33%
 *  4th use → 25%
 */
function applyEpithetOrNickname(
  fullName: string,
  profile: LoreProfile,
  mode: EpithetMode,
  usage?: EpithetUsageStats
): string {
  const base = fullName;
  const maxAttempts = 8;
  let best = base;

  // Helper to insert nickname between first & last
  function insertNickname(full: string, nick: string): string {
    const parts = full.split(" ");
    if (parts.length < 2) {
      // in case something weird happens: default to end placement
      return `${full} "${nick}"`;
    }
    const first = parts[0];
    const last = parts.slice(1).join(" ");
    return `${first} "${nick}" ${last}`;
  }

  // If we aren't tracking usage (simple fallback)
  if (!usage) {
    if (mode === "epithet") {
      const tag = makeEpithet(profile);
      return tag ? `${base} ${tag}` : base;
    }
    if (mode === "nickname") {
      const tag = makeNickname(profile);
      return tag ? insertNickname(base, tag) : base;
    }
    if (mode === "either") {
      if (Math.random() < 0.5) {
        const tag = makeEpithet(profile);
        return tag ? `${base} ${tag}` : base;
      } else {
        const tag = makeNickname(profile);
        return tag ? insertNickname(base, tag) : base;
      }
    }
    return base;
  }

  // Weighted selection path
  for (let i = 0; i < maxAttempts; i++) {
    let tag: string | null = null;
    let tagKey = "";

    if (mode === "epithet") {
      tag = makeEpithet(profile);
      if (!tag) continue;
      tagKey = `E:${tag}`;
      best = `${base} ${tag}`;
    } else if (mode === "nickname") {
      tag = makeNickname(profile);
      if (!tag) continue;
      tagKey = `N:${tag}`;
      best = insertNickname(base, tag);
    } else if (mode === "either") {
      const useEpithet = Math.random() < 0.5;
      if (useEpithet) {
        tag = makeEpithet(profile);
        if (!tag) continue;
        tagKey = `E:${tag}`;
        best = `${base} ${tag}`;
      } else {
        tag = makeNickname(profile);
        if (!tag) continue;
        tagKey = `N:${tag}`;
        best = insertNickname(base, tag);
      }
    } else {
      return base;
    }

    const currentCount = getEpithetUsage(usage, tagKey);
    const acceptChance = 1 / (1 + currentCount);

    if (Math.random() < acceptChance) {
      incrementEpithetUsage(usage, tagKey);
      return best;
    }
  }

  return best;
}

// ===========================
// STATS: derive from profile
// ===========================
function clampStat(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function deriveStatsFromProfile(
  profile: LoreProfile,
  fullName: string
): StatBlock {
  const { role, tone, element, dialect } = profile;

  // Start everything at 0; we'll add contributions and clamp at the end.
  const stats: StatBlock = {
    // Elements
    fire: 0,
    water: 0,
    earth: 0,
    air: 0,
    dark: 0,

    // Roles
    warrior: 0,
    hunter: 0,
    seer: 0,
    healer: 0,
    bard: 0,
    shadow: 0,
    noble: 0,
    smith: 0,
    wanderer: 0,

    // High-level thematic axes (existing)
    luminosity: 0,
    wildness: 0,
    arcane: 0,
    renown: 0,

    // NEW: tone axes
    toneBright: 0,
    toneShadow: 0,
    toneBalanced: 0,
    toneScore: 0,

    // NEW: dialect affinities
    dialectHigh: 0,
    dialectForest: 0,
    dialectSea: 0,
    dialectMountain: 0,
    dialectShadow: 0,

    // NEW: flavor flags (booleans, not clamped)
    hasEpithet: false,
    hasNickname: false,
  };

  // -------------------------
  // 1) Element core
  // -------------------------
  switch (element) {
    case ELEMENTS.FIRE:
      stats.fire += 75;
      stats.air += 10;
      stats.earth += 5;
      break;
    case ELEMENTS.WATER:
      stats.water += 75;
      stats.air += 10;
      stats.dark += 5;
      break;
    case ELEMENTS.EARTH:
      stats.earth += 75;
      stats.fire += 5;
      stats.water += 5;
      break;
    case ELEMENTS.AIR:
      stats.air += 75;
      stats.fire += 5;
      stats.water += 5;
      break;
    case ELEMENTS.DARK:
      stats.dark += 80;
      stats.air += 5;
      stats.water += 5;
      break;
    default:
      // No strong element — make it more balanced
      stats.fire += 20;
      stats.water += 20;
      stats.earth += 20;
      stats.air += 20;
      stats.dark += 10;
      break;
  }

  // -------------------------
  // 2) Role-based core & axes
  // -------------------------
  switch (role) {
    case "warrior":
      stats.warrior += 80;
      stats.luminosity += 40;
      stats.wildness += 40;
      stats.arcane += 10;
      stats.renown += 50;
      break;

    case "hunter":
      stats.hunter += 80;
      stats.earth += 10;
      stats.air += 10;
      stats.wildness += 60;
      stats.renown += 30;
      break;

    case "seer":
      stats.seer += 80;
      stats.arcane += 70;
      stats.luminosity += 20;
      stats.renown += 40;
      break;

    case "healer":
      stats.healer += 80;
      stats.luminosity += 60;
      stats.arcane += 40;
      stats.renown += 30;
      break;

    case "bard":
      stats.bard += 80;
      stats.luminosity += 50;
      stats.arcane += 40;
      stats.renown += 50;
      break;

    case "shadow":
      stats.shadow += 80;
      stats.dark += 40;
      stats.luminosity -= 30;
      stats.wildness += 30;
      stats.arcane += 20;
      stats.renown += 20;
      break;

    case "noble":
      stats.noble += 80;
      stats.luminosity += 40;
      stats.wildness -= 30;
      stats.arcane += 20;
      stats.renown += 70;
      break;

    case "smith":
      stats.smith += 80;
      stats.earth += 20;
      stats.fire += 20;
      stats.wildness -= 10;
      stats.renown += 30;
      break;

    case "wanderer":
      stats.wanderer += 80;
      stats.wildness += 70;
      stats.renown += 30;
      break;

    default:
      // Unknown role: nudge toward balanced wanderer-ish vibes
      stats.wanderer += 30;
      stats.wildness += 30;
      break;
  }

  // -------------------------
  // 3) Tone-based adjustments
  // (bright / balanced / shadowed)
  // -------------------------
  if (tone === "bright") {
    stats.luminosity += 30;
    stats.dark -= 10;
    stats.arcane += 10;

    // NEW tone axes
    stats.toneBright += 70;
    stats.toneBalanced += 20;
  } else if (tone === "balanced") {
    stats.luminosity += 10;
    stats.wildness += 10;

    // NEW tone axes
    stats.toneBalanced += 70;
    stats.toneBright += 20;
    stats.toneShadow += 20;
  } else if (tone === "shadowed") {
    stats.luminosity -= 30;
    stats.dark += 30;
    stats.wildness += 15;
    stats.arcane += 10;

    // NEW tone axes
    stats.toneShadow += 70;
    stats.toneBalanced += 20;
  }

  // -------------------------
  // 4) Dialect-based adjustments
  // -------------------------
  switch (dialect) {
    case DIALECTS.HIGH:
      stats.luminosity += 20;
      stats.arcane += 20;
      stats.renown += 20;
      stats.wildness -= 10;

      // NEW: dialect affinity
      stats.dialectHigh += 80;
      break;

    case DIALECTS.FOREST:
      stats.earth += 15;
      stats.wildness += 25;
      stats.luminosity += 10;

      stats.dialectForest += 80;
      break;

    case DIALECTS.SEA:
      stats.water += 20;
      stats.wildness += 20;
      stats.luminosity += 10;

      stats.dialectSea += 80;
      break;

    case DIALECTS.MOUNTAIN:
      stats.earth += 20;
      stats.air += 10;
      stats.wildness += 5;
      stats.renown += 10;

      stats.dialectMountain += 80;
      break;

    case DIALECTS.SHADOW:
      stats.dark += 25;
      stats.luminosity -= 15;
      stats.arcane += 10;

      stats.dialectShadow += 80;
      break;
  }

  // -------------------------
  // 5) Name-shape: epithet / nickname presence
  // -------------------------
  const hasEpithet = / the [A-Z]/.test(fullName);
  const hasNickname = /".+?"/.test(fullName);

  // NEW: record flags on the stats object itself
  stats.hasEpithet = hasEpithet;
  stats.hasNickname = hasNickname;

  if (hasEpithet) {
    stats.renown += 15; // epithets feel legendary
  }
  if (hasNickname) {
    stats.wildness += 10; // nicknames feel grounded / social
  }

  // -------------------------
  // 6) Derived toneScore
  // -------------------------
  // Use the strongest of the three tone channels as an overall intensity
  stats.toneScore = Math.max(
    stats.toneBright,
    stats.toneShadow,
    stats.toneBalanced
  );

  // -------------------------
  // 7) Clamp everything into 0..100
  // -------------------------
  stats.fire = clampStat(stats.fire);
  stats.water = clampStat(stats.water);
  stats.earth = clampStat(stats.earth);
  stats.air = clampStat(stats.air);
  stats.dark = clampStat(stats.dark);

  stats.warrior = clampStat(stats.warrior);
  stats.hunter = clampStat(stats.hunter);
  stats.seer = clampStat(stats.seer);
  stats.healer = clampStat(stats.healer);
  stats.bard = clampStat(stats.bard);
  stats.shadow = clampStat(stats.shadow);
  stats.noble = clampStat(stats.noble);
  stats.smith = clampStat(stats.smith);
  stats.wanderer = clampStat(stats.wanderer);

  stats.luminosity = clampStat(stats.luminosity);
  stats.wildness = clampStat(stats.wildness);
  stats.arcane = clampStat(stats.arcane);
  stats.renown = clampStat(stats.renown);

  stats.toneBright = clampStat(stats.toneBright);
  stats.toneShadow = clampStat(stats.toneShadow);
  stats.toneBalanced = clampStat(stats.toneBalanced);
  stats.toneScore = clampStat(stats.toneScore);

  stats.dialectHigh = clampStat(stats.dialectHigh);
  stats.dialectForest = clampStat(stats.dialectForest);
  stats.dialectSea = clampStat(stats.dialectSea);
  stats.dialectMountain = clampStat(stats.dialectMountain);
  stats.dialectShadow = clampStat(stats.dialectShadow);

  return stats;
}


// ===========================
// ENCLAVES (logic + registry)
// ===========================

const avg = (...values: number[]): number =>
  values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

const clampToNonNegative = (value: number): number =>
  value > 0 ? value : 0;

const ENCLAVES: Readonly<Enclave[]> = [
  {
    id: "verdant-remnant",
    name: "Verdant Remnant",
    summary:
      "Wardens of the last great groves, tending living memories in forests that remember older ages.",
    ttrpgTip:
      "Great for druids, rangers, or nature-touched elves. Lean into ties to ancient trees, spirits, and forgotten wild shrines.",
    score: (s) => {
      const natureCore = avg(s.earth, s.water, s.dialectForest);
      const roles = avg(s.hunter, s.healer, s.wanderer);
      const tone = avg(s.toneBalanced, s.toneBright);
      return clampToNonNegative(
        natureCore * 0.4 + roles * 0.4 + tone * 0.2
      );
    },
  },
  {
    id: "astral-scribes",
    name: "Astral Scribes",
    summary:
      "Star-charting mystics who read fate in constellations and record omens in silver ink.",
    ttrpgTip:
      "Perfect for seers, mages, lorekeepers, and diviners. Play up visions, prophecies, and inconvenient truths.",
    score: (s) => {
      const mind = avg(s.arcane, s.toneBright, s.toneScore);
      const roles = avg(s.seer, s.bard, s.noble);
      const dialect = avg(s.dialectHigh, s.dialectSea);
      return clampToNonNegative(
        mind * 0.4 + roles * 0.4 + dialect * 0.2
      );
    },
  },
  {
    id: "thorn-circle",
    name: "Thorn Circle",
    summary:
      "Secretive guerilla wardens who defend the wild with briar, fang, and silent arrows.",
    ttrpgTip:
      "Ideal for hunters, rogues, and wild guardians. Embrace ambush, sabotage, and fiercely protected glades.",
    score: (s) => {
      const nature = avg(s.earth, s.dialectForest, s.wildness);
      const roles = avg(s.hunter, s.shadow, s.warrior);
      const tone = avg(s.toneShadow, s.toneBalanced);
      return clampToNonNegative(
        nature * 0.35 + roles * 0.45 + tone * 0.2
      );
    },
  },
  {
    id: "windward-path",
    name: "Windward Path",
    summary:
      "Nomadic wayfarers who follow song, storm, and wandering roads across sea and sky.",
    ttrpgTip:
      "Great for wanderers, scouts, sailors, and messengers. Lean into travel tales, maps, and hard-won road wisdom.",
    score: (s) => {
      const motion = avg(s.air, s.wildness, s.dialectSea);
      const roles = avg(s.wanderer, s.hunter, s.bard);
      const tone = avg(s.toneBalanced, s.toneBright);
      return clampToNonNegative(
        motion * 0.4 + roles * 0.4 + tone * 0.2
      );
    },
  },
  {
    id: "ember-forge",
    name: "Ember Forge",
    summary:
      "Artisans of flame and metal, binding memory into blades, mail, and masterwork relics.",
    ttrpgTip:
      "Perfect for smiths, warriors, and crafters. Lean into heirloom weapons, named armor, and vows sworn on steel.",
    score: (s) => {
      const craft = avg(s.fire, s.earth, s.smith);
      const roles = avg(s.warrior, s.noble);
      const dialect = avg(s.dialectMountain, s.dialectHigh);
      return clampToNonNegative(
        craft * 0.45 + roles * 0.35 + dialect * 0.2
      );
    },
  },
  {
    id: "moonlit-vigil",
    name: "Moonlit Vigil",
    summary:
      "Grey-cloaked sentries who keep watch where light and shadow meet, sworn to quiet oaths.",
    ttrpgTip:
      "Excellent for paladins, sentinels, and watchful scouts. Play with solemn vows, night patrols, and liminal places.",
    score: (s) => {
      const lightDarkBalance = avg(s.toneBalanced, s.luminosity, s.toneShadow);
      const roles = avg(s.warrior, s.healer, s.noble);
      const dialect = avg(s.dialectHigh, s.dialectShadow);
      return clampToNonNegative(
        lightDarkBalance * 0.4 + roles * 0.4 + dialect * 0.2
      );
    },
  },
  {
    id: "duskwatch",
    name: "Duskwatch",
    summary:
      "Shadow-wise wardens who patrol the border of safer realms and what waits beyond the treeline.",
    ttrpgTip:
      "Great for rangers, monster hunters, and grim scouts. Lean into tracking horrors, knowing old fears, and standing your ground.",
    score: (s) => {
      const darkGuard = avg(s.dark, s.toneShadow, s.dialectShadow);
      const roles = avg(s.hunter, s.shadow, s.warrior);
      const wild = s.wildness;
      return clampToNonNegative(
        darkGuard * 0.4 + roles * 0.4 + wild * 0.2
      );
    },
  },
  {
    id: "riverbinding",
    name: "Riverbinding",
    summary:
      "Keepers of crossings, ferries, and river-spirits who remember every oath sworn on their banks.",
    ttrpgTip:
      "Nice for healers, guides, and social characters. Emphasize deals, safe passage, and debts owed at bridges and fords.",
    score: (s) => {
      const waterSoul = avg(s.water, s.dialectSea, s.dialectForest);
      const roles = avg(s.healer, s.bard, s.wanderer);
      const tone = avg(s.toneBalanced, s.toneBright);
      return clampToNonNegative(
        waterSoul * 0.4 + roles * 0.4 + tone * 0.2
      );
    },
  },
  {
    id: "loreweave",
    name: "Loreweave",
    summary:
      "Story-binding scholars who knot history, magic, and song into a single living tapestry.",
    ttrpgTip:
      "Perfect for bards, sages, and mages. Lean into encyclopedic knowledge, old ballads, and magic that remembers your name.",
    score: (s) => {
      const mind = avg(s.arcane, s.renown, s.toneScore);
      const roles = avg(s.bard, s.seer, s.noble);
      const dialect = s.dialectHigh;
      return clampToNonNegative(
        mind * 0.4 + roles * 0.4 + dialect * 0.2
      );
    },
  },
  {
    id: "ironbough",
    name: "Ironbough",
    summary:
      "Stalwart line-holders who root themselves like trees and do not break when the storm comes.",
    ttrpgTip:
      "Excellent for front-line warriors, guardians, and stoic defenders. Emphasize endurance, oaths, and holding the line.",
    score: (s) => {
      const toughness = avg(s.earth, s.warrior, s.renown);
      const dialect = avg(s.dialectMountain, s.dialectForest);
      const wild = s.wildness;
      return clampToNonNegative(
        toughness * 0.45 + dialect * 0.25 + wild * 0.3
      );
    },
  },
  {
    id: "starfall-sentinels",
    name: "Starfall Sentinels",
    summary:
      "Elite guardians who stand where the sky has touched the earth, sworn to meteoric omens and fallen lights.",
    ttrpgTip:
      "Great for high-fantasy knights, champions, and legendary heroes. Lean into destiny, strange omens, and cosmic battles.",
    score: (s) => {
      const glory = avg(s.renown, s.toneBright, s.toneScore);
      const roles = avg(s.warrior, s.noble);
      const dialect = avg(s.dialectHigh, s.dialectMountain);
      return clampToNonNegative(
        glory * 0.45 + roles * 0.35 + dialect * 0.2
      );
    },
  },
  {
    id: "veilwalkers",
    name: "Veilwalkers",
    summary:
      "Those who slip between veils of dream, shadow, and half-remembered places where reality thins.",
    ttrpgTip:
      "Ideal for warlocks, shadow-mages, and liminal tricksters. Play with dreams, the unseen, and bargains with strange powers.",
    score: (s) => {
      const occult = avg(s.dark, s.arcane, s.toneShadow);
      const roles = avg(s.shadow, s.seer, s.wanderer);
      const dialect = s.dialectShadow;
      return clampToNonNegative(
        occult * 0.45 + roles * 0.35 + dialect * 0.2
      );
    },
  },
];

function assignEnclave(stats: NameStats): Enclave | null {
  let best: Enclave | null = null;
  let bestScore = 0;

  for (const enclave of ENCLAVES) {
    const score = enclave.score(stats);
    if (score > bestScore) {
      bestScore = score;
      best = enclave;
    }
  }

  return bestScore > 0 ? best : null;
}

//=========================================//
//------------Premium-Only Function Helpers--//
//========================================//
// ===========================
// SPIRIT-BONDS (logic + registry)
// ===========================

const SPIRIT_BONDS: Readonly<SpiritBond[]> = [
  {
    id: "fleet-step",
    name: "Fleet Step",
    summary:
      "Your stride is light and sure; you move as if the world were built with you in mind.",
    ttrpgTip:
      "During character creation, emphasize quickness and mobility. Choose options that let you act first, dart out of danger, or cover surprising distances when it matters.",
    score: (s) => {
      const agility = avg(s.air, s.wildness, s.wanderer);
      const clarity = avg(s.toneBright, s.toneBalanced);
      return clampToNonNegative(agility * 0.6 + clarity * 0.4);
    },
  },
  {
    id: "ember-blood",
    name: "Ember-Blood",
    summary:
      "A smoldering spark lives in your veins, lending you stubborn resilience and flashes of battle fury.",
    ttrpgTip:
      "Build this character as someone who hits harder when pushed. Look for traits that reward bold strikes, fiery themes, and refusing to fall even when badly hurt.",
    score: (s) => {
      const heat = avg(s.fire, s.shadow, s.warrior);
      const renown = s.renown;
      return clampToNonNegative(heat * 0.6 + renown * 0.4);
    },
  },
  {
    id: "moonshadow-sight",
    name: "Moonshadow Sight",
    summary:
      "You see more clearly in half-light and notice what hides between brightness and gloom.",
    ttrpgTip:
      "Lean into uncanny perception. Pick abilities and backgrounds that justify noticing hidden details, spotting ambushes, and seeing through subtle deceptions or illusions.",
    score: (s) => {
      const night = avg(s.dark, s.toneShadow, s.dialectShadow);
      const keen = avg(s.seer, s.hunter);
      return clampToNonNegative(night * 0.6 + keen * 0.4);
    },
  },
  {
    id: "verdant-mend",
    name: "Verdant Mend",
    summary:
      "Life clings to you; plants lean your way and wounds knit a little faster in your care.",
    ttrpgTip:
      "Shape this character as a quiet healer or caretaker. Favor options that let you restore others, soothe pain, or call on living things for small but meaningful aid.",
    score: (s) => {
      const life = avg(s.earth, s.water, s.healer);
      const tone = avg(s.toneBright, s.toneBalanced);
      return clampToNonNegative(life * 0.7 + tone * 0.3);
    },
  },
  {
    id: "starbound-will",
    name: "Starbound Will",
    summary:
      "Some distant light has taken notice of you; your resolve hardens when others falter.",
    ttrpgTip:
      "Portray a character who does not break under pressure. Choose traits that reinforce inner resolve, resisting fear, and staying true to a purpose when others waver.",
    score: (s) => {
      const resolve = avg(s.renown, s.toneScore, s.luminosity);
      const roles = avg(s.noble, s.seer, s.warrior);
      return clampToNonNegative(resolve * 0.6 + roles * 0.4);
    },
  },
  {
    id: "dreamecho",
    name: "Dreamecho",
    summary:
      "Dreams cling to you; sometimes they whisper secrets that later prove true.",
    ttrpgTip:
      "During character creation, talk with your GM about prophetic dreams or symbolic visions. Let hunches, strange symbols, and déjà vu gently steer your choices in play.",
    score: (s) => {
      const occult = avg(s.arcane, s.toneShadow, s.toneScore);
      const roles = avg(s.seer, s.bard, s.shadow);
      return clampToNonNegative(occult * 0.65 + roles * 0.35);
    },
  },
  {
    id: "stonegrace",
    name: "Stonegrace",
    summary:
      "You move with surprising ease in armor or rough terrain, like a dancer balanced on stone.",
    ttrpgTip:
      "Imagine someone at home on cliffs, ruins, or in heavy gear. Favor options that let you stay stable, sure-footed, and graceful where others would stumble or sink.",
    score: (s) => {
      const weight = avg(s.earth, s.warrior, s.smith);
      const calm = avg(s.toneBalanced, s.dialectMountain);
      return clampToNonNegative(weight * 0.65 + calm * 0.35);
    },
  },
  {
    id: "tidebound-gift",
    name: "Tidebound Gift",
    summary:
      "Currents favor you; water wraps around you like an old friend.",
    ttrpgTip:
      "Build toward a life tied to rivers, coasts, or storms. Choose elements that explain comfort on ships, in rain, or in deep water, and let that shape your travel and story hooks.",
    score: (s) => {
      const tide = avg(s.water, s.dialectSea, s.wanderer);
      const calm = s.toneBalanced;
      return clampToNonNegative(tide * 0.7 + calm * 0.3);
    },
  },
  {
    id: "veil-touched",
    name: "Veil-Touched",
    summary:
      "You are just slightly out of step with the world, slipping past notice more easily than most.",
    ttrpgTip:
      "Picture a character who is hard to pin down—quiet footsteps, forgettable face, or a knack for being elsewhere at the right moment. Prioritize subtlety, secrecy, and going unseen.",
    score: (s) => {
      const hidden = avg(s.shadow, s.dark, s.dialectShadow);
      const roles = avg(s.shadow, s.wanderer);
      return clampToNonNegative(hidden * 0.6 + roles * 0.4);
    },
  },
  {
    id: "battle-trance",
    name: "Battle Trance",
    summary:
      "In danger, your mind sharpens and the world slows to meet you.",
    ttrpgTip:
      "Design this character to come alive in crises. Choose features that highlight sharp focus, fast reactions, and a calm, almost detached state once blades are drawn.",
    score: (s) => {
      const focus = avg(s.warrior, s.renown, s.toneScore);
      const wild = s.wildness;
      return clampToNonNegative(focus * 0.65 + wild * 0.35);
    },
  },
  {
    id: "silver-tongue",
    name: "Silver Tongue",
    summary:
      "Your words land softly where they must, or cut deeper than steel when needed.",
    ttrpgTip:
      "Lean into conversations as your battlefield. Focus on choices that give you leverage in negotiations, ease in crowds, and the power to soothe or provoke with a few well-placed words.",
    score: (s) => {
      const charm = avg(s.bard, s.noble, s.renown);
      const tone = avg(s.toneBright, s.toneBalanced);
      return clampToNonNegative(charm * 0.7 + tone * 0.3);
    },
  },
  {
    id: "ancestral-ward",
    name: "Ancestral Ward",
    summary:
      "You carry unseen guardians with you; when misfortune strikes, something subtly intervenes.",
    ttrpgTip:
      "Frame this character as quietly protected—by ancestors, spirits, or lingering blessings. Work with your GM so that the worst outcomes sometimes bend or soften around you.",
    score: (s) => {
      const lineage = avg(s.renown, s.noble, s.arcane);
      const tone = avg(s.toneBright, s.toneBalanced);
      return clampToNonNegative(lineage * 0.6 + tone * 0.4);
    },
  },
  {
    id: "runesingers-touch",
    name: "Runesinger’s Touch",
    summary:
      "Old techniques live in your hands; tools, instruments, and symbols seem eager to cooperate when you work.",
    ttrpgTip:
      "Build this character as a maker, performer, or scholar. During creation, lean toward options that emphasize crafted gear, ritual tools, music, or ancient lore that you somehow ‘just know’ how to work with.",
    score: (s) => {
      const craft = avg(s.smith, s.bard, s.arcane);
      const refinement = avg(s.dialectHigh, s.renown);
      return clampToNonNegative(craft * 0.65 + refinement * 0.35);
    },
  },
  {
    id: "heartweaver-sense",
    name: "Heartweaver’s Sense",
    summary:
      "You feel the moods around you like changes in the weather; tension, fear, and quiet joys rarely escape your notice.",
    ttrpgTip:
      "Shape this character as someone who reads the room instinctively. In character creation, favor choices that support emotional insight, comforting others, diffusing conflict, or knowing when someone is hiding what they feel.",
    score: (s) => {
      const empathy = avg(s.bard, s.healer, s.luminosity);
      const attunement = avg(s.toneBalanced, s.toneScore);
      return clampToNonNegative(empathy * 0.6 + attunement * 0.4);
    },
  },
  {
    id: "wildheart-pact",
    name: "Wildheart Pact",
    summary:
      "Beasts and untamed places treat you as something almost-familiar; the wild does not see you as an intruder.",
    ttrpgTip:
      "Think of this character as bound to living lands and their creatures. During creation, look for themes of animal friendship, wilderness survival, and a sense that roads and cities are the strange places, not the forests and hills.",
    score: (s) => {
      const wildCore = avg(s.hunter, s.wanderer, s.wildness);
      const nature = avg(s.earth, s.dialectForest);
      return clampToNonNegative(wildCore * 0.65 + nature * 0.35);
    },
  },
];


function assignSpiritBond(stats: NameStats): SpiritBond | null {
  let best: SpiritBond | null = null;
  let bestScore = 0;

  for (const bond of SPIRIT_BONDS) {
    const score = bond.score(stats);
    if (score > bestScore) {
      bestScore = score;
      best = bond;
    }
  }

  return bestScore > 0 ? best : null;
}

//-----------------Download txt helpers----------//
function buildTextExport(results: GeneratedEntry[]): string {
  if (!results || results.length === 0) return "";

  return results
    .map((entry, idx) => {
      if (entry.lore) {
        return `${idx + 1}. ${entry.name}\n${entry.lore}`;
      }
      return `${idx + 1}. ${entry.name}`;
    })
    .join("\n\n");
}

function exportResultsAsText(results: GeneratedEntry[]) {
  if (!results || results.length === 0) return;

  const content = buildTextExport(results);
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const timestamp = new Date().toISOString().slice(0, 10); // e.g. 2025-12-07
  link.href = url;
  link.download = `elven-names-${timestamp}.txt`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

//--------------------batch copy helper-------------/
async function copyResultsToClipboard(results: GeneratedEntry[]) {
  if (!results || results.length === 0) return;

  const content = buildTextExport(results);
  if (!content) return;

  // Modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(content);
      // Optional: toast/snackbar instead of alert in a later version
      alert("All generated names have been copied to your clipboard.");
      return;
    } catch (err) {
      console.error("Clipboard copy failed, falling back to legacy method.", err);
    }
  }

  // Fallback: temporary textarea for older browsers
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    alert("All generated names have been copied to your clipboard.");
  } catch (err) {
    console.error("Legacy clipboard copy failed.", err);
  } finally {
    document.body.removeChild(textarea);
  }
}

// ===========================
// FAVORITES / SAVE SYSTEM: types & API helpers
// ===========================

export type SaveCharacterPayload = {
  name: string;
  nickname?: string | null;
  epithet?: string | null;

  enclave_name: string;
  enclave_summary: string;
  enclave_hook: string;

  spirit_name?: string | null;
  spirit_summary?: string | null;
  spirit_hook?: string | null;

  lore: string[];        // bullet points
  stats: InternalStats;  // hidden stats blob

  // Future: allow user to explicitly save duplicates
  allowDuplicate?: boolean;
};

export type SavedCharacter = {
  id: string;
  user_id: string;
  name: string;
  nickname: string | null;
  epithet: string | null;
  enclave_name: string;
  enclave_summary: string;
  enclave_hook: string;
  spirit_name: string | null;
  spirit_summary: string | null;
  spirit_hook: string | null;
  lore: string[];
  stats_json: InternalStats;
  created_at: string;
  updated_at: string;
};

// --- low-level API helpers ---

async function apiSaveCharacter(
  payload: SaveCharacterPayload
): Promise<
  | { ok: true; item: SavedCharacter | null; duplicated: boolean }
  | { ok: false; error: string }
> {
  try {
    const res = await fetch("/api/saved-characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data?.error ?? "Failed to save character",
      };
    }

    // Backend will eventually set duplicated=true if it finds an existing row
    if ("duplicated" in data && data.duplicated) {
      return {
        ok: true,
        item: (data.item as SavedCharacter | null) ?? null,
        duplicated: true,
      };
    }

    return {
      ok: true,
      item: (data.item as SavedCharacter | null) ?? null,
      duplicated: false,
    };
  } catch (err) {
    console.error("apiSaveCharacter error:", err);
    return { ok: false, error: "Network error while saving character" };
  }
}

async function apiDeleteSavedCharacter(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/saved-characters/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!data?.success;
  } catch (err) {
    console.error("apiDeleteSavedCharacter error:", err);
    return false;
  }
}

async function apiGetSavedCharacters(): Promise<
  | { ok: true; items: SavedCharacter[] }
  | { ok: false; error: string }
> {
  try {
    const res = await fetch("/api/saved-characters");
    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data?.error ?? "Failed to load favorites",
      };
    }

    return {
      ok: true,
      items: (data.items as SavedCharacter[] | undefined) ?? [],
    };
  } catch (err) {
    console.error("apiGetSavedCharacters error:", err);
    return { ok: false, error: "Network error while loading favorites" };
  }
}

// ===========================
// FAVORITES / SAVE SYSTEM: hooks
// ===========================

type UseSavedCharactersResult = {
  items: SavedCharacter[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
};

export function useSavedCharacters(): UseSavedCharactersResult {
  const [items, setItems] = useState<SavedCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    const result = await apiGetSavedCharacters();
    if (!result.ok) {
      setError(result.error);
      setItems([]);
    } else {
      setError(null);
      setItems(result.items);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return {
    items,
    isLoading,
    error,
    refresh: () => {
      void load();
    },
  };
}

type UseSaveCharacterArgs = {
  // Function that converts your generated character into a payload
  buildPayload: () => SaveCharacterPayload | null;
  // If you already know it's saved (e.g., on /favorites page), pass its id here
  initialSavedId?: string | null;
};

type UseSaveCharacterReturn = {
  savedId: string | null;
  isSaving: boolean;
  error: string | null;
  save: () => Promise<void>;
  unsave: () => Promise<void>;
};

export function useSaveCharacter({
  buildPayload,
  initialSavedId = null,
}: UseSaveCharacterArgs): UseSaveCharacterReturn {
  const { isLoggedIn, isPremium, isDev } = useUserRole();
  const [savedId, setSavedId] = useState<string | null>(initialSavedId);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (!isLoggedIn) {
      // Later: replace with login modal
      alert("Please log in to save characters.");
      return;
    }
    if (!isPremium && !isDev) {
      // Extra safety, UI should already gate this
      alert("Saving characters is a Premium feature.");
      return;
    }

    const payload = buildPayload();
    if (!payload) {
      setError("Unable to build save payload.");
      return;
    }

    setIsSaving(true);
    setError(null);

    const result = await apiSaveCharacter(payload);

    setIsSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    const newId = result.item?.id ?? null;
    if (newId) {
      setSavedId(newId);
    }
  }

  async function unsave() {
    if (!savedId) return;

    setIsSaving(true);
    const success = await apiDeleteSavedCharacter(savedId);
    setIsSaving(false);

    if (success) {
      setSavedId(null);
    } else {
      setError("Failed to remove from favorites.");
    }
  }

  return {
    savedId,
    isSaving,
    error,
    save,
    unsave,
  };
}

/* ===========================
   UI COMPONENT
   =========================== */
// Card for a single generated result, with Save/Unsave logic
type ResultCardProps = {
  entry: GeneratedEntry;
  isPremiumMode: boolean;   // your UI toggle (Free / Premium)
  showDebugStats: boolean;
};

function ResultCard({ entry, isPremiumMode, showDebugStats }: ResultCardProps) {
  const { isPremium: roleIsPremium, isDev } = useUserRole();

  const { savedId, isSaving, error, save, unsave } = useSaveCharacter({
    buildPayload: () => {
      if (!entry) return null;

      // Normalize lore into string[]
      let loreArray: string[] = [];
      if (entry.lore) {
        if (Array.isArray(entry.lore)) {
          loreArray = entry.lore;
        } else if (typeof entry.lore === "string") {
          loreArray = entry.lore
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        }
      }

      return {
        name: entry.name,

        // Right now nickname/epithet are embedded into the name string; keep these null for now.
        nickname: null,
        epithet: null,

        enclave_name: entry.enclave?.name ?? "Unknown Enclave",
        enclave_summary: entry.enclave?.summary ?? "",
        enclave_hook: entry.enclave?.ttrpgTip ?? "",

        spirit_name: entry.spiritBond?.name ?? null,
        spirit_summary: entry.spiritBond?.summary ?? null,
        spirit_hook: entry.spiritBond?.ttrpgTip ?? null,

        lore: loreArray,
        stats: entry.stats as InternalStats,

        allowDuplicate: false,
      };
    },
  });

  const isSaved = !!savedId;

  // Save button is usable only when:
  // 1) UI is in Premium mode, AND
  // 2) user role is Premium (or Dev)
  const canUseSave = isPremiumMode && (roleIsPremium || isDev);

  let saveButton;
  if (!canUseSave) {
    saveButton = (
      <button
        type="button"
        className="ml-2 text-xs px-2 py-1 rounded border border-yellow-500 text-yellow-300 bg-gray-900 opacity-80 cursor-not-allowed"
        title="Saving characters is a Premium feature."
        disabled
      >
        🔒 Save
      </button>
    );
  } else {
    saveButton = (
      <button
        type="button"
        onClick={isSaved ? unsave : save}
        disabled={isSaving}
        className={
          "ml-2 text-xs px-2 py-1 rounded border transition " +
          (isSaved
            ? "border-yellow-400 bg-yellow-500/20 text-yellow-200"
            : "border-gray-500 bg-gray-800 text-gray-200 hover:bg-gray-700")
        }
        title={
          isSaved
            ? "Remove this character from your favorites."
            : "Save this character to your favorites."
        }
      >
        {isSaved ? "⭐ Saved" : "☆ Save"}
      </button>
    );
  }


  return (
    <li className="bg-gray-900 border border-gray-700 p-3 rounded-lg">
      {/* Header row: name + save button */}
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-lg">{entry.name}</div>
        <div className="flex items-center">
          {saveButton}
        </div>
      </div>

      {/* Optional error message under header if saving fails */}
      {error && (
        <div className="mt-1 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Enclave line */}
      <div className="mt-1 text-sm">
        <span className="text-gray-300 font-semibold">Enclave: </span>
        <span className="text-gray-100">
          {entry.enclave ? entry.enclave.name : "No clear enclave match"}
        </span>
      </div>

      {/* Enclave details as copyable bullets */}
      {entry.enclave && (
        <ul className="mt-1 text-xs text-gray-400 list-disc list-inside space-y-0.5">
          <li>{entry.enclave.summary}</li>
          <li>
            <span className="text-purple-300">TTRPG Hook:</span>{" "}
            {entry.enclave.ttrpgTip}
          </li>
        </ul>
      )}

      {/* 🔮 Spirit-Bond block (gated by UI premium mode) */}
      {isPremiumMode && entry.spiritBond && (
        <>
          <div className="mt-2 text-sm">
            <span className="text-gray-300 font-semibold">
              Spirit-Bond:{" "}
            </span>
            <span className="text-gray-100">
              {entry.spiritBond.name}
            </span>
          </div>
          <ul className="mt-1 text-xs text-gray-400 list-disc list-inside space-y-0.5">
            <li>{entry.spiritBond.summary}</li>
            <li>
              <span className="text-purple-300">TTRPG Hook:</span>{" "}
              {entry.spiritBond.ttrpgTip}
            </li>
          </ul>
        </>
      )}

      {/* Character Lore header + bullets */}
      {entry.lore && (
        <div className="mt-2">
          <div className="text-sm text-gray-300 font-semibold">
            Character Lore:
          </div>
          <p className="mt-1 text-xs text-gray-400 whitespace-pre-line">
            {entry.lore}
          </p>
        </div>
      )}

      {/* Premium-only debug statblock (from UI toggle) */}
      {isPremiumMode && showDebugStats && entry.stats && (
        <pre className="mt-3 p-3 rounded bg-gray-800 border border-gray-700 text-xs text-gray-300 overflow-x-auto">
          {JSON.stringify(entry.stats, null, 2)}
        </pre>
      )}
    </li>
  );
}

export default function Home() {
  const [archetypeA, setArchetypeA] = useState("");
  const [archetypeB, setArchetypeB] = useState("");

  const [gender, setGender] = useState<Gender>("neutral");
  const [nameLength, setNameLength] = useState<NameLength>("medium");

  const [isPremium, setIsPremium] = useState(false);
  const [includeLore, setIncludeLore] = useState(true);
  const [count, setCount] = useState(5);

  const [epithetMode, setEpithetMode] = useState<EpithetMode>("none");

  const [results, setResults] = useState<GeneratedEntry[]>([]);

  // NEW: debug flag to show/hide stats block
  const [showDebugStats, setShowDebugStats] = useState(true);

  const effectiveMax = isPremium ? 50 : 5;

  //=================================//
  //----------------Generate Names---//
  //=================================//
  function generateNames() {
    // Track name shape usage for this batch
    const shapeStats: ShapeStats = new Map();

    // Track nickname/epithet usage for this batch
    const epithetUsage: EpithetUsageStats = new Map();

    // Track proto-root usage for this batch (used by both first + surname)
    const protoUsageStats: ProtoUsageStats = new Map();

    // Guard against NaN / weird count values
    const safeCount = Number.isFinite(count) && count > 0 ? count : 1;
    const cappedCount = Math.min(safeCount, effectiveMax);

    const output: GeneratedEntry[] = [];

    for (let i = 0; i < cappedCount; i++) {
      // First name: full pipeline incl. gender + length + shape diversity
      const first = makeFantasyName(
        archetypeA,
        archetypeB,
        gender,
        nameLength,
        shapeStats,      // shape stats for this batch
        protoUsageStats  // diversity-aware proto usage for first names
      );

      // Surname: complements first name, shares proto usage stats
      const last = makeSurname(
        archetypeA,
        archetypeB,
        first,
        protoUsageStats
      );

      let fullName = `${first} ${last}`;

      // Lore profile (used for lore, epithets/nicknames, and stats)
      const profile = deriveLoreProfile(archetypeA, archetypeB);

      // Apply epithet / nickname for everyone if enabled
      if (epithetMode !== "none") {
        fullName = applyEpithetOrNickname(
          fullName,
          profile,
          epithetMode,
          epithetUsage
        );
      }

      // Derive stats from the final name + profile
      const stats = deriveStatsFromProfile(profile, fullName);

      // Assign an enclave based on the stats
      const enclave = assignEnclave(stats);

      // 🔮 Premium-only Spirit-Bond assignment
      const spiritBond = isPremium ? assignSpiritBond(stats) : null;

      output.push({
        name: fullName,
        lore:
          isPremium && includeLore
            ? makeLore(fullName, archetypeA, archetypeB)
            : undefined,
        stats,
        enclave,
        spiritBond,
      });
    }

    setResults(output);
  }

return (
  <main className="min-h-screen p-6 md:p-10 bg-gray-900 text-white flex flex-col items-center">
    <div className="w-full max-w-3xl space-y-6">

      {/* Link to Saved Characters */}
<div className="text-right">
{isPremium ? (
  <a
    href="/Favorites"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-purple-300 hover:underline"
  >
    View saved characters →
    </a>
  ) : (
    <span
      className="inline-flex items-center gap-1 text-sm text-gray-500 cursor-not-allowed"
      title="Saved character lists are a Premium feature."
    >
      View saved characters
      <span>🔒</span>
    </span>
  )}
</div>



        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Elven Name Generator
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Mix two archetypes to generate evocative elven names with Tolkien-inspired
            flair. Free mode gives you quick lists; Premium mode unlocks bulk names,
            rich lore hooks, and optional epithets or nicknames.
          </p>
        </header>

        {/* Mode Toggle */}
        <section className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="font-semibold text-lg">Mode</h2>
            <p className="text-sm text-gray-300">
              Free: up to 5 names, no lore. Premium: up to 50 names, lore, and extra flavor.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPremium(false)}
              className={
                "px-3 py-2 rounded-l-lg border border-gray-600 text-sm font-medium " +
                (!isPremium
                  ? "bg-purple-600 border-purple-400"
                  : "bg-gray-900")
              }
            >
              Free
            </button>
            <button
              onClick={() => setIsPremium(true)}
              className={
                "px-3 py-2 rounded-r-lg border border-gray-600 text-sm font-medium " +
                (isPremium
                  ? "bg-purple-600 border-purple-400"
                  : "bg-gray-900")
              }
            >
              Premium
            </button>
          </div>
        </section>

        {/* Input Card */}
        <section className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Archetype A
              </label>
              <input
                type="text"
                value={archetypeA}
                onChange={(e) => setArchetypeA(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Elf, Knight, Druid"
              />
              <p className="mt-1 text-xs text-gray-400">
                If left empty, this archetype will be chosen at random.
              </p>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Archetype B
              </label>
              <input
                type="text"
                value={archetypeB}
                onChange={(e) => setArchetypeB(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Shadow, Storm, Flame"
              />
              <p className="mt-1 text-xs text-gray-400">
                If left empty, this archetype will be chosen at random.
              </p>
            </div>
          </div>

          {/* Name length dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Name length
            </label>
            <select
              value={nameLength}
              onChange={(e) => setNameLength(e.target.value as NameLength)}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Short: punchy; Medium: typical; Long: more lyrical names.
            </p>
          </div>

          {/* Gender dropdown */}
          <div>
            <label className="block mb-1 mt-2 text-sm font-medium">
              Gender style (optional)
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="neutral">Neutral / unmarked</option>
              <option value="male">Masculine-leaning</option>
              <option value="female">Feminine-leaning</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              This nudges the ending of the name toward masculine
              (-ion, -or) or feminine (-ia, -iel, -wen) patterns.
            </p>
          </div>

          {/* Premium flavor controls (with progressive disclosure) */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Epithets / Nicknames (now free for everyone) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Epithets / nicknames
              </label>
              <select
                value={epithetMode}
                onChange={(e) =>
                  setEpithetMode(e.target.value as EpithetMode)
                }
                className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="either">Either (random blend)</option>
                <option value="none">None</option>
                <option value="epithet">
                  Epic epithet (e.g. the Emberborn)
                </option>
                <option value="nickname">
                  Nickname (e.g. &quot;Ash&quot;)
                </option>
              </select>
              <p className="mt-1 text-xs text-gray-400">
                Epithets feel legendary; nicknames feel more casual and grounded.
              </p>
            </div>

            {/* Lore + Debug */}
            <div className="flex flex-col gap-2 mt-4 md:mt-6">
              {isPremium && (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      id="includeLore"
                      type="checkbox"
                      checked={includeLore}
                      onChange={(e) => setIncludeLore(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="includeLore" className="text-sm">
                      Include bullet-point lore hooks for each name
                    </label>
                  </div>

                  {/* Premium-only debug stats toggle */}
                  <div className="flex items-center gap-2">
                    <input
                      id="showDebugStats"
                      type="checkbox"
                      checked={showDebugStats}
                      onChange={(e) => setShowDebugStats(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="showDebugStats"
                      className="text-xs md:text-sm text-gray-300"
                    >
                      Show debug stats block for each result
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block mb-1 text-sm font-medium">
                How many names?
              </label>
              <input
                type="number"
                value={count}
                min={1}
                max={effectiveMax}
                onChange={(e) => {
                  const raw = e.target.value;
                  const parsed = parseInt(raw, 10);

                  // If the field is empty or invalid, default to 1
                  const next = Number.isNaN(parsed) ? 1 : parsed;
                  setCount(next);
                }}
                className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />
              <p className="text-xs text-gray-400 mt-1">
                {isPremium
                  ? `Premium: up to ${effectiveMax} names at once.`
                  : "Free: capped at 5 names per batch."}
              </p>
            </div>
          </div>

          <button
            onClick={generateNames}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold mt-2"
          >
            Generate
          </button>
        </section>

        {/* Results */}
        {results.length > 0 && (
          <section className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl space-y-3">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {/* Labels + tooltips section */}
              <div className="flex items-center gap-4">
                {/* 🌲 Enclave label + tooltip */}
                <div className="flex items-center gap-1">
                  <span className="text-gray-200 font-semibold text-sm">
                    Enclave
                  </span>
                  <span
                    className="inline-flex items-center justify-center h-5 w-5 rounded-full border border-gray-500 text-[10px] cursor-help text-gray-200"
                    title={
                      "Enclaves are elven cultural lineages or orders, determined automatically from each name’s hidden stat profile. " +
                      "Use them to inspire character origins, training, worldview, temperament, or narrative identity."
                    }
                  >
                    i
                  </span>
                </div>

                {/* 🔮 Spirit-Bond label + tooltip (header) */}
                <div className="flex items-center gap-1">
                  <span className="text-purple-200 font-semibold text-sm">
                    Spirit-Bond
                  </span>

                  {isPremium ? (
                    // Premium: info icon
                    <span
                      className="inline-flex items-center justify-center h-5 w-5 rounded-full border border-purple-500 text-[10px] cursor-help text-purple-200"
                      title={
                        "Spirit-Bonds are innate elven gifts—subtle supernatural talents or extraordinary aptitudes shaped by the same hidden stat profile. " +
                        "Use them in character creation to guide small but meaningful strengths: heightened senses, grace, resolve, intuition, or protective luck."
                      }
                    >
                      i
                    </span>
                  ) : (
                    // Free: lock icon + premium description
                    <span
                      className="inline-flex items-center justify-center h-5 w-5 rounded-full border border-purple-500 text-[10px] cursor-help text-purple-200"
                      title={
                        "Premium Feature: Spirit-Bonds are innate elven gifts tied to each name’s hidden stats. " +
                        "They give you subtle supernatural talents or extraordinary aptitudes you can plug directly into your character build."
                      }
                    >
                      🔒
                    </span>
                  )}
                </div>

                {/* 📝 Lore label + tooltip (Free users only) */}
                {!isPremium && (
                  <div className="flex items-center gap-1">
                    <span className="text-green-200 font-semibold text-sm">
                      Lore
                    </span>
                    <span
                      className="inline-flex items-center justify-center h-5 w-5 rounded-full border border-green-500 text-[10px] cursor-help text-green-200"
                      title={
                        "Premium Feature: Each name gains custom lore hooks: short, system-neutral prompts you can plug straight into your character’s backstory, personality, and past events."
                      }
                    >
                      🔒
                    </span>
                  </div>
                )}
              </div>

              {/* Export / copy buttons + stats toggle (with progressive disclosure) */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Copy All */}
                <button
                  onClick={() => {
                    if (!isPremium) return;
                    copyResultsToClipboard(results);
                  }}
                  disabled={!isPremium}
                  className={
                    "bg-gray-900 border px-4 py-2 rounded-lg text-sm font-medium transition " +
                    (isPremium
                      ? "border-purple-500 hover:bg-purple-600 hover:border-purple-300"
                      : "border-gray-700 opacity-50 cursor-not-allowed")
                  }
                  title={
                    isPremium
                      ? "Copy all generated names to your clipboard."
                      : "Premium Feature: Unlock bulk copy for your generated names."
                  }
                >
                  {isPremium ? "Copy all" : "Copy all 🔒"}
                </button>

                {/* Export as .txt */}
                <button
                  onClick={() => {
                    if (!isPremium) return;
                    exportResultsAsText(results);
                  }}
                  disabled={!isPremium}
                  className={
                    "bg-gray-900 border px-4 py-2 rounded-lg text-sm font-medium transition " +
                    (isPremium
                      ? "border-purple-500 hover:bg-purple-600 hover:border-purple-300"
                      : "border-gray-700 opacity-50 cursor-not-allowed")
                  }
                  title={
                    isPremium
                      ? "Export your names to a .txt file."
                      : "Premium Feature: Export your generated names to a text file."
                  }
                >
                  {isPremium ? "Export as .txt" : "Export as .txt 🔒"}
                </button>

                {/* Debug stats toggle remains Premium-only */}
                {isPremium && (
                  <button
                    onClick={() => setShowDebugStats((prev) => !prev)}
                    className="ml-2 bg-gray-700 border border-gray-600 px-3 py-1 rounded text-xs hover:bg-gray-600"
                  >
                    {showDebugStats ? "Hide stats" : "Show stats"}
                  </button>
                )}
              </div>
            </div>

            {/* Results List */}
            <ul className="space-y-3">
              {results.map((entry, i) => (
                <ResultCard
                  key={i}
                  entry={entry}
                  isPremiumMode={isPremium}
                  showDebugStats={showDebugStats}
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

//============================================//
//-------------------END OF CODE--------------//
//============================================//
