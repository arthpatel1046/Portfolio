// Contrast checks for the colour tokens, using the WCAG formula.
// Keep the hex values in sync with src/styles/_tokens.scss.
const COLORS = {
  bg: '#080812',
  surface: '#151522',
  violet: '#7C3AED',
  violetBright: '#8B5CF6',
  lavender: '#C4B5FD',
  text: '#F8FAFC',
  textMuted: '#A5ADBD',
} as const;

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const r = channel(parseInt(hex.slice(1, 3), 16));
  const g = channel(parseInt(hex.slice(3, 5), 16));
  const b = channel(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** The colour you get with `foreground` painted over `background` at the given opacity. */
function mix(foreground: string, background: string, alpha: number): string {
  const part = (start: number): string =>
    Math.round(
      alpha * parseInt(foreground.slice(start, start + 2), 16) + (1 - alpha) * parseInt(background.slice(start, start + 2), 16),
    )
      .toString(16)
      .padStart(2, '0');
  return `#${part(1)}${part(3)}${part(5)}`;
}

describe('design tokens: contrast', () => {
  it('keeps text, muted text and lavender above AAA (7:1) on the page and on cards', () => {
    for (const foreground of [COLORS.text, COLORS.textMuted, COLORS.lavender]) {
      for (const background of [COLORS.bg, COLORS.surface]) {
        expect(contrast(foreground, background), `${foreground} on ${background}`).toBeGreaterThanOrEqual(7);
      }
    }
  });

  it('keeps white text on the violet button fill above AA (4.5:1)', () => {
    expect(contrast(COLORS.text, COLORS.violet)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps muted text readable over the brightest part of a ribbon (AA)', () => {
    const brightestRibbon = mix(COLORS.violet, COLORS.bg, 0.55);
    expect(contrast(COLORS.textMuted, brightestRibbon)).toBeGreaterThanOrEqual(4.5);
  });

  it('allows bright violet for small text on the page background, and for large text on cards', () => {
    expect(contrast(COLORS.violetBright, COLORS.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(COLORS.violetBright, COLORS.surface)).toBeGreaterThanOrEqual(3);
  });

  it('keeps UI colours and the focus ring above 3:1', () => {
    expect(contrast(COLORS.violet, COLORS.bg)).toBeGreaterThanOrEqual(3);
    expect(contrast(COLORS.violet, COLORS.surface)).toBeGreaterThanOrEqual(3);
    expect(contrast(COLORS.lavender, COLORS.violet)).toBeGreaterThanOrEqual(3);
  });
});