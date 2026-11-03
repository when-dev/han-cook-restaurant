import type { DishArt as DishArtKind } from "@/data/menu";

/**
 * Poster-style dish illustrations — thick ink outlines and flat colour, in the spirit of the
 * restaurant's hand-drawn menu boards. Used whenever a dish has no photo yet.
 */

const INK = "#1a1214";
const S = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Per-item liquid colours for drinks so the ades don't all look alike. */
const drinkTints: Record<string, [string, string]> = {
  "green-grape-ade": ["#b6e05a", "#7fbf2e"],
  "mango-ade": ["#ffc23d", "#ff8a1f"],
  "strawberry-ade": ["#ff7aa2", "#e3242b"],
  "blue-lemonade": ["#5fe0ff", "#2a7bff"],
  "pink-soju-cocktail": ["#ff9ac2", "#ff3d8b"],
  "melon-soju-cocktail": ["#b9f28a", "#5cc46a"],
  "pepsi-max": ["#141414", "#1f2a6b"],
};

function Steam({ x = 100, y = 40 }: { x?: number; y?: number }) {
  return (
    <g fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" opacity={0.85}>
      <path d={`M${x - 22} ${y + 8} c -6 -8 6 -12 0 -22`} />
      <path d={`M${x} ${y + 4} c -6 -8 6 -12 0 -22`} />
      <path d={`M${x + 22} ${y + 8} c -6 -8 6 -12 0 -22`} />
    </g>
  );
}

function Stew() {
  return (
    <g>
      <Steam x={100} y={40} />
      <ellipse cx="100" cy="132" rx="70" ry="10" fill="rgba(0,0,0,.18)" />
      <path d="M36 82 Q40 132 100 134 Q160 132 164 82 Z" fill="#3b2a24" {...S} />
      <ellipse cx="100" cy="82" rx="64" ry="16" fill="#d9361f" {...S} />
      <rect x="66" y="74" width="16" height="12" rx="2" fill="#fff6e8" stroke={INK} strokeWidth={2.5} />
      <rect x="104" y="72" width="16" height="12" rx="2" fill="#fff6e8" stroke={INK} strokeWidth={2.5} />
      <path d="M86 88 q8 -6 18 0" fill="none" stroke="#ff9a4a" strokeWidth={4} strokeLinecap="round" />
      <circle cx="132" cy="84" r="3.5" fill="#5fbf4a" />
      <circle cx="58" cy="84" r="3" fill="#5fbf4a" />
      <circle cx="96" cy="76" r="3" fill="#5fbf4a" />
      <path d="M30 86 h-10 M170 86 h10" {...S} strokeWidth={6} />
    </g>
  );
}

function Cup() {
  return (
    <g>
      <ellipse cx="100" cy="140" rx="46" ry="8" fill="rgba(0,0,0,.18)" />
      <path d="M58 70 L68 138 H132 L142 70 Z" fill="#fff6e8" {...S} />
      <path d="M61 92 H139 L136 112 H64 Z" fill="#e3242b" stroke={INK} strokeWidth={3} />
      <text x="100" y="108" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff6e8" fontFamily="sans-serif">
        CUP-BAB
      </text>
      <path d="M54 70 Q100 30 146 70 Z" fill="#fffaf0" {...S} />
      <path d="M66 64 q14 -16 32 -10 q18 -10 36 8" fill="#c8572b" stroke={INK} strokeWidth={3} />
      <circle cx="112" cy="50" r="12" fill="#fff" stroke={INK} strokeWidth={3} />
      <circle cx="113" cy="50" r="5.5" fill="#ffb627" />
      <circle cx="80" cy="58" r="3" fill="#5fbf4a" />
      <circle cx="92" cy="52" r="2.5" fill="#5fbf4a" />
    </g>
  );
}

