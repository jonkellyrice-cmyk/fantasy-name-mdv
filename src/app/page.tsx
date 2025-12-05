"use client";

import { useState } from "react";

type GeneratedEntry = {
  name: string;
  lore?: string;
};
type Gender = "neutral" | "male" | "female";
/* ===========================
   ELVISH LANGUAGE ENGINE
   (Integrated, no external imports)
   =========================== */

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
  { key: "fire", proto: "pyran", elements: [ELEMENTS.FIRE] },
  { key: "flame", proto: "sirla", elements: [ELEMENTS.FIRE] },
  { key: "ember", proto: "kaleth", elements: [ELEMENTS.FIRE] },
  { key: "light", proto: "alir", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "star", proto: "selun", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "sun", proto: "tavos", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "heat", proto: "ulmar", elements: [ELEMENTS.FIRE] },
  { key: "forge", proto: "byraeg", elements: [ELEMENTS.FIRE] },
  { key: "breath", proto: "aevor", elements: [ELEMENTS.AIR] },
  { key: "wind", proto: "suith", elements: [ELEMENTS.AIR] },
  { key: "storm", proto: "aekan", elements: [ELEMENTS.AIR] },
  { key: "sky", proto: "vion", elements: [ELEMENTS.AIR] },
  { key: "water", proto: "mirea", elements: [ELEMENTS.WATER] },
  { key: "river", proto: "gleno", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "ocean", proto: "thalor", elements: [ELEMENTS.WATER] },
  { key: "wave", proto: "ulai", elements: [ELEMENTS.WATER] },
  { key: "earth", proto: "mosil", elements: [ELEMENTS.EARTH] },
  { key: "stone", proto: "garon", elements: [ELEMENTS.EARTH] },
  { key: "mountain", proto: "dunag", elements: [ELEMENTS.EARTH] },
  { key: "void", proto: "ekhar", elements: [ELEMENTS.DARK] },

  // A. ELEMENTAL ROOTS (additional, refined)
  { key: "spark", proto: "scairen", elements: [ELEMENTS.FIRE] },
  { key: "blaze", proto: "bravel", elements: [ELEMENTS.FIRE] },
  { key: "coal", proto: "corun", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "radiance", proto: "radiel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "halo", proto: "aloro", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "aurora", proto: "auren", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "ash", proto: "askel", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "smoke", proto: "fumrel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "magma", proto: "magral", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "inferno", proto: "inferan", elements: [ELEMENTS.FIRE] },
  { key: "breeze", proto: "zevar", elements: [ELEMENTS.AIR] },
  { key: "gale", proto: "galven", elements: [ELEMENTS.AIR] },
  { key: "thunder", proto: "torval", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "lightning", proto: "fulmir", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "cloud", proto: "nuvar", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "tide", proto: "maros", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "spring_water", proto: "fonir", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "deep", proto: "proval", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "ore", proto: "minar", elements: [ELEMENTS.EARTH] },
  { key: "chasm", proto: "cairun", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },

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
    | ReturnType<typeof generateArchaicName>;

  // Try a few times to get something with 3 syllables or fewer
  for (let attempt = 0; attempt < 6; attempt++) {
    const roll = Math.random();

    if (roll < 0.05) {
      lastResult = generateArchaicName(options);
    } else if (roll < 0.4) {
      lastResult = generateCompoundName({
        dialect: options.dialect,
        type: options.type,
        elementA: options.elementA,
        elementB: options.elementB,
      });
    } else {
      lastResult = generateName({
        dialect: options.dialect,
        type: options.type,
        element: options.element,
      });
    }

          

  }

  // Fallback: if we never hit <= 3 syllables, just use the last one
  return lastResult!;
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

