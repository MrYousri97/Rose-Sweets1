// Decorative SVG components for the menu preview — match the original PDF look.
// All use currentColor so they inherit the navy text color.

export function DiamondDivider({ className = "" }: { className?: string }) {
  // Ornamental divider with diamond + dots + small flourishes — matches the original PDF.
  return (
    <svg
      viewBox="0 0 400 24"
      className={className}
      preserveAspectRatio="none"
      width="100%"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      {/* Left flourish line */}
      <line x1="6" y1="12" x2="120" y2="12" />
      {/* small diamond */}
      <polygon points="50,12 54,8 58,12 54,16" fill="currentColor" stroke="none" />
      {/* tiny circle */}
      <circle cx="80" cy="12" r="1.6" fill="currentColor" stroke="none" />
      {/* small diamond */}
      <polygon points="110,12 114,8 118,12 114,16" fill="currentColor" stroke="none" />

      {/* Decorative small left diamond */}
      <polygon points="160,4 172,12 160,20 148,12" />

      {/* Center large diamond with inner dot */}
      <polygon points="200,2 220,12 200,22 180,12" />
      <circle cx="200" cy="12" r="3" fill="currentColor" stroke="none" />

      {/* Decorative small right diamond */}
      <polygon points="240,4 252,12 240,20 228,12" />

      {/* Right flourish line */}
      <line x1="280" y1="12" x2="394" y2="12" />
      <polygon points="282,12 286,8 290,12 286,16" fill="currentColor" stroke="none" />
      <circle cx="320" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <polygon points="342,12 346,8 350,12 346,16" fill="currentColor" stroke="none" />

      {/* tiny terminal flourishes */}
      <path d="M6 12 q-3 -3 0 -6" />
      <path d="M394 12 q3 -3 0 -6" />
    </svg>
  );
}

export function SectionDivider({ className = "" }: { className?: string }) {
  // A shorter divider used under each category title.
  return (
    <svg
      viewBox="0 0 200 12"
      className={className}
      preserveAspectRatio="none"
      width="100%"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <line x1="10" y1="6" x2="80" y2="6" />
      <polygon points="100,2 108,6 100,10 92,6" fill="currentColor" stroke="none" />
      <line x1="120" y1="6" x2="190" y2="6" />
    </svg>
  );
}

