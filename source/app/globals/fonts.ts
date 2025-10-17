import { $settings } from "./settings";

/**
 * Enum for fonts. Names are defined in css.
 * @readonly
 * @enum {string}
 */
export const FONTS = Object.freeze({
  Pixeloid: 'Pixeloid, sans-serif',
  PixeloidMono: 'PixeloidMono, monospace',
  PixeloidBold: 'PixeloidBold, serif'
})

export const FONT_SIZE = 5

export function getFont(options?: { size?: number; style?: string }) {
  const { size = FONT_SIZE, style = FONTS.Pixeloid } = options ?? {}
  return `${size * $settings.uiScale}px ${style}`
}
