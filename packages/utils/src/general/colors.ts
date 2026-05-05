import { IBrandPalette } from "./Types";


import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import mixPlugin from "colord/plugins/mix";
import namesPlugin from "colord/plugins/names";

extend([a11yPlugin, mixPlugin, namesPlugin]);

const READABILITY_VAL = 2.4336613325173437;
const MIN_BRAND_COLOR_COUNT = 5;
const MAX_BRAND_COLOR_COUNT = 10;
const RESERVED_BRAND_COLOR_SLOTS = 4;

type BrandColors = string[];

type BgStyleObject = {
  background?: string;
  backgroundImage?: string;
};

type BgInput = string | BgStyleObject;

type AdjustBrandColorsOptions = {
  readabilityVal?: number;
  neutralWhite?: string;
  neutralBlack?: string;
  harmonyTintPercent?: number;
};

const DEFAULT_OPTIONS: Required<AdjustBrandColorsOptions> = {
  readabilityVal: READABILITY_VAL,
  neutralWhite: "#f7f7f7",
  neutralBlack: "#111111",
  harmonyTintPercent: 0.08,
};

/**
 * Helper to convert your raw array into the Semantic Object
 * Input: ["#add495", "#538161", "#f898a4", "#ecdbc9", "#ffffff", "#cccccc", "#000000", "#f5f5f5", "#333333"]
 */
export const parseBrandColors = (colors: string[]): IBrandPalette => {
  const boundedColors = boundBrandColors(colors);

  if (boundedColors.length < MIN_BRAND_COLOR_COUNT) {
    throw new Error("Palette must have at least 5 colors");
  }

  return {
    primary: boundedColors[0]!,
    secondary: boundedColors[1]!,
    // Extract everything between index 2 and the last 2
    accents: boundedColors.slice(2, -2), 
    neutrals: {
      // The second to last item
      primary: boundedColors[boundedColors.length - 2]!,
      // The very last item
      secondary: boundedColors[boundedColors.length - 1]!, 
    }
  };

};

export function boundBrandColors(brandColors: BrandColors): BrandColors {
  if (!Array.isArray(brandColors) || brandColors.length <= MAX_BRAND_COLOR_COUNT) {
    return Array.isArray(brandColors) ? brandColors : [];
  }

  const accents = brandColors
    .slice(2, -2)
    .slice(0, MAX_BRAND_COLOR_COUNT - RESERVED_BRAND_COLOR_SLOTS);

  return [brandColors[0]!, brandColors[1]!, ...accents, ...brandColors.slice(-2)];
}




export function adjustBrandColorsForBg(
  brandColors: BrandColors,
  bgInput: BgInput,
  options: AdjustBrandColorsOptions = {}
): BrandColors {
  const boundedBrandColors = boundBrandColors(brandColors);
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!Array.isArray(boundedBrandColors) || boundedBrandColors.length < MIN_BRAND_COLOR_COUNT) {
    throw new Error("brandColors must be an array of 5 to 10 colors.");
  }

  const sanitizedBrandColors = boundedBrandColors.map(normalizeToHex).filter(Boolean) as string[];

  if (sanitizedBrandColors.length !== boundedBrandColors.length) {
    throw new Error("All brand colors must be valid CSS colors.");
  }

  const effectiveBg = getEffectiveBackground(bgInput, sanitizedBrandColors);

  const originalFg = sanitizedBrandColors[0];
  const originalSecond = sanitizedBrandColors[1];
  const accentColors = sanitizedBrandColors.slice(2, -2);
  const originalWhiteNeutral =
    sanitizedBrandColors[sanitizedBrandColors.length - 2] || opts.neutralWhite;
  const originalBlackNeutral =
    sanitizedBrandColors[sanitizedBrandColors.length - 1] || opts.neutralBlack;

  const pair = solvePrimaryPair(
    originalFg!,
    originalSecond!,
    effectiveBg,
    opts.readabilityVal,
    opts.harmonyTintPercent
  );

  let adjustedFg = pair.fg;
  let adjustedSecond = pair.second;

  let adjustedAccents = accentColors.map((accent) => {
    let next = tintWithBg(accent, effectiveBg, clamp(opts.harmonyTintPercent, 0.01, 0.05));

    if (getContrast(next, effectiveBg) < 1.15) {
      next = shiftTowardReadability(
        next,
        effectiveBg,
        1.15,
        isDark(effectiveBg) ? "lighter" : "darker"
      );
    }

    return colord(next).toHex();
  });

  const derivedWhite = deriveNeutral(originalWhiteNeutral, "light", effectiveBg);
  const derivedBlack = deriveNeutral(originalBlackNeutral, "dark", effectiveBg);

  let adjusted = [
    colord(adjustedFg).toHex(),
    colord(adjustedSecond).toHex(),
    ...adjustedAccents,
    colord(derivedWhite).toHex(),
    colord(derivedBlack).toHex(),
  ];

  adjusted = retintAdjustedPalette(
    adjusted,
    effectiveBg,
    opts.readabilityVal,
    clamp(opts.harmonyTintPercent, 0.01, 0.05)
  );

  // FINAL ENFORCEMENT:
  // always make sure final first color contrasts with bg
  adjusted[0] = enforceFinalFirstColorContrast(
    adjusted[0]!,
    originalFg!,
    effectiveBg,
    opts.readabilityVal,
    clamp(opts.harmonyTintPercent, 0.01, 0.05)
  );

  // also recheck the pair after forcing first color
  const repairedPair = solvePrimaryPair(
    adjusted[0]!,
    adjusted[1]!,
    effectiveBg,
    opts.readabilityVal,
    clamp(opts.harmonyTintPercent, 0.01, 0.05)
  );

  adjusted[0] = repairedPair.fg;
  adjusted[1] = repairedPair.second;

  // one last hard enforcement for first color after pair repair
  adjusted[0] = enforceFinalFirstColorContrast(
    adjusted[0]!,
    originalFg!,
    effectiveBg,
    opts.readabilityVal,
    clamp(opts.harmonyTintPercent, 0.01, 0.05)
  );

  return adjusted.map((c) => colord(c).toHex());
}