export function FooterDivider({ className = "" }: { className?: string }) {
  // Larger ornamental divider used at the bottom of the menu.
  return (
    <svg
      viewBox="0 0 500 24"
      className={className}
      preserveAspectRatio="none"
      width="100%"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <line x1="10" y1="12" x2="180" y2="12" />
      <polygon points="60,12 64,8 68,12 64,16" fill="currentColor" stroke="none" />
      <polygon points="140,12 144,8 148,12 144,16" fill="currentColor" stroke="none" />

      {/* Left mid diamond */}
      <polygon points="200,4 212,12 200,20 188,12" />

      {/* Center large diamond with dot */}
      <polygon points="250,2 268,12 250,22 232,12" />
      <circle cx="250" cy="12" r="3" fill="currentColor" stroke="none" />

      {/* Right mid diamond */}
      <polygon points="300,4 312,12 300,20 288,12" />

      <line x1="320" y1="12" x2="490" y2="12" />
      <polygon points="360,12 364,8 368,12 364,16" fill="currentColor" stroke="none" />
      <polygon points="440,12 444,8 448,12 444,16" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CakeIcon({ className = "" }: { className?: string }) {
  // More detailed line-art: tiered cake with drip icing and cherry.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width="64"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* plate */}
      <path d="M6 54 L58 54" />
      <path d="M10 54 L14 58 L50 58 L54 54" />
      {/* bottom tier */}
      <path d="M10 54 L10 42 L54 42 L54 54" />
      {/* drip icing on bottom tier */}
      <path d="M10 42 Q 14 46, 18 42 Q 22 46, 26 42 Q 30 46, 34 42 Q 38 46, 42 42 Q 46 46, 50 42 Q 52 44, 54 42" />
      {/* middle tier */}
      <path d="M16 42 L16 30 L48 30 L48 42" />
      <path d="M16 30 Q 20 34, 24 30 Q 28 34, 32 30 Q 36 34, 40 30 Q 44 34, 48 30" />
      {/* top tier */}
      <path d="M22 30 L22 20 L42 20 L42 30" />
      <path d="M22 20 Q 26 24, 30 20 Q 34 24, 38 20 Q 40 22, 42 20" />
      {/* cherry on top */}
      <path d="M32 20 L32 14" />
      <circle cx="32" cy="12" r="3" />
      <path d="M32 9 Q 34 6, 36 8" />
      {/* decorative dots */}
      <circle cx="20" cy="48" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="32" cy="48" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="48" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="36" r="1" fill="currentColor" stroke="none" />
      <circle cx="40" cy="36" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DonutIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width="64"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="9" />
      {/* icing drip around outer edge */}
      <path d="M14 24 Q 18 28, 22 24" />
      <path d="M46 22 Q 42 26, 38 22" />
      <path d="M50 38 Q 46 42, 42 38" />
      <path d="M14 38 Q 18 42, 22 38" />
      <path d="M28 14 Q 30 18, 32 14 Q 34 18, 36 14" />
      <path d="M28 50 Q 30 46, 32 50 Q 34 46, 36 50" />
      {/* sprinkles */}
      <line x1="22" y1="26" x2="25" y2="29" />
      <line x1="42" y1="26" x2="39" y2="29" />
      <line x1="18" y1="36" x2="22" y2="35" />
      <line x1="46" y1="36" x2="42" y2="35" />
      <line x1="32" y1="20" x2="34" y2="23" />
      <line x1="32" y1="44" x2="34" y2="41" />
    </svg>
  );
}

export function CookieIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width="64"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* cookie outline with a bite */}
      <path d="M50 14 Q 54 14, 54 18 Q 54 22, 50 23 Q 56 28, 52 36 Q 48 48, 32 50 Q 16 50, 12 36 Q 12 18, 28 14 Q 40 12, 50 14 Z" />
      {/* chocolate chips */}
      <ellipse cx="24" cy="24" rx="3" ry="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="40" cy="22" rx="3" ry="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="22" cy="38" rx="3" ry="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="42" cy="40" rx="3" ry="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="34" cy="34" rx="2.5" ry="1.8" fill="currentColor" stroke="none" />
      {/* small dots around chips */}
      <circle cx="30" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="46" cy="32" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="30" r="1" fill="currentColor" stroke="none" />
      <circle cx="36" cy="44" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width="64"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* tart shell with crimped edge */}
      <path d="M6 46 L58 46 L52 56 L12 56 Z" />
      {/* crimped top edge */}
      <path d="M6 46 Q 10 42, 14 46 Q 18 42, 22 46 Q 26 42, 30 46 Q 34 42, 38 46 Q 42 42, 46 46 Q 50 42, 54 46 Q 56 44, 58 46" />
      {/* top filling */}
      <path d="M14 46 L14 32 L50 32 L50 46" />
      {/* fruits on top */}
      <circle cx="22" cy="34" r="2.4" />
      <circle cx="32" cy="32" r="2.4" />
      <circle cx="42" cy="34" r="2.4" />
      <circle cx="22" cy="34" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="32" cy="32" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="42" cy="34" r="0.8" fill="currentColor" stroke="none" />
      {/* small leaves */}
      <path d="M22 31 L20 28 L24 29 Z" />
      <path d="M32 29 L30 26 L34 27 Z" />
      <path d="M42 31 L40 28 L44 29 Z" />
    </svg>
  );
}

export function CupcakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width="64"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* cup liner */}
      <path d="M16 36 L48 36 L42 56 L22 56 Z" />
      {/* liner top edge */}
      <path d="M14 36 L50 36" />
      {/* vertical stripes on liner */}
      <line x1="22" y1="36" x2="22" y2="56" />
      <line x1="32" y1="36" x2="32" y2="56" />
      <line x1="42" y1="36" x2="42" y2="56" />
      {/* frosting swirl */}
      <path d="M18 36 C 18 22, 26 14, 32 14 C 38 14, 46 22, 46 36" />
      <path d="M22 30 C 22 24, 28 20, 32 20 C 36 20, 42 24, 42 30" />
      <path d="M26 26 C 26 22, 30 20, 32 20 C 34 20, 38 22, 38 26" />
      {/* cherry on top */}
      <circle cx="32" cy="11" r="3" />
      <path d="M32 8 Q 34 5, 36 7" />
      {/* sprinkles */}
      <line x1="22" y1="40" x2="24" y2="46" />
      <line x1="32" y1="40" x2="32" y2="46" />
      <line x1="42" y1="40" x2="40" y2="46" />
    </svg>
  );
}

export function SmallHeart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-7-4.35-9.5-8.5C1 8 3 4 7 4c2 0 3.5 1.5 5 3 1.5-1.5 3-3 5-3 4 0 6 4 4.5 8.5C19 16.65 12 21 12 21z" />
    </svg>
  );
}