function Corndog() {
  return (
    <g transform="rotate(-24 100 90)">
      <ellipse cx="104" cy="146" rx="50" ry="7" fill="rgba(0,0,0,.15)" />
      <rect x="95" y="112" width="10" height="44" rx="3" fill="#e9c894" {...S} strokeWidth={3} />
      <rect x="74" y="20" width="52" height="100" rx="26" fill="#e7a23a" {...S} />
      {[
        [86, 38],
        [104, 34],
        [114, 52],
        [92, 58],
        [108, 74],
        [84, 82],
        [112, 96],
        [94, 102],
      ].map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={cx - 4} y={cy - 4} width="9" height="9" rx="2" fill="#ffd276" stroke={INK} strokeWidth={2} />
      ))}
      <path d="M82 46 l12 8 l-12 8 l12 8 l-12 8 l12 8" fill="none" stroke="#e3242b" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 42 l-10 9 l10 9 l-10 9" fill="none" stroke="#ffcf3d" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Tteok() {
  return (
    <g>
      <Steam x={100} y={34} />
      <ellipse cx="100" cy="104" rx="76" ry="30" fill="#fff6e8" {...S} />
      <ellipse cx="100" cy="100" rx="62" ry="22" fill="#e3242b" stroke={INK} strokeWidth={3} />
      {[
        [70, 94, -18],
        [98, 88, 12],
        [124, 98, -6],
        [86, 108, 20],
        [112, 108, -24],
      ].map(([x, y, r]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 15}
          y={y - 6}
          width="30"
          height="12"
          rx="6"
          fill="#fff0dc"
          stroke={INK}
          strokeWidth={2.5}
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
      <path d="M132 84 l14 6 l-10 10 Z" fill="#f0c27a" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx="80" cy="84" r="2.5" fill="#5fbf4a" />
      <circle cx="140" cy="108" r="2.5" fill="#5fbf4a" />
      <circle cx="60" cy="104" r="2" fill="#fff" />
      <circle cx="104" cy="118" r="2" fill="#fff" />
    </g>
  );
}

function Drumstick({ x, y, r, glaze }: { x: number; y: number; r: number; glaze: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <rect x="-5" y="18" width="10" height="26" rx="4" fill="#fff6e8" {...S} strokeWidth={3} />
      <circle cx="-7" cy="46" r="7" fill="#fff6e8" stroke={INK} strokeWidth={3} />
      <circle cx="7" cy="46" r="7" fill="#fff6e8" stroke={INK} strokeWidth={3} />
      <path d="M-24 0 Q-26 -30 0 -32 Q26 -30 24 0 Q20 24 0 24 Q-20 24 -24 0 Z" fill={glaze} {...S} />
      <path d="M-12 -14 l4 -4 M4 -20 l5 -2 M10 -6 l4 -4 M-14 4 l5 -2 M0 4 l5 -3" stroke="#fff3c4" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
    </g>
  );
}

function Chicken() {
  return (
    <g>
      <ellipse cx="100" cy="140" rx="70" ry="9" fill="rgba(0,0,0,.18)" />
      <Drumstick x={70} y={86} r={-28} glaze="#d98a2b" />
      <Drumstick x={130} y={86} r={28} glaze="#b5361c" />
      <Drumstick x={100} y={78} r={0} glaze="#e09a35" />
      <circle cx="84" cy="52" r="2" fill="#fff" />
      <circle cx="118" cy="56" r="2" fill="#fff" />
      <circle cx="102" cy="48" r="2" fill="#fff" />
    </g>
  );
}

function Dumpling() {
  const one = (x: number, y: number, r: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M-34 10 Q-32 -30 0 -30 Q32 -30 34 10 Q0 22 -34 10 Z" fill="#fff3dc" {...S} />
      <path d="M-34 10 Q0 22 34 10 Q0 30 -34 10" fill="#e7a23a" stroke={INK} strokeWidth={3} />
      <path d="M-18 -20 q4 6 0 12 M-4 -26 q4 6 0 12 M10 -24 q4 6 0 12 M22 -16 q3 5 0 10" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <ellipse cx="100" cy="134" rx="74" ry="9" fill="rgba(0,0,0,.18)" />
      {one(64, 100, -8)}
      {one(136, 100, 8)}
      {one(100, 82, 0)}
    </g>
  );
}

function Roll() {
  const one = (x: number, y: number, r: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
      <rect x="-40" y="-13" width="80" height="26" rx="13" fill="#e7a23a" {...S} />
      <rect x="-30" y="-8" width="60" height="16" rx="8" fill="#203226" stroke={INK} strokeWidth={2} />
      <ellipse cx="40" cy="0" rx="8" ry="13" fill="#f1ddb4" stroke={INK} strokeWidth={3} />
      <path d="M36 -6 q4 3 0 6 q4 3 0 6" fill="none" stroke="#9b7a52" strokeWidth={2} />
    </g>
  );
  return (
    <g>
      <ellipse cx="100" cy="138" rx="72" ry="8" fill="rgba(0,0,0,.18)" />
      {one(96, 112, -6)}
      {one(104, 84, 8)}
      {one(92, 58, -10)}
    </g>
  );
}

function Can({ tint }: { tint: [string, string] }) {
  return (
    <g>
      <ellipse cx="100" cy="146" rx="40" ry="7" fill="rgba(0,0,0,.18)" />
      <path d="M68 34 Q68 26 76 24 H124 Q132 26 132 34 V136 Q132 144 124 144 H76 Q68 144 68 136 Z" fill={tint[1]} {...S} />
      <ellipse cx="100" cy="27" rx="28" ry="5" fill="#cfd6df" stroke={INK} strokeWidth={3} />
      <circle cx="100" cy="86" r="22" fill="#fff" stroke={INK} strokeWidth={3} />
      <path d="M78 86 Q100 70 122 86 V80 Q100 62 78 80 Z" fill="#e3242b" />
      <path d="M78 90 Q100 106 122 90 V94 Q100 112 78 94 Z" fill="#2a59c9" />
      <path d="M78 40 V128" stroke="rgba(255,255,255,.35)" strokeWidth={6} strokeLinecap="round" />
    </g>
  );
}

function Ade({ tint }: { tint: [string, string] }) {
  return (
    <g>
      <ellipse cx="100" cy="148" rx="42" ry="7" fill="rgba(0,0,0,.18)" />
      <path d="M120 30 L132 6" stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <path d="M120 30 L132 6" stroke="#fff6e8" strokeWidth={4} strokeLinecap="round" />
      <path d="M64 34 L72 140 Q72 146 78 146 H122 Q128 146 128 140 L136 34 Z" fill="rgba(255,255,255,.55)" {...S} />
      <path d="M67 64 L72 140 Q72 146 78 146 H122 Q128 146 128 140 L133 64 Z" fill={tint[0]} />
      <path d="M69 104 L72 140 Q72 146 78 146 H122 Q128 146 128 140 L131 104 Z" fill={tint[1]} opacity={0.75} />
      <rect x="80" y="70" width="18" height="18" rx="4" fill="rgba(255,255,255,.7)" stroke={INK} strokeWidth={2} transform="rotate(-12 89 79)" />
      <rect x="104" y="84" width="18" height="18" rx="4" fill="rgba(255,255,255,.7)" stroke={INK} strokeWidth={2} transform="rotate(14 113 93)" />
      <circle cx="90" cy="118" r="3" fill="#fff" opacity={0.8} />
      <circle cx="110" cy="126" r="2.5" fill="#fff" opacity={0.8} />
      <circle cx="100" cy="110" r="2" fill="#fff" opacity={0.8} />
      <path d="M64 34 L136 34" {...S} />
      <circle cx="132" cy="38" r="12" fill={tint[0]} stroke={INK} strokeWidth={3} />
    </g>
  );
}

function Coffee() {
  return (
    <g>
      <ellipse cx="100" cy="148" rx="40" ry="7" fill="rgba(0,0,0,.18)" />
      <path d="M108 28 L118 4" stroke={INK} strokeWidth={9} strokeLinecap="round" />
      <path d="M108 28 L118 4" stroke="#1b1b1b" strokeWidth={4} strokeLinecap="round" />
      <path d="M64 30 L74 140 Q74 146 80 146 H120 Q126 146 126 140 L136 30 Z" fill="rgba(255,255,255,.55)" {...S} />
      <path d="M67 60 L74 140 Q74 146 80 146 H120 Q126 146 126 140 L133 60 Z" fill="#7a4524" />
      <path d="M67 60 Q100 74 133 60 L131 82 Q100 94 69 82 Z" fill="#e9cfa8" />
      <rect x="82" y="96" width="16" height="16" rx="4" fill="rgba(255,255,255,.45)" stroke={INK} strokeWidth={2} transform="rotate(-10 90 104)" />
      <rect x="104" y="108" width="16" height="16" rx="4" fill="rgba(255,255,255,.45)" stroke={INK} strokeWidth={2} transform="rotate(12 112 116)" />
      <path d="M58 30 H142" {...S} strokeWidth={6} />
    </g>
  );
}

function Beer() {
  return (
    <g>
      <ellipse cx="96" cy="148" rx="46" ry="7" fill="rgba(0,0,0,.18)" />
      <path d="M128 62 h12 q14 0 14 16 v24 q0 16 -14 16 h-12" fill="none" {...S} strokeWidth={8} />
      <path d="M128 62 h12 q14 0 14 16 v24 q0 16 -14 16 h-12" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={3} />
      <rect x="62" y="44" width="68" height="102" rx="8" fill="#ffb627" {...S} />
      <path d="M58 46 q6 -18 20 -12 q8 -16 22 -6 q12 -12 22 2 q14 -2 10 16 Z" fill="#fffaf0" {...S} />
      <path d="M78 68 V130 M96 68 V130 M114 68 V130" stroke="rgba(255,255,255,.45)" strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

function Soju({ tint }: { tint?: [string, string] }) {
  return (
    <g>
      <ellipse cx="100" cy="148" rx="60" ry="7" fill="rgba(0,0,0,.18)" />
      <path d="M70 14 H86 V44 Q100 54 100 72 V138 Q100 146 92 146 H64 Q56 146 56 138 V72 Q56 54 70 44 Z" fill="#3fae6a" {...S} />
      <rect x="68" y="8" width="20" height="10" rx="2" fill="#2d7a47" stroke={INK} strokeWidth={3} />
      <rect x="60" y="86" width="36" height="34" rx="3" fill="#fff6e8" stroke={INK} strokeWidth={3} />
      <text x="78" y="109" textAnchor="middle" fontSize="15" fontWeight="900" fill="#2d7a47" fontFamily="sans-serif">
        SOJU
      </text>
      <path d="M64 58 V80" stroke="rgba(255,255,255,.5)" strokeWidth={5} strokeLinecap="round" />
      <path d="M116 96 L120 146 H146 L150 96 Z" fill="rgba(255,255,255,.6)" {...S} />
      <path d="M117 112 L120 146 H146 L149 112 Z" fill={tint ? tint[0] : "#e8f6ee"} />
    </g>
  );
}

function NeonSign() {
  return (
    <g>
      <rect x="22" y="34" width="156" height="92" rx="18" fill="none" stroke="#ff6a5f" strokeWidth={4} />
      <rect x="22" y="34" width="156" height="92" rx="18" fill="none" stroke="#ffe4de" strokeWidth={1.5} />
      <text x="100" y="98" textAnchor="middle" fontSize="44" fontWeight="900" fill="#ffe4de" fontFamily="sans-serif" letterSpacing="2">
        HAN
      </text>
    </g>
  );
}

export function DishIllustration({ art, itemId, className }: { art: DishArtKind | "sign"; itemId?: string; className?: string }) {
  const tint = (itemId && drinkTints[itemId]) || (["#ffd36b", "#ff8a1f"] as [string, string]);
  const content = (() => {
    switch (art) {
      case "stew":
        return <Stew />;
      case "cup":
        return <Cup />;
      case "corndog":
        return <Corndog />;
      case "tteok":
        return <Tteok />;
      case "chicken":
        return <Chicken />;
      case "dumpling":
        return <Dumpling />;
      case "roll":
        return <Roll />;
      case "can":
        return <Can tint={itemId === "pepsi-max" ? tint : ["#2a59c9", "#1f4bb8"]} />;
      case "ade":
        return <Ade tint={tint} />;
      case "coffee":
        return <Coffee />;
      case "beer":
        return <Beer />;
      case "soju":
        return <Soju tint={itemId ? drinkTints[itemId] : undefined} />;
      case "sign":
        return <NeonSign />;
    }
  })();
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true" focusable="false">
      {content}
    </svg>
  );
}