/* ------------------------------------------------------------------ */
/* Final first-color enforcement */
/* ------------------------------------------------------------------ */

function enforceFinalFirstColorContrast(
  currentFg: string,
  originalFg: string,
  bg: string,
  minContrast: number,
  tintAmount: number
): string {
  if (getContrast(currentFg, bg) >= minContrast) {
    return colord(currentFg).toHex();
  }

  const candidates = buildReadableCandidates(
    originalFg,
    bg,
    minContrast,
    tintAmount,
    true
  );

  // include the current fg and a retinted current fg too
  const currentCandidates = [
    currentFg,
    tintWithBg(currentFg, bg, tintAmount),
    shiftTowardReadability(
      currentFg,
      bg,
      minContrast,
      isDark(bg) ? "lighter" : "darker"
    ),
  ]
    .map((c) => colord(c).toHex())
    .filter((c, i, arr) => arr.indexOf(c) === i)
    .filter((c) => getContrast(c, bg) >= minContrast);

  const all = [...currentCandidates, ...candidates].filter(
    (c, i, arr) => arr.indexOf(c) === i
  );

  if (all.length === 0) {
    return isDark(bg) ? "#ffffff" : "#111111";
  }

  all.sort((a, b) => {
    const scoreA =
      colorSimilarityScore(a, originalFg) * 2 + getContrast(a, bg) * 10;
    const scoreB =
      colorSimilarityScore(b, originalFg) * 2 + getContrast(b, bg) * 10;
    return scoreB - scoreA;
  });

  return all[0]!;
}

/* ------------------------------------------------------------------ */
/* Retint final adjusted palette */
/* ------------------------------------------------------------------ */

function retintAdjustedPalette(
  adjusted: string[],
  bg: string,
  minContrast: number,
  tintAmount: number
): string[] {
  if (adjusted.length < 5) return adjusted;

  const neutrals = adjusted.slice(-2);
  const mutable = adjusted.slice(0, -2);

  if (mutable.length < 2) {
    return adjusted;
  }

  let fg = tintWithBg(mutable[0]!, bg, tintAmount);
  let second = tintWithBg(mutable[1]!, bg, tintAmount);

  const repairedPair = solvePrimaryPair(fg, second, bg, minContrast, tintAmount);
  fg = repairedPair.fg;
  second = repairedPair.second;

  const accents = mutable.slice(2).map((color) => {
    let next = tintWithBg(color, bg, tintAmount);

    if (getContrast(next, bg) < 1.15) {
      next = shiftTowardReadability(
        next,
        bg,
        1.15,
        isDark(bg) ? "lighter" : "darker"
      );
    }

    return colord(next).toHex();
  });

  return [colord(fg).toHex(), colord(second).toHex(), ...accents, ...neutrals];
}

/* ------------------------------------------------------------------ */
/* Primary pair solver */
/* ------------------------------------------------------------------ */