/** For each concept, pick a matching ProtoRoot (by key). Fallback: random root. */
function pickRootsForConcepts(concepts: string[]): ProtoRoot[] {
  const chosen: ProtoRoot[] = [];

  for (const concept of concepts) {
    const matches = PROTO_ROOTS.filter((r) => r.key === concept);
    if (matches.length) {
      chosen.push(randomChoice(matches));
    }
  }

  // If nothing matched, fall back to at least one random proto root
  if (!chosen.length) {
    chosen.push(randomChoice(PROTO_ROOTS));
  }

  return chosen;
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

  const concepts = extractConcepts(text);
  const semanticRoots = pickRootsForConcepts(concepts);
  const skeleton = makePhoneticSkeleton(text);
  const vowels = ["a", "e", "i", "o", "u"];

  // 1. Choose semantic base(s)
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
  length: NameLength
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

    for (let attempt = 0; attempt < 10; attempt++) {
      const nativeRoot = pickRootByElement(elementMain);
      const fusedProto = fuseUserAndNativeProto(userProto, nativeRoot.proto);

      const transformedRoot = transformRootForDialect(fusedProto, dialect);
      const pattern = randomChoice(AFFIX_PATTERNS[dialect].personal);

      // BASE NAME (no gender yet)
      let base = applyPattern(pattern, transformedRoot);
      base = cleanupForm(base, dialect);

      // remember last base for fallback
      lastBase = base;

      // run the syllable/shape check on the BASE name
      if (isCoolName(base, length)) {
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
  firstName: string
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
  const semanticRoots = pickRootsForConcepts(concepts);
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
  const raw = `${archetypeA} ${archetypeB}`.trim();
  const t = raw.toLowerCase();

  const element = pickElementFromText(raw);
  const dialect = pickDialectFromArchetypes(archetypeA, archetypeB);
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
      "the starlit courts of the highborn",
      "silver halls where songs never truly end",
      "moonlit terraces above the First City",
      "the silver courts of Aelyndar",
      "the star-vaulted libraries of Calith Rel",
      "the Dawnspire terraces above the clouds",
      "the argent bridges of Ilmoran",
      "the crystal sanctums of Vaelith",
      "the rune-etched sky towers of Elthamar",
      "the astral cloisters of Serelune",
      "the moon-crowned halls of Eldrinor"

    ],
    [DIALECTS.FOREST]: [
      "a deep greenwood few mortals have seen",
      "whispering groves older than most kingdoms",
      "the whispering groves of Thalanor",
      "the root-bridges of Verdantfen",
      "the feymarked glens of Amralae",
      "the bark-spiraled sanctuaries of Greenward",
      "the elderwood rings of Selyndar",
      "the firefly-haunted trails of Lorawyn",
      "the moss-draped stones of Briarhollow",
      "the thorn-circle villages of Wrenfell",
      "the moss-lit paths beneath ancient boughs",
    ],
    [DIALECTS.SEA]: [
      "the tide-sung coasts of the western sea",
      "storm-washed cliffs where gulls cry at dusk",
      "the tide-shattered reefs of Selukar",
      "the pearl harbors of Brinwaste",
      "the storm-chased piers of Marathruun",
      "the kelp-spire monasteries of Thressa",
      "the lighthouse coves of Vellumar",
      "the wave-carved caverns of Oshaline",
      "the drifting flotilla-cities of Seaspire",
      "the deep-song markets of Siralen",
      "pearled harbors and salt-slick docks",
    ],
    [DIALECTS.MOUNTAIN]: [
      "high mountain vales touched by snow",
      "stone-walled holds carved into the cliffs",
      "the obsidian ridges of Khar Mordain",
      "the sky-bitten peaks of Thuldren",
      "the anvil-sung forges of Brakor Hold",
      "the cliff-tier villages of Orevhan",
      "the frost-rimed caverns of Vallidrun",
      "the lightning-split plateaus of Markhul",
      "the iron-root warrens of Grundhammar",
      "the high summit watchfires of Tal Karum",
      "echoing halls beneath the watchful peaks",
    ],
    [DIALECTS.SHADOW]: [
      "the veiled borderlands between realms",
      "twilight roads where most fear to walk",
      "the dusk-veiled streets of Arvelshade",
      "the umbral monasteries of Keth Ruun",
      "the lantern-lit warrens of Sablemarch",
      "the omen pools of Grimhollow",
      "the echo-quiet tunnels of Virenfall",
      "the mask markets of Whispergate",
      "the threadbare scriptoriums of Nightwell",
      "the dream-fractured chambers of Morvaen",
      "starless groves that remember every footstep",
    ],
  };

  const fallbackPlaces = [
    "forgotten border-villages",
    "roads where few linger long",
    "old realms that have slipped from the maps",
  ];

  const places = placesByDialect[dialect] ?? fallbackPlaces;
  const place = randomItem(places);

  // Element-flavored motifs
  const elementMotifs: string[] =
    element === ELEMENTS.FIRE || hasConcept("fire") || hasConcept("flame")
      ? [
          "villages reduced to embers",
          "flamebound oaths that still sting",
          "smoke rising from places they once called home",
          "ember-veined scars",
          "ritual ash markings",
          "a forged-in-battle temper",
          "sun-touched eyes that glow when angered",
          "the scent of smoke that follows them",
          "volatile courage bordering on recklessness",
          "memories of a pyre that changed their fate",
          "an inner heat that whispers ancient names",
          "red horizons that never fully faded from memory",
        ]
      : element === ELEMENTS.WATER || hasConcept("ocean") || hasConcept("river")
      ? [
          "tidelocked secrets and drowned prayers",
          "names carried away by the river",
          "storms that never quite reach shore",
          "tidal moods that shift with the moon",
          "whisper-smooth footsteps like lapping waves",
          "sea-salt intuition guiding their decisions",
          "storm-born resilience hardened by loss",
          "a habit of drifting into deep thought",
          "the calm of a still lake before violence",
          "a connection to drowned secrets",
          "hearing patterns in rain others cannot",
          "waves that sound, to them, like someone calling for help",
        ]
      : element === ELEMENTS.EARTH ||
        hasConcept("forest") ||
        hasConcept("mountain")
      ? [
          "roots torn from sacred soil",
          "fallen groves and broken standing-stones",
          "slopes choked with abandoned shrines",
          "stone-quiet patience",
          "hands calloused from ancient crafts",
          "a voice like steady granite",
          "unshakable loyalty once earned",
          "the steadiness of rooted trees",
          "a deep memory for old wrongs",
          "echoing heartbeats in vault-like calm",
          "the sense of mountains watching nearby",
          "soil that remembers every footstep",
        ]
      : element === ELEMENTS.AIR || hasConcept("wind") || hasConcept("storm")
      ? [
          "promises scattered on the wind",
          "storms that answered when no one else would",
          "sky-sent omens they can no longer ignore",
          "a restless pull to distant horizons",
          "wind-light footsteps",
          "thoughts that race like storm gusts",
          "the urge to intervene before others act",
          "the ability to vanish into open spaces",
          "voices carrying farther than they should",
          "an uncanny talent for reading omens",
          "a past spent chasing something unseen",
          "winds that still carry the smell of that night",
        ]
      : element === ELEMENTS.DARK || hasConcept("night") || hasConcept("void")
      ? [
          "moonless nights and unquiet graves",
          "whispers from things that do not breathe",
          "shadows that know their true name",
          "shadow-stitched whispers",
          "eyes that linger too long on the unknown",
          "soft footfalls learned from necessity",
          "secrets kept even from themselves",
          "strange comfort in silence",
          "a gift for unraveling lies",
          "a past that refuses to stay buried",
          "faint traces of forgotten curses",
          "starless skies that feel like a held breath",
        ]
      : [
          "half-remembered songs",
          "long roads behind them and longer still ahead",
          "memories they turn over like worn coins",
          "quiet evenings when the past feels almost kind",
        ];

  const elementMotif = randomItem(elementMotifs);

  // Role-flavored titles
  const roleTitles: Record<string, string[]> = {
    warrior: [
      "blade-warden",
      "oathbound knight",
      "spear-singer",
      "shield-bearer of the old wars",
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
      "scar-marked veteran in all but years",
    ],
    hunter: [
      "shadow-tracker",
      "warden of hidden paths",
      "waywatcher of the wild",
      "arrow-kin of the deep woods",
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
      "scout who rarely misses a trail",
    ],
    seer: [
      "dreambound oracle",
      "reader of star-scattered omens",
      "veil-touched seer",
      "keeper of moonlit prophecies",
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
      "reluctant witness to too many futures",
    ],
    healer: [
      "leaf-mender",
      "keeper of gentle hands",
      "herb-wise wanderer",
      "soul-stitcher of broken warriors",
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
      "tireless watcher at bedside and battlefield both",
    ],
    bard: [
      "songweaver",
      "bearer of old tales",
      "harp-kin with a restless tongue",
      "keeper of the unsung verses",
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
      "wandering collector of last words",
    ],
    shadow: [
      "veil-dancer",
      "knife in the dusk",
      "stepper-between light and dark",
      "quiet hand that ends quarrels",
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
      "ghost that never quite left the living world",
    ],
    noble: [
      "scion of a fading house",
      "heir to moonlit titles",
      "child of a court that has lost its shine",
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
      "last bright ember of a nearly-cold line",
    ],
    smith: [
      "forge-singer",
      "binder of steel and starfire",
      "artisan whose work outlives empires",
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
      "keeper of embers that never seem to die",
    ],
    wanderer: [
      "road-worn pilgrim",
      "restless wayfarer",
      "stranger at a hundred hearths",
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
      "traveler who never quite arrives",
    ],
  };

  const titles = roleTitles[role] ?? roleTitles["wanderer"];
  const title = randomItem(titles);

  // --- Element-based origins (what happened) ---
  const originFire = [
    `${name} watched their first home vanish into ${elementMotif}, the screams of kin buried under crackling beams.`,
    `As a child, ${name} woke to smoke and steel; by dawn, only embers and silence remained where a village once stood.`,
    `The night the sky turned red, ${name} learned how quickly a lifetime of plans can burn away.`,
    "survived the burning of their childhood enclave, swearing never again to flee flames",
    "trained under a pyromancer militia that treated fire as both teacher and punishment",
    "lost someone dear to wildfire and has followed smoke-omens ever since",
    "was chosen by a phoenix-order after an ember refused to burn their hand",
    "carries the memory of a battle fought under a blazing red sky",
    "once tended sacred forge-fires that whispered forgotten names"

  ];

  const originForest = [
    `${name} once walked a living grove now cut down for war-timber; every fallen tree still haunts their dreams.`,
    `Hunters and loggers shattered the sacred wood that raised ${name}, leaving only stumps and ghost-birds behind.`,
    "was raised by wardens who spoke with treants in the Old Tongue",
    "learned archery by moonlight among ancient roots older than cities",
    "helped defend a grove where spirits awaken each spring",
    "followed a white stag deep into forbidden trees and returned changed",
    "was named by a chorus of dryads during a solstice rite",
    "once held vigil in silence for seven days to honor a fallen grove-guardian",
    `They remember listening to leaves whisper of peace the very day axes first bit into the oldest trunks.`,
  ];

  const originSea = [
    `${name} waited on the shore for a ship that never returned, its sails swallowed by a storm with no name.`,
    `A midnight squall took both kin and captain; ${name} still hears the drowning in every heavy rain.`,
    "was saved from drowning by a tide spirit who demanded a future favor",
    "grew up among shipwreck salvagers who treated storms as omens",
    "learned to read the currents like scripture",
    "heard a leviathan’s distant call as a child and still dreams of it",
    "escaped raiders across moonlit waters that forever altered them",
    "served as lookout on a drifting city-barge where secrets traded like coin",
    `The sea once gave them everything they loved, and then—in one crooked wave—took it all back.`,
  ];

  const originShadow = [
    `${name} survived a massacre no one else recalls, as if the world itself chose to forget.`,
    `One night the lanterns all went out; by morning, only ${name} remained to name the dead.`,
    "was raised in halls where names are traded like secrets",
    "survived by navigating crime-guild webs with quiet brilliance",
    "was tutored by a masked stranger who vanished after one final lesson",
    "bonded with a shadow creature during a moment of desperation",
    "once lived in a city where the sun rarely rose, shaping their instincts",
    "helped expose a conspiracy only to be hunted by its remnants",
    `They were the child hiding under the table when the knives came out, learning how quiet survival can be.`,
  ];

  const originGeneric = [
    `${name} left a small village behind after a single night of blood and fire no bard will sing of.`,
    `Once, ${name} belonged to a quiet place with simple lives; now they carry only memories and scars.`,
    "was the sole survivor of a razed caravan, found wandering ash-roads",
    "trained beside mercenaries who valued coin and camaraderie equally",
    "was mentored by a wandering hero who died before passing on their final teaching",
    "earned early renown after defending their home from monstrous threats",
    "grew up in a nomadic troupe that traveled from realm to realm exchanging stories",
    "lost their homeland to political strife and has walked the world ever since",
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

  // --- Role-specific origin flavor (how it hit *them*, not just the place) ---
  const roleOrigin: Record<string, string[]> = {
    warrior: [
      `As a half-trained warrior, ${name} learned that drills in the yard could never prepare them for real screams.`,
      "fought in border skirmishes before they were old enough to swear oaths",
      "trained under a merciless swordmaster known only as 'the Gale'",
      "defended a sacred landmark until reinforcements arrived days too late",
      "earned their first scar in a duel meant to be ceremonial",
      "left a warband after refusing to carry out an unjust order",
      `They were meant to stand in the shield-wall that day, but the wall never formed and the lesson never left them.`,
    ],
    hunter: [
      `While tracking deer beyond the village bounds, ${name} saw the first smoke rising and ran until their lungs burned.`,
      "tracked a nightmare beast across three territories before landing the final shot",
      "learned patience by shadowing prey for weeks without loosing an arrow",
      "once freed a village plagued by unseen nocturnal creatures",
      "bonded with a loyal animal companion after saving it from poachers",
      "spent years mapping migratory paths of dangerous forest spirits",
      `They returned from the wilds with fresh game and found only ruin, learning to read tracks too late to matter.`,
    ],
    seer: [
      `${name} saw it all in a vision that no one believed; the guilt of being right still keeps them from easy sleep.`,
      "received visions after nearly drowning in a sacred scrying pool",
      "became an apprentice oracle when a prophecy spoke their name",
      "helped avert a minor catastrophe—at great personal cost",
      "once foresaw their own failure and has feared that day since",
      "was raised in a temple where dreams were considered holy scripture",
      `Their first true prophecy was not celebrated—it was ignored, and by morning the fire had proved them right.`,
    ],
    healer: [
      `${name} learned the limits of healing on a night when there were far more wounds than hands.`,
      "nursed plague victims during a winter that claimed most of their mentors",
      "studied healing arts under a spirit-bound monk",
      "learned to mend wounds created by unnatural forces",
      "failed to save someone dear and now overcompensates with zeal",
      "was chosen as keeper of a relic herb garden tended for centuries",
      `They still remember every face they could not save, a ledger of ghosts that shapes every choice.`,
    ],
    bard: [
      `Of all who lived there, ${name} remembers the details most clearly; the story will not leave them alone.`,
      "studied under a retired adventurer who taught through story and duel",
      "once performed a ballad so powerful it calmed a riot",
      "traveled with a troupe that vanished under mysterious circumstances",
      "wove magic into lullabies long before realizing they were spells",
      "collected forbidden verses that reveal dangerous truths",
      `They tried to sing over the sound of the flames and failed, and have been chasing the right song ever since.`,
    ],
    shadow: [
      `${name} survived by staying very small and very quiet in a dark corner, a talent that never quite left them.`,
      "grew up pulling cons to feed siblings before graduating to espionage",
      "escaped a guild that tattoos failures onto its agents",
      "learned stealth in a monastery that worshipped silence",
      "once stole an artifact only to return it out of guilt",
      "survived betrayal by their closest partner",
      `They know some doors opened for the killers from the inside, and they will always wonder whose hand turned the latch.`,
    ],
    noble: [
      `Courtiers argued while the danger grew; ${name} learned that titles mean little when the walls finally fall.`,
      "was groomed for leadership but rejected the cold politics",
      "led a diplomatic envoy that nearly sparked war",
      "uncovered corruption within their own lineage",
      "studied ancient court combat forms out of defiance",
      "was exiled after a succession dispute turned violent",
      `They escaped down a servant’s passage while heralds and banners burned, carrying a house-name that now tastes like ash.`,
    ],
    smith: [
      `The forge where ${name} first learned their craft cracked in the heat of that night and never burned again.`,
      "learned metallurgy from a master who crafted weapons for demigods",
      "accidentally created a minor magical construct that follows them still",
      "forged their first blade under a meteor shower",
      "studied runes after discovering a half-finished golem",
      "witnessed their village's forge collapse during an arcane malfunction",
      `They still carry a warped blade from the ruins of their old workshop, a reminder that steel fails too.`,
    ],
    wanderer: [
      `${name} had just left home when it fell, learning that wandering does not always mean you chose to leave.`,
      "followed a vision that led them far from home",
      "found a relic map showing impossible places",
      "was taken in by nomads who taught the value of open paths",
      "escaped captivity and never remained in one place again",
      "swore to walk until they understood their recurring dreams",
      `A single night on the road spared them; every step since has felt like borrowed time.`,
    ],
  };

  const roleOriginPool =
    roleOrigin[role] ?? roleOrigin["wanderer"];
  const roleOriginLine = randomItem(roleOriginPool);

  // Blend base + role origin with a bit of randomness
  const origin =
    Math.random() < 0.6
      ? `${baseOrigin} ${roleOriginLine}`
      : randomItem([baseOrigin, roleOriginLine]);

  // --- Goals / present drive ---
  const revengeGoals = [
    `Now they trace old scars across the map, hunting those who lit the first flame.`,
    `Every road they walk bends, sooner or later, toward the ones who started it all.`,
    "to hunt the foe who razed their home",
    "to dismantle the bandit network that stole their family",
    "to bring judgment upon a corrupt noble who betrayed them",
    "to avenge a mentor slain by dark forces",
    "to expose and destroy a conspiracy years in the making",
    "to reclaim an artifact stolen by treachery",
    `They speak little of that night, but the way their hand tightens on the hilt says enough.`,
  ];

  const dutyGoals = [
    `Now they serve as a ${title}, determined that no one else will lose what they once did.`,
    `They stand between danger and the next village, paying forward a protection they never had.`,
    "to uphold vows sworn before witnesses living and dead",
    "to escort a fragile peace treaty across dangerous lands",
    "to guard someone whose importance they don’t yet understand",
    "to restore an order shattered by internal conflict",
    "to serve a community that once sheltered them",
    "to retrieve sacred knowledge lost to time",
    `Duty keeps their feet moving, even when their heart longs to rest beneath familiar trees.`,
  ];

  const redemptionGoals = [
    `Now they walk the long road of atonement, certain that some part of that ruin was their fault.`,
    `They take the hardest tasks without complaint, as if each might erase a fraction of the past.`,
    "to atone for a past failure that cost innocent lives",
    "to undo harm caused by their own misjudgment",
    "to restore honor stripped unjustly—or justly",
    "to repair a relationship they shattered",
    "to cleanse a cursed bloodline",
    "to prove they are more than their reputation",
    `Every kindness they offer is a stone laid on a path they hope leads back to themselves.`,
  ];

  const curiosityGoals = [
    `Now they chase rumors and half-truths, trying to understand why fate chose them to survive.`,
    `They travel with questions sharper than any blade, seeking the pattern beneath all this loss.`,
    "to uncover the truth behind an ancient myth",
    "to map uncharted lands whispered of by elders",
    "to understand a strange power that awakened within them",
    "to solve a riddle that has obsessed them for years",
    "to study forgotten ruins that call to their dreams",
    "to learn why they alone can see certain omens",
    `Every new land is another chance to learn what the old songs were trying to warn them about.`,
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

  // --- Relationship hooks: siblings, mentors, companions ---
  const siblingHooks: string[] = [
    `An older sibling once stood between ${name} and the flames; ${name} has been trying to live up to that courage ever since.`,
    `A younger sibling was lost that night, and every cause ${name} takes up is secretly for them.`,
    "a sibling they must rescue from a dangerous cult",
    "a brother lost during a raid, believed dead—but perhaps alive",
    "a sister who resents their choices, despite loving them dearly",
    "a twin whose fate diverged sharply from their own",
    "a sibling who became a villain’s lieutenant",
    "a younger kin who idolizes them and follows recklessly",
    `${name} still wears a token from a sibling left behind, a promise that this road will mean something.`,
  ];

  const mentorHooks: string[] = [
    `A wandering mentor found ${name} in the aftermath and taught them how to stand again, then vanished on a quest that never returned.`,
    `${name} learned blade, spell, and patience from a teacher whose lessons still echo in every choice they make.`,
    "a mentor who vanished after uttering one final warning",
    "a teacher who turned traitor for reasons unknown",
    "a guardian who died protecting them from a shadowy group",
    "a master whose unfinished lessons still guide them",
    "a retired adventurer who entrusted them with a dangerous relic",
    "a mystic who foresaw their destiny but refused to explain it",
    `Somewhere out there, the one who trained ${name} is still missing; every tavern and temple might hold the next clue.`,
  ];

  const companionHooks: string[] = [
    `They travel better in company than alone, clinging to the hope that this time they can keep others alive.`,
    `Companions walk at their side now; ${name} watches them with the wary fondness of someone who knows how quickly a table can go empty.`,
    "a loyal companion lost under mysterious circumstances",
    "a former traveling partner they parted with on bad terms",
    "a childhood friend who now walks a darker path",
    "a lover sworn to return but long overdue",
    "a comrade imprisoned for a crime they didn’t commit",
    "a rival adventurer who pushes them to improve",
    `Around the fire, ${name} listens more than they speak, quietly measuring which of these new friends they cannot bear to lose.`,
  ];

  let relationshipPool: string[];

  if (tone === "shadowed") {
    relationshipPool =
      Math.random() < 0.5 ? siblingHooks : mentorHooks;
  } else if (tone === "bright") {
    relationshipPool =
      Math.random() < 0.5 ? mentorHooks : companionHooks;
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

  if (roll < 0.2) {
    // Shorter: opening + relationship (good for quick scanning)
    return `${opening} ${relationship}`;
  } else if (roll < 0.4) {
    // Tagline-ish: origin only (compact backstory)
    return origin;
  } else if (roll < 0.6) {
    // Origin + goal (very PC-hooky)
    return `${origin} ${goal}`;
  } else {
    // Full mini-arc
    return `${opening} ${origin} ${goal} ${relationship}`;
  }
}


/* ===========================
   UI COMPONENT
   =========================== */

export default function Home() {
  const [archetypeA, setArchetypeA] = useState("");
  const [archetypeB, setArchetypeB] = useState("");

  const [gender, setGender] = useState<Gender>("neutral");
  const [nameLength, setNameLength] = useState<NameLength>("medium");

  const [isPremium, setIsPremium] = useState(false);
  const [includeLore, setIncludeLore] = useState(true);
  const [count, setCount] = useState(5);

  const [results, setResults] = useState<GeneratedEntry[]>([]);

  const effectiveMax = isPremium ? 50 : 5;

  function generateNames() {
    // Guard against NaN / weird count values
    const safeCount = Number.isFinite(count) && count > 0 ? count : 1;
    const cappedCount = Math.min(safeCount, effectiveMax);

    const output: GeneratedEntry[] = [];

    for (let i = 0; i < cappedCount; i++) {
      // First name: full pipeline incl. gender + length
      const first = makeFantasyName(
        archetypeA,
        archetypeB,
        gender,
        nameLength
      );

      // Surname: complements first name, no gender
      const last = makeSurname(archetypeA, archetypeB, first);
      const fullName = `${first} ${last}`;

      output.push({
        name: fullName,
        lore:
          isPremium && includeLore
            ? makeLore(fullName, archetypeA, archetypeB)
            : undefined,
      });
    }

    setResults(output);
  }

  return (
    <main className="min-h-screen p-6 md:p-10 bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Elven Name Generator
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Mix two archetypes to generate evocative Elven names with Tolkien-inspired flair. 
            Free mode gives you quick lists; Premium mode unlocks bulk names and mini-lore.
          </p>
        </header>

        {/* Mode Toggle */}
        <section className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="font-semibold text-lg">Mode</h2>
            <p className="text-sm text-gray-300">
              Free: up to 5 names, no lore. Premium: up to 50 names + optional
              lore.
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

            {isPremium && (
              <div className="flex items-center gap-2">
                <input
                  id="includeLore"
                  type="checkbox"
                  checked={includeLore}
                  onChange={(e) => setIncludeLore(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="includeLore" className="text-sm">
                  Include 1–2 sentence micro-lore for each name
                </label>
              </div>
            )}
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
            <h2 className="text-xl font-bold">Results</h2>
            <ul className="space-y-3">
              {results.map((entry, i) => (
                <li
                  key={i}
                  className="bg-gray-900 border border-gray-700 p-3 rounded-lg"
                >
                  <div className="font-semibold text-lg">{entry.name}</div>
                  {entry.lore && (
                    <p className="text-sm text-gray-300 mt-1">{entry.lore}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
