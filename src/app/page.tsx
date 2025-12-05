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
  // A. ELEMENTAL ROOTS (original 20)
  { key: "fire", proto: "pyran", elements: [ELEMENTS.FIRE] },
  { key: "flame", proto: "sirla", elements: [ELEMENTS.FIRE] },
  { key: "ember", proto: "kaleth", elements: [ELEMENTS.FIRE] },
  { key: "light", proto: "alir", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "star", proto: "selun", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "sun", proto: "tavos", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "heat", proto: "ulmar", elements: [ELEMENTS.FIRE] },
  { key: "forge", proto: "braeg", elements: [ELEMENTS.FIRE] },
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

  // A. ELEMENTAL ROOTS (additional)
  { key: "spark", proto: "scairn", elements: [ELEMENTS.FIRE] },
  { key: "blaze", proto: "bravon", elements: [ELEMENTS.FIRE] },
  { key: "coal", proto: "carun", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "radiance", proto: "radiel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "halo", proto: "aloro", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "aurora", proto: "auren", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "ash", proto: "askel", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "smoke", proto: "fumrel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "magma", proto: "magral", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "inferno", proto: "inferes", elements: [ELEMENTS.FIRE] },
  { key: "breeze", proto: "zevar", elements: [ELEMENTS.AIR] },
  { key: "gale", proto: "galven", elements: [ELEMENTS.AIR] },
  { key: "thunder", proto: "torval", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "lightning", proto: "fulmir", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "cloud", proto: "nuvol", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "tide", proto: "maros", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "spring_water", proto: "fonrel", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "deep", proto: "profir", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "ore", proto: "minar", elements: [ELEMENTS.EARTH] },
  { key: "chasm", proto: "cairun", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },

  // B. NATURE & LANDSCAPE (original 20)
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

  // B. NATURE & LANDSCAPE (additional)
  { key: "grove", proto: "nemeth", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "thicket", proto: "druval", elements: [ELEMENTS.EARTH] },
  { key: "hill", proto: "brigan", elements: [ELEMENTS.EARTH] },
  { key: "plain", proto: "campor", elements: [ELEMENTS.EARTH] },
  { key: "marsh", proto: "palun", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "fen", proto: "muireth", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "shore", proto: "lanor", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "island", proto: "insulae", elements: [ELEMENTS.WATER] },
  { key: "reed", proto: "cairith", elements: [ELEMENTS.WATER, ELEMENTS.EARTH] },
  { key: "field", proto: "pratel", elements: [ELEMENTS.EARTH] },
  { key: "grottos", proto: "grothal", elements: [ELEMENTS.EARTH, ELEMENTS.DARK] },
  { key: "ridge", proto: "carnon", elements: [ELEMENTS.EARTH] },
  { key: "glade", proto: "lareth", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "sunset", proto: "tramur", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "starlight", proto: "stelair", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "eclipse", proto: "eclyr", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "horizon", proto: "orivon", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "glen", proto: "glennir", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "harbor", proto: "porthae", elements: [ELEMENTS.WATER] },
  { key: "crag", proto: "skarn", elements: [ELEMENTS.EARTH] },

  // C. MOTION / DANCE (original 20)
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

  // C. MOTION / DANCE (additional)
  { key: "tread", proto: "passil", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "stride", proto: "gradel", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "charge", proto: "ravan", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "rush", proto: "briven", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "turn", proto: "voltir", elements: [ELEMENTS.AIR] },
  { key: "spin_fast", proto: "spiron", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "dance", proto: "cairia", elements: [ELEMENTS.AIR] },
  { key: "weave", proto: "tramar", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "glimmer", proto: "glisar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "surge", proto: "onval", elements: [ELEMENTS.WATER, ELEMENTS.FIRE] },
  { key: "flow_slow", proto: "lentar", elements: [ELEMENTS.WATER] },
  { key: "rush_water", proto: "torrenth", elements: [ELEMENTS.WATER] },
  { key: "hover", proto: "sosair", elements: [ELEMENTS.AIR] },
  { key: "crawl", proto: "tarthun", elements: [ELEMENTS.EARTH] },
  { key: "slide", proto: "scalun", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "coil", proto: "corvim", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "flare", proto: "fiora", elements: [ELEMENTS.FIRE] },
  { key: "quiver", proto: "tremel", elements: [ELEMENTS.AIR] },
  { key: "waltz", proto: "valsera", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "rush_wind", proto: "galvorn", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },

  // D. EMOTION & SPIRIT (original 20)
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
  { key: "oath", proto: "brekan", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "fate", proto: "miron", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "secret", proto: "kephal", elements: [ELEMENTS.DARK] },
  { key: "will", proto: "adanir", elements: [ELEMENTS.FIRE] },

  // D. EMOTION & SPIRIT (additional)
  { key: "mercy", proto: "clementh", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "wrath", proto: "furion", elements: [ELEMENTS.FIRE] },
  { key: "serenity", proto: "paciel", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "wonder", proto: "mirava", elements: [ELEMENTS.AIR] },
  { key: "despair", proto: "tristal", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "faith", proto: "credun", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "devotion", proto: "devorae", elements: [ELEMENTS.FIRE, ELEMENTS.WATER] },
  { key: "vengeance", proto: "vendrak", elements: [ELEMENTS.FIRE, ELEMENTS.DARK] },
  { key: "envy", proto: "invidar", elements: [ELEMENTS.DARK] },
  { key: "pride", proto: "superon", elements: [ELEMENTS.FIRE] },
  { key: "pity", proto: "miserel", elements: [ELEMENTS.WATER] },
  { key: "calm", proto: "placir", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "zeal", proto: "ardun", elements: [ELEMENTS.FIRE] },
  { key: "awe", proto: "stuphel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "melancholy", proto: "dolvar", elements: [ELEMENTS.DARK, ELEMENTS.WATER] },
  { key: "devotion_spirit", proto: "anamar", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "spite", proto: "acrar", elements: [ELEMENTS.DARK] },
  { key: "tranquility", proto: "quiesan", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "resolve", proto: "fermir", elements: [ELEMENTS.EARTH, ELEMENTS.FIRE] },
  { key: "inspiration", proto: "spiriel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },

  // E. ANIMALS & CREATURES (original 20)
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

  // E. ANIMALS & CREATURES (additional)
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
  { key: "kraken", proto: "craken", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "wyrm", proto: "wyrhal", elements: [ELEMENTS.FIRE, ELEMENTS.DARK] },

  // F. CRAFT / ROLE / CULTURE (original 20)
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

  // F. CRAFT / ROLE / CULTURE (additional)
  { key: "bard", proto: "bardel", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "poet", proto: "versan", elements: [ELEMENTS.AIR] },
  { key: "scribe", proto: "scrivan", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "captain", proto: "caprel", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "lord", proto: "domnar", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "lady", proto: "domena", elements: [ELEMENTS.AIR, ELEMENTS.WATER] },
  { key: "herbalist", proto: "erbalon", elements: [ELEMENTS.EARTH, ELEMENTS.WATER] },
  { key: "mage", proto: "magiel", elements: [ELEMENTS.FIRE, ELEMENTS.AIR] },
  { key: "archer", proto: "sagrit", elements: [ELEMENTS.AIR] },
  { key: "monk", proto: "moniar", elements: [ELEMENTS.AIR, ELEMENTS.EARTH] },
  { key: "pilgrim", proto: "viatrel", elements: [ELEMENTS.AIR] },
  { key: "champion", proto: "campion", elements: [ELEMENTS.FIRE, ELEMENTS.EARTH] },
  { key: "chieftain", proto: "capthar", elements: [ELEMENTS.EARTH, ELEMENTS.AIR] },
  { key: "oracle", proto: "oracel", elements: [ELEMENTS.WATER, ELEMENTS.DARK] },
  { key: "spy", proto: "ocultar", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "thief", proto: "latron", elements: [ELEMENTS.DARK, ELEMENTS.AIR] },
  { key: "smith_arcane", proto: "runakor", elements: [ELEMENTS.FIRE, ELEMENTS.DARK] },
  { key: "sail_master", proto: "velonar", elements: [ELEMENTS.WATER, ELEMENTS.AIR] },
  { key: "bannerbearer", proto: "vexilar", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
  { key: "duelist", proto: "duellar", elements: [ELEMENTS.AIR, ELEMENTS.FIRE] },
];


const AFFIX_PATTERNS: Record<
  Dialect,
  { personal: string[]; place: string[]; clan: string[] }
> = {
  [DIALECTS.HIGH]: {
    personal: [
      "{root}ia", "{root}ea", "{root}iel", "{root}ion", "Ael{root}", "El{root}ar",
      "{root}ielin", "{root}aris", "{root}oriel", "{root}enna", "{root}avon",
      "Il{root}ien", "Aer{root}", "{root}alith"
    ],
    place: [
      "{root}ara", "{root}orë", "{root}ilion", "{root}arë",
      "{root}annon", "{root}ellor", "Tor{root}ien", "{root}amarë"
    ],
    clan: [
      "An{root}", "Tel{root}", "{root}ain", "Calen{root}",
      "Mir{root}", "Vor{root}el", "Luth{root}", "Athan{root}"
    ],
  },

  [DIALECTS.FOREST]: {
    personal: [
      "{root}an", "{root}eth", "{root}ose", "{root}ach",
      "{root}en", "{root}uin", "{root}ren", "{root}olas",
      "Fen{root}", "Gwyn{root}", "{root}aroch", "{root}adhel"
    ],
    place: [
      "{root}thir", "{root}ron", "{root}dun",
      "{root}gwyn", "{root}breth", "{root}lanor", "Dru{root}il"
    ],
    clan: [
      "Mac{root}", "Ui{root}", "{root}dhel", "Cen{root}",
      "Bro{root}ach", "Sil{root}", "Or{root}gwyn"
    ],
  },

  [DIALECTS.SEA]: {
    personal: [
      "{root}ae", "{root}ao", "{root}uin", "{root}ia",
      "{root}oar", "{root}elli", "{root}avae", "Sir{root}",
      "{root}alun", "{root}eirion", "Aro{root}", "{root}ionae"
    ],
    place: [
      "{root}aë", "{root}oae", "{root}eluin", "{root}orae",
      "{root}thalos", "{root}mareth", "Pel{root}ae", "{root}olin"
    ],
    clan: [
      "Sel{root}", "Mar{root}ae", "Pel{root}uin",
      "Lor{root}", "Aen{root}or", "Thal{root}un"
    ],
  },

  [DIALECTS.MOUNTAIN]: {
    personal: [
      "{root}lak", "{root}in", "{root}ol", "{root}grin",
      "{root}rak", "{root}dorn", "{root}gar", "{root}vorn",
      "Kar{root}in", "Bal{root}", "{root}gran", "{root}kul"
    ],
    place: [
      "{root}kaj", "{root}drum", "{root}gowyn", "{root}dûm",
      "{root}korin", "{root}grum", "Dur{root}ak", "{root}thol"
    ],
    clan: [
      "Kar{root}", "Dur{root}un", "Khaz{root}",
      "Bram{root}", "Thur{root}", "Gor{root}un"
    ],
  },

  [DIALECTS.SHADOW]: {
    personal: [
      "{root}úth", "{root}ghal", "{root}shai", "{root}than",
      "{root}mur", "{root}ghel", "{root}aun", "{root}vyr",
      "Mor{root}in", "Vel{root}", "{root}druin", "{root}zael"
    ],
    place: [
      "{root}gúl", "{root}daen", "{root}naúl", "{root}dûn",
      "{root}morth", "{root}ighor", "{root}ulmar", "Dra{root}un"
    ],
    clan: [
      "Moth{root}", "Dhul{root}", "Ghul{root}",
      "Vor{root}", "Nal{root}un", "Ar{root}ghul"
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

    const syllables = syllableCount(lastResult.name.toLowerCase());
    if (syllables <= 3) {
      return lastResult;
    }
  }

  // Fallback: if we never hit <= 3 syllables, just use the last one
  return lastResult!;
}


/* --- Mapping Archetype A/B → Dialect + Elements --- */

function pickElementFromText(text: string): Element | null {
  const t = text.toLowerCase();

  if (/(fire|flame|ember|sun|lava|ash|phoenix|forge)/.test(t)) {
    return ELEMENTS.FIRE;
  }
  if (/(water|sea|ocean|river|tide|wave|mist|rain|ice|frost)/.test(t)) {
    return ELEMENTS.WATER;
  }
  if (/(earth|stone|mountain|forest|tree|wood|root|soil)/.test(t)) {
    return ELEMENTS.EARTH;
  }
  if (/(air|wind|storm|sky|cloud|lightning|stormborn)/.test(t)) {
    return ELEMENTS.AIR;
  }
  if (/(shadow|dark|night|void|moon|death|ghost|nether)/.test(t)) {
    return ELEMENTS.DARK;
  }

  return null;
}

function pickDialectFromArchetypes(a: string, b: string): Dialect {
  const t = `${a} ${b}`.toLowerCase();

  if (/(elf|high|noble|star|sun|light|angel|court)/.test(t)) {
    return DIALECTS.HIGH;
  }
  if (/(forest|wood|druid|ranger|grove|leaf|wild)/.test(t)) {
    return DIALECTS.FOREST;
  }
  if (/(sea|ocean|tide|wave|siren|sailor|coast|harbor)/.test(t)) {
    return DIALECTS.SEA;
  }
  if (/(mountain|stone|dwarf|mine|cavern|peak)/.test(t)) {
    return DIALECTS.MOUNTAIN;
  }
  if (/(shadow|dark|night|void|assassin|ghost|nether|grave)/.test(t)) {
    return DIALECTS.SHADOW;
  }

  // Fallback: random dialect
  return randomChoice([
    DIALECTS.HIGH,
    DIALECTS.FOREST,
    DIALECTS.SEA,
    DIALECTS.MOUNTAIN,
    DIALECTS.SHADOW,
  ]);
}
function applyGenderToName(name: string, gender: Gender): string {
  if (gender === "neutral") return name;

  let s = name.toLowerCase();

  if (gender === "male") {
    // masculine: consonant / -on / -or / -ion / -ar
    const maleEnding = randomChoice(["os", "ur", "ion", "ar", "ad", "eth", "en", "or"]);
    // strip trailing vowels and add ending
    s = s.replace(/[aeiouáéíóú]+$/i, "") + maleEnding;
  } else if (gender === "female") {
    // feminine: -a, -ia, -iel, -wen
    const femaleEnding = randomChoice(["a", "ia", "iel", "ys", "ven", "Ine", "airs", "ira", "eya"]);
    if (/[bcdfghjklmnpqrstvwxyz]$/i.test(s)) {
      // ends in consonant → just append
      s = s + femaleEnding;
    } else {
      // ends in vowel → trim vowel run then add ending
      s = s.replace(/[aeiouáéíóú]+$/i, "") + femaleEnding;
    }
  }

  // Re-capitalize first letter
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * This replaces your old makeFantasyName, using the full language engine.
 * Archetype A/B influence element + dialect.
 */
function clampNameLength(name: string, maxLen = 10): string {
  if (name.length <= maxLen) return name;
  return name.slice(0, maxLen);
}
// Global name length constraints
const MAX_SYLLABLES = 4; // Vir-ien-i-on style upper bound on "sound units"
const MAX_CHARS = 10;    // Hard cap on total characters

function makeFantasyName(
  archetypeA: string,
  archetypeB: string,
  gender: Gender
): string {

  // (1) Combine archetypes to decide dialect + element
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

  let lastGendered = "";

  // -------------------------------------------------------------
  // (2) BEGIN REROLL LOOP — tries up to 10 times to get a valid name
  // -------------------------------------------------------------
  for (let attempt = 0; attempt < 10; attempt++) {

    // (2a) Generate a base name from the language engine
    const result = generateVariedName({
      dialect,
      type: "personal",
      element: elementMain,
      elementA,
      elementB,
    });

    // (2b) Apply gender endings at the end of the name
    const gendered = applyGenderToName(result.name, gender);

    // (2c) Save the last generated name in case we need a fallback
    lastGendered = gendered;

    // -------------------------------------------------------------
    // (3) CHECK SYLLABLE + CHARACTER LIMITS
    // -------------------------------------------------------------
    const syllables = syllableCount(gendered.toLowerCase());
    const chars = gendered.length;

    // -------------------------------------------------------------
    // (4) THIS IS THE ACCEPTANCE CONDITION:
    //     If BOTH limits are satisfied, return the name immediately
    // -------------------------------------------------------------
    if (syllables <= MAX_SYLLABLES && chars <= MAX_CHARS) {
      return gendered;
    }

    // If not accepted, the loop continues → the name is RE-ROLLED
  }

  // -------------------------------------------------------------
  // (5) FALLBACK:
  //     If all 10 attempts failed, clamp the last generated name
  // -------------------------------------------------------------
  return clampNameLength(lastGendered, MAX_CHARS);
}



/* ===========================
   LORE STUB (unchanged, but you can extend later)
   =========================== */

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeLore(name: string, a: string, b: string): string {
  const arcA = a || "mysterious";
  const arcB = b || "forgotten";

  const templates = [
    `${name} is a ${arcA.toLowerCase()} soul tied to ${arcB.toLowerCase()} powers.`,
    `${name} once served as a ${arcA.toLowerCase()}, but carries a trace of ${arcB.toLowerCase()} destiny.`,
    `Legends say ${name} walks the line between ${arcA.toLowerCase()} honor and ${arcB.toLowerCase()} chaos.`,
  ];

  return randomItem(templates);
}

/* ===========================
   UI COMPONENT (unchanged)
   =========================== */

export default function Home() {
  const [archetypeA, setArchetypeA] = useState("");
  const [archetypeB, setArchetypeB] = useState("");

  const [gender, setGender] = useState<Gender>("neutral"); // <-- ADD THIS

  const [isPremium, setIsPremium] = useState(false);
  const [includeLore, setIncludeLore] = useState(true);
  const [count, setCount] = useState(5);

  const [results, setResults] = useState<GeneratedEntry[]>([]);

  const effectiveMax = isPremium ? 50 : 5;

function generateNames() {
  // Allow archetypeA / archetypeB to be empty: empties mean randomness now.

  // Guard against NaN / weird count values
  const safeCount = Number.isFinite(count) && count > 0 ? count : 1;
  const cappedCount = Math.min(safeCount, effectiveMax);

  const output: GeneratedEntry[] = [];

  for (let i = 0; i < cappedCount; i++) {
    const name = makeFantasyName(archetypeA, archetypeB, gender);
    output.push({
      name,
      lore:
        isPremium && includeLore
          ? makeLore(name, archetypeA, archetypeB)
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
            Fantasy Name MDV Generator
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Mix two archetypes to generate evocative fantasy names. Free mode
            gives you quick lists; Premium mode unlocks bulk names and mini-lore.
          </p>
        </header>

        {/* Mode Toggle */}
        <section className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="font-semibold text-lg">Mode</h2>
            <p className="text-sm text-gray-300">
              Free: up to 5 names, no lore. Premium: up to 50 names + optional lore.
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

 {/* Gender dropdown – ADD THIS BLOCK */}
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
                disabled={!isPremium && count > 5}
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