function solvePrimaryPair(
  originalFg: string,
  originalSecond: string,
  bg: string,
  minContrast: number,
  harmonyTintPercent = 0.03
): { fg: string; second: string } {
  const fgCandidates = buildReadableCandidates(
    originalFg,
    bg,
    minContrast,
    harmonyTintPercent
  );

  const secondCandidates = buildReadableCandidates(
    originalSecond,
    bg,
    minContrast,
    harmonyTintPercent
  );

  let bestPair: { fg: string; second: string } | null = null;
  let bestScore = -Infinity;

  for (const fg of fgCandidates) {
    for (const second of secondCandidates) {
      const fgVsBg = getContrast(fg, bg);
      const secondVsBg = getContrast(second, bg);
      const fgVsSecond = getContrast(fg, second);

      if (
        fgVsBg < minContrast ||
        secondVsBg < minContrast ||
        fgVsSecond < minContrast
      ) {
        continue;
      }

      const score =
        colorSimilarityScore(fg, originalFg) * 2 +
        colorSimilarityScore(second, originalSecond) * 2 +
        fgVsBg * 0.5 +
        secondVsBg * 0.5 +
        fgVsSecond * 1.2;

      if (score > bestScore) {
        bestScore = score;
        bestPair = { fg, second };
      }
    }
  }

  if (bestPair) return bestPair;

  const fallbackFgCandidates = buildReadableCandidates(
    originalFg,
    bg,
    minContrast,
    harmonyTintPercent,
    true
  );

  const fallbackSecondCandidates = buildReadableCandidates(
    originalSecond,
    bg,
    minContrast,
    harmonyTintPercent,
    true
  );

  for (const fg of fallbackFgCandidates) {
    for (const second of fallbackSecondCandidates) {
      const fgVsBg = getContrast(fg, bg);
      const secondVsBg = getContrast(second, bg);
      const fgVsSecond = getContrast(fg, second);

      if (
        fgVsBg < minContrast ||
        secondVsBg < minContrast ||
        fgVsSecond < minContrast
      ) {
        continue;
      }

      const score =
        colorSimilarityScore(fg, originalFg) +
        colorSimilarityScore(second, originalSecond) +
        fgVsBg * 0.5 +
        secondVsBg * 0.5 +
        fgVsSecond;

      if (score > bestScore) {
        bestScore = score;
        bestPair = { fg, second };
      }
    }
  }

  if (bestPair) return bestPair;

  return isDark(bg)
    ? { fg: "#ffffff", second: "#111111" }
    : { fg: "#111111", second: "#ffffff" };
}

function buildReadableCandidates(
  original: string,
  bg: string,
  minContrast: number,
  harmonyTintPercent = 0.03,
  includeExtremes = false
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  const push = (color: string) => {
    const hex = colord(color).toHex();
    if (seen.has(hex)) return;
    if (getContrast(hex, bg) >= minContrast) {
      seen.add(hex);
      out.push(hex);
    }
  };

  push(original);
  push(tintWithBg(original, bg, clamp(harmonyTintPercent, 0.01, 0.05)));

  for (let i = 1; i <= 24; i++) {
    const amt = i * 0.04;

    const lighter = colord(original).lighten(amt).toHex();
    const darker = colord(original).darken(amt).toHex();

    push(lighter);
    push(darker);

    push(tintWithBg(lighter, bg, clamp(harmonyTintPercent, 0.01, 0.05)));
    push(tintWithBg(darker, bg, clamp(harmonyTintPercent, 0.01, 0.05)));
  }

  if (includeExtremes) {
    push("#ffffff");
    push("#f7f7f7");
    push("#eeeeee");
    push("#222222");
    push("#111111");
    push("#000000");

    for (let i = 1; i <= 10; i++) {
      const amt = i * 0.1;
      push(colord(original).mix("#ffffff", amt).toHex());
      push(colord(original).mix("#000000", amt).toHex());
    }
  }

  out.sort((a, b) => colorSimilarityScore(b, original) - colorSimilarityScore(a, original));

  return out;
}

/* ------------------------------------------------------------------ */
/* Accent / neutral helpers */
/* ------------------------------------------------------------------ */

function shiftTowardReadability(
  color: string,
  against: string,
  minContrast: number,
  direction: "lighter" | "darker"
): string {
  let best = colord(color);
  let bestContrast = getContrast(best.toHex(), against);

  if (bestContrast >= minContrast) return best.toHex();

  for (let i = 1; i <= 40; i++) {
    const amt = i * 0.025;
    const next =
      direction === "lighter"
        ? colord(color).lighten(amt)
        : colord(color).darken(amt);

    const score = getContrast(next.toHex(), against);

    if (score > bestContrast) {
      best = next;
      bestContrast = score;
    }

    if (score >= minContrast) {
      return next.toHex();
    }
  }

  return best.toHex();
}

function tintWithBg(color: string, bg: string, amount = 0.03): string {
  return colord(color).mix(bg, clamp(amount, 0.01, 0.05)).toHex();
}

function deriveNeutral(
  base: string,
  tone: "light" | "dark",
  effectiveBg: string
): string {
  let c = colord(base);

  if (tone === "light") {
    c = c.mix("#ffffff", 0.65);
    if (getContrast(c.toHex(), effectiveBg) < 1.05) {
      c = c.darken(0.12);
    }
  } else {
    c = c.mix("#000000", 0.65);
    if (getContrast(c.toHex(), effectiveBg) < 1.05) {
      c = c.lighten(0.12);
    }
  }

  return c.toHex();
}

/* ------------------------------------------------------------------ */
/* Background parsing */
/* ------------------------------------------------------------------ */

function getEffectiveBackground(bgInput: BgInput, brandColors: string[]): string {
  if (typeof bgInput === "string") {
    const direct = normalizeToHex(bgInput);
    if (direct) return direct;

    const gradientColors = extractGradientColors(bgInput, brandColors);
    if (gradientColors.length >= 2) {
      return mixMultipleColors(gradientColors);
    }

    throw new Error("Invalid bgInput string. Must be a valid color or linear-gradient string.");
  }

  const raw = bgInput.backgroundImage || bgInput.background || "";

  const direct = normalizeToHex(raw);
  if (direct) return direct;

  const gradientColors = extractGradientColors(raw, brandColors);
  if (gradientColors.length >= 2) {
    return mixMultipleColors(gradientColors);
  }

  throw new Error(
    "Invalid bg style object. Expected a valid color or a background/backgroundImage with linear-gradient(...)."
  );
}

function extractGradientColors(input: string, brandColors: string[] = []): string[] {
  if (!input || !input.includes("linear-gradient")) return [];

  const colorMatches =
    input.match(
      /(#(?:[0-9a-fA-F]{3,8})\b|rgba?\([^)]+\)|hsla?\([^)]+\)|\b[a-zA-Z]+\b)/g
    ) || [];

  const brandSet = new Set(brandColors.map((c) => c.toLowerCase()));
  const colors: string[] = [];

  for (const token of colorMatches) {
    const clean = token.trim();

    if (
      [
        "linear-gradient",
        "to",
        "top",
        "bottom",
        "left",
        "right",
        "deg",
        "circle",
        "ellipse",
      ].includes(clean.toLowerCase())
    ) {
      continue;
    }

    if (brandSet.has(clean.toLowerCase())) {
      colors.push(colord(clean).toHex());
      continue;
    }

    const parsed = colord(clean);
    if (parsed.isValid()) {
      colors.push(parsed.toHex());
    }
  }

  return dedupe(colors);
}

function mixMultipleColors(colors: string[]): string {
  if (colors.length === 0) return "#ffffff";
  if (colors.length === 1) return colors[0]!;

  let mixed = colord(colors[0]!);
  for (let i = 1; i < colors.length; i++) {
    mixed = mixed.mix(colors[i]!, 0.5);
  }
  return mixed.toHex();
}

/* ------------------------------------------------------------------ */
/* Generic helpers */
/* ------------------------------------------------------------------ */

function normalizeToHex(input: string): string | null {
  const c = colord(input);
  return c.isValid() ? c.toHex() : null;
}

function getContrast(a: string, b: string): number {
  return colord(a).contrast(b);
}

function isDark(color: string): boolean {
  const { r, g, b } = colord(color).toRgb();
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.5;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

function colorSimilarityScore(a: string, b: string): number {
  const ca = colord(a).toRgb();
  const cb = colord(b).toRgb();

  const dist = Math.sqrt(
    Math.pow(ca.r - cb.r, 2) +
      Math.pow(ca.g - cb.g, 2) +
      Math.pow(ca.b - cb.b, 2)
  );

  return 441.6729559300637 - dist;
}


export function generateUniqueRandomGradients(
  brandColors: string[],
  n: number
): string[] {
  if (!Array.isArray(brandColors) || brandColors.length < 2) {
    throw new Error('brandColors must contain at least 2 colors.');
  }

  const angles = [45, 60, 90, 120, 135, 180, 225, 270];
  const used = new Set<string>();
  const gradients: string[] = [];

  const maxPairs = brandColors.length * (brandColors.length - 1);

  if (n > maxPairs) {
    throw new Error(`You can only generate up to ${maxPairs} unique two-color gradients.`);
  }

  while (gradients.length < n) {
    const color1 = brandColors[Math.floor(Math.random() * brandColors.length)];
    const color2 = brandColors[Math.floor(Math.random() * brandColors.length)];

    if (color1 === color2) continue;

    const pairKey = `${color1}-${color2}`;
    if (used.has(pairKey)) continue;

    used.add(pairKey);

    const angle = angles[Math.floor(Math.random() * angles.length)];
    gradients.push(`linear-gradient(${angle}deg, ${color1}, ${color2})`);
  }

  return gradients;
}